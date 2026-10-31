// génère le registry plum (public/registry) + une version compat shadcn (public/r)
import { promises as fs } from "node:fs"
import path from "node:path"
import postcss from "postcss"

const root = process.cwd()
const url = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ui.plumsy.dev").replace(/\/$/, "")
const plumOut = path.join(root, "public", "registry")
const shadcnOut = path.join(root, "public", "r")

const read = (p) => fs.readFile(path.join(root, p), "utf8")
const write = (dir, name, data) => fs.writeFile(path.join(dir, `${name}.json`), JSON.stringify(data, null, 2))

function pkgName(spec) {
  return spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0]
}

// on lit les imports pr deviner les deps npm et les autres items du registry
function analyze(source) {
  const dependencies = new Set()
  const registryDependencies = new Set()
  for (const [, spec] of source.matchAll(/from\s+["']([^"']+)["']/g)) {
    if (spec.startsWith("@/components/ui/")) registryDependencies.add(spec.split("/").pop())
    else if (spec === "@/lib/utils") registryDependencies.add("utils")
    else if (spec === "@/lib/motion") registryDependencies.add("motion")
    else if (!spec.startsWith(".") && !spec.startsWith("@/")) {
      const name = pkgName(spec)
      if (!["react", "react-dom", "next"].includes(name)) dependencies.add(name)
    }
  }
  return { dependencies: [...dependencies].sort(), registryDependencies: [...registryDependencies].sort() }
}

async function meta(slug) {
  try {
    const src = await read(`src/registry/docs/${slug}.tsx`)
    return {
      title: src.match(/\bname:\s*"([^"]+)"/)?.[1],
      description: src.match(/\bdescription:\s*\n?\s*"([^"]+)"/)?.[1],
      category: src.match(/\bcategory:\s*"([^"]+)"/)?.[1],
    }
  } catch {
    return {}
  }
}

function toObject(node) {
  const obj = {}
  node.each((child) => {
    if (child.type === "decl") obj[child.prop] = child.value
    else if (child.type === "rule") obj[child.selector] = toObject(child)
    else if (child.type === "atrule") obj[`@${child.name} ${child.params}`] = toObject(child)
  })
  return obj
}

// version shadcn du thème : cssVars + css, pr ceux qui restent sur leur cli
async function shadcnTheme(css) {
  const ast = postcss.parse(css)
  const cssVars = { theme: {}, light: {}, dark: {} }
  const out = {}
  const strip = (o) => Object.fromEntries(Object.entries(o).filter(([k]) => k.startsWith("--")).map(([k, v]) => [k.replace(/^--/, ""), v]))
  ast.each((node) => {
    if (node.type === "rule" && node.selector.startsWith(":root")) cssVars.light = strip(toObject(node))
    else if (node.type === "rule" && node.selector === ".dark") cssVars.dark = strip(toObject(node))
    else if (node.type === "atrule" && node.name === "theme")
      cssVars.theme = strip(Object.fromEntries(Object.entries(toObject(node)).filter(([k]) => !k.startsWith("--color-") && !k.startsWith("--radius-"))))
    else if (node.type === "atrule" && ["keyframes", "utility", "layer", "media"].includes(node.name))
      out[`@${node.name} ${node.params}`] = toObject(node)
  })
  for (const k of ["success", "warning", "info", "brand", "brand-foreground", "overlay"]) cssVars.theme[`color-${k}`] = `var(--${k})`
  return { cssVars, css: out }
}

async function main() {
  for (const dir of [plumOut, shadcnOut]) {
    await fs.rm(dir, { recursive: true, force: true })
    await fs.mkdir(dir, { recursive: true })
  }

  const [utils, motion, theme] = await Promise.all([read("src/lib/utils.ts"), read("src/lib/motion.ts"), read("src/styles/plum.css")])
  const base = [
    { name: "utils", title: "Utils", description: "The cn() class merging helper.", type: "lib", dependencies: ["clsx", "tailwind-merge"], files: [{ path: "lib/utils.ts", type: "lib", content: utils }] },
    { name: "motion", title: "Motion presets", description: "Shared spring presets used by every animated component.", type: "lib", dependencies: ["motion"], files: [{ path: "lib/motion.ts", type: "lib", content: motion }] },
    { name: "theme", title: "Theme", description: "Tokens, dark mode, easings and animation utilities.", type: "style", dependencies: [], files: [{ path: "styles/plum.css", type: "style", content: theme }] },
  ]

  const items = [...base.map((b) => ({ ...b, registryDependencies: [] }))]
  const files = (await fs.readdir(path.join(root, "src/components/ui"))).filter((f) => f.endsWith(".tsx")).sort()
  for (const file of files) {
    const name = file.replace(/\.tsx$/, "")
    const content = await read(`src/components/ui/${file}`)
    const { title, description, category } = await meta(name)
    items.push({
      name,
      title: title ?? name,
      description,
      category,
      type: "ui",
      ...analyze(content),
      files: [{ path: `ui/${file}`, type: "ui", content }],
    })
  }

  for (const item of items) {
    await write(plumOut, item.name, { $schema: `${url}/schema/registry-item.json`, ...item })

    // miroir shadcn, les deps plum deviennent des urls absolues
    const shadcnDeps = item.registryDependencies.map((d) => (d === "utils" ? "utils" : `${url}/r/${d}.json`))
    if (item.name === "theme") {
      await write(shadcnOut, "theme", { $schema: "https://ui.shadcn.com/schema/registry-item.json", name: "theme", type: "registry:theme", title: item.title, description: item.description, ...(await shadcnTheme(theme)) })
    } else if (item.name !== "utils") {
      const type = item.type === "lib" ? "registry:lib" : "registry:ui"
      await write(shadcnOut, item.name, {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: item.name,
        type,
        title: item.title,
        description: item.description,
        dependencies: item.dependencies,
        registryDependencies: shadcnDeps,
        files: item.files.map((f) => ({ path: f.type === "lib" ? f.path : `components/${f.path}`, type, content: f.content })),
      })
    }
  }

  const index = items.map(({ name, title, description, category, type, dependencies, registryDependencies }) => ({ name, title, description, category, type, dependencies, registryDependencies }))
  await write(plumOut, "index", { $schema: `${url}/schema/registry.json`, name: "plum", homepage: url, items: index })
  await write(shadcnOut, "index", { $schema: "https://ui.shadcn.com/schema/registry.json", name: "plum", homepage: url, items: index.filter((i) => i.name !== "utils").map(({ name, type }) => ({ name, type: `registry:${type === "style" ? "theme" : type}` })) })
  console.log(`registry: ${items.length} items -> public/registry (+ shadcn mirror in public/r)`)
}

main()
