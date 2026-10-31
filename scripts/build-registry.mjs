// génère public/r/*.json au format registry shadcn, comme ça `npx shadcn add` marche direct
import { promises as fs } from "node:fs"
import path from "node:path"
import postcss from "postcss"

const root = process.cwd()
const url = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")
const out = path.join(root, "public", "r")
const schema = "https://ui.shadcn.com/schema/registry-item.json"
const itemUrl = (name) => `${url}/r/${name}.json`

const read = (p) => fs.readFile(path.join(root, p), "utf8")

function pkgName(spec) {
  if (spec.startsWith("@")) return spec.split("/").slice(0, 2).join("/")
  return spec.split("/")[0]
}

function analyze(source) {
  const deps = new Set()
  const registryDeps = new Set()
  for (const [, spec] of source.matchAll(/from\s+["']([^"']+)["']/g)) {
    if (spec.startsWith("@/components/ui/")) registryDeps.add(itemUrl(spec.split("/").pop()))
    else if (spec === "@/lib/utils") registryDeps.add("utils")
    else if (spec === "@/lib/motion") registryDeps.add(itemUrl("motion-presets"))
    else if (!spec.startsWith(".") && !spec.startsWith("@/")) {
      const name = pkgName(spec)
      if (!["react", "react-dom", "next"].includes(name)) deps.add(name)
    }
  }
  return { dependencies: [...deps].sort(), registryDependencies: [...registryDeps].sort() }
}

// les métadonnées viennent du fichier de doc, on gratte juste name et description
async function meta(slug) {
  try {
    const src = await read(`src/registry/docs/${slug}.tsx`)
    const title = src.match(/\bname:\s*"([^"]+)"/)?.[1]
    const description = src.match(/\bdescription:\s*\n?\s*"([^"]+)"/)?.[1]
    return { title, description }
  } catch {
    return {}
  }
}

function declsToObject(node) {
  const obj = {}
  node.each((child) => {
    if (child.type === "decl") obj[child.prop] = child.value
    else if (child.type === "rule") obj[child.selector] = declsToObject(child)
    else if (child.type === "atrule") obj[`@${child.name} ${child.params}`] = declsToObject(child)
  })
  return obj
}

async function buildTheme() {
  const ast = postcss.parse(await read("src/styles/plum.css"))
  const cssVars = { theme: {}, light: {}, dark: {} }
  const css = {}
  const strip = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k.replace(/^--/, ""), v]))

  ast.each((node) => {
    if (node.type === "rule" && node.selector === ":root") cssVars.light = strip(declsToObject(node))
    else if (node.type === "rule" && node.selector === ".dark") cssVars.dark = strip(declsToObject(node))
    else if (node.type === "atrule" && node.name === "theme") {
      // les couleurs sont déjà mappées par shadcn init, on garde que nos extras
      const extra = Object.entries(declsToObject(node)).filter(([k]) => !k.startsWith("--color-") && !k.startsWith("--radius-"))
      cssVars.theme = strip(Object.fromEntries(extra))
    } else if (node.type === "atrule" && ["keyframes", "utility", "layer", "media"].includes(node.name)) {
      css[`@${node.name} ${node.params}`] = declsToObject(node)
    }
  })

  for (const k of ["success", "warning", "info", "brand", "brand-foreground", "overlay"]) cssVars.theme[`color-${k}`] = `var(--${k})`
  return { cssVars, css }
}

async function main() {
  await fs.rm(out, { recursive: true, force: true })
  await fs.mkdir(out, { recursive: true })

  const files = (await fs.readdir(path.join(root, "src/components/ui"))).filter((f) => f.endsWith(".tsx")).sort()
  const index = []

  for (const file of files) {
    const slug = file.replace(/\.tsx$/, "")
    const content = await read(`src/components/ui/${file}`)
    const { title, description } = await meta(slug)
    const item = {
      $schema: schema,
      name: slug,
      type: "registry:ui",
      title: title ?? slug,
      description,
      ...analyze(content),
      files: [{ path: `components/ui/${file}`, type: "registry:ui", content }],
    }
    await fs.writeFile(path.join(out, `${slug}.json`), JSON.stringify(item, null, 2))
    index.push({ name: slug, type: item.type, title: item.title, description })
  }

  const motion = await read("src/lib/motion.ts")
  await fs.writeFile(
    path.join(out, "motion-presets.json"),
    JSON.stringify(
      {
        $schema: schema,
        name: "motion-presets",
        type: "registry:lib",
        title: "Motion presets",
        description: "Shared spring presets used by Plum UI components.",
        dependencies: ["motion"],
        files: [{ path: "lib/motion.ts", type: "registry:lib", content: motion }],
      },
      null,
      2
    )
  )

  const theme = await buildTheme()
  await fs.writeFile(
    path.join(out, "theme.json"),
    JSON.stringify(
      {
        $schema: schema,
        name: "theme",
        type: "registry:theme",
        title: "Plum theme",
        description: "Tokens, dark mode, easings and animation utilities.",
        ...theme,
      },
      null,
      2
    )
  )

  index.push({ name: "theme", type: "registry:theme" }, { name: "motion-presets", type: "registry:lib" })
  await fs.writeFile(
    path.join(out, "index.json"),
    JSON.stringify({ $schema: "https://ui.shadcn.com/schema/registry.json", name: "plum", homepage: url, items: index }, null, 2)
  )
  console.log(`registry: ${index.length} items -> public/r`)
}

main()
