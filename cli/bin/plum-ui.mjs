#!/usr/bin/env node
// la cli de plum ui, zéro dépendance pr que npx démarre en 1 sec
import { existsSync, promises as fs } from "node:fs"
import path from "node:path"
import { spawnSync } from "node:child_process"
import readline from "node:readline/promises"

const VERSION = "0.1.0"
const DEFAULT_REGISTRY = process.env.PLUM_REGISTRY ?? "https://ui.plumsy.dev/registry"
const CONFIG = "plum.json"
const BASE_DEPS = ["clsx", "tailwind-merge", "class-variance-authority", "radix-ui", "motion", "lucide-react"]

const tty = process.stdout.isTTY && !process.env.NO_COLOR
const paint = (code) => (s) => (tty ? `\x1b[${code}m${s}\x1b[0m` : String(s))
const c = { dim: paint(2), bold: paint(1), green: paint(32), red: paint(31), yellow: paint(33), cyan: paint(36), plum: paint("38;5;169") }

const log = {
  info: (m) => console.log(`${c.plum("◆")} ${m}`),
  ok: (m) => console.log(`${c.green("✓")} ${m}`),
  warn: (m) => console.log(`${c.yellow("!")} ${m}`),
  step: (m) => console.log(`${c.dim("│")} ${m}`),
  fail: (m) => {
    console.error(`${c.red("✗")} ${m}`)
    process.exit(1)
  },
}

// ---------- args ----------

function parseArgs(argv) {
  const flags = {}
  const positional = []
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a.startsWith("--no-")) flags[a.slice(5)] = false
    else if (a.startsWith("--")) {
      const [k, v] = a.slice(2).split("=")
      if (v !== undefined) flags[k] = v
      else if (["cwd", "registry", "path"].includes(k)) flags[k] = argv[++i]
      else flags[k] = true
    } else if (a === "-y") flags.yes = true
    else if (a === "-o") flags.overwrite = true
    else if (a === "-h") flags.help = true
    else positional.push(a)
  }
  return { command: positional[0], args: positional.slice(1), flags }
}

// ---------- utils projet ----------

async function readJson(file) {
  try {
    // tsconfig a souvent des commentaires et des virgules en trop, on nettoie vite fait
    const raw = await fs.readFile(file, "utf8")
    return JSON.parse(raw.replace(/\/\*[\s\S]*?\*\/|(?<=^|[^:"])\/\/.*$/gm, "").replace(/,(\s*[}\]])/g, "$1"))
  } catch {
    return null
  }
}

function detectPackageManager(cwd) {
  if (existsSync(path.join(cwd, "bun.lock")) || existsSync(path.join(cwd, "bun.lockb"))) return "bun"
  if (existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm"
  if (existsSync(path.join(cwd, "yarn.lock"))) return "yarn"
  const ua = process.env.npm_config_user_agent ?? ""
  if (ua.startsWith("pnpm")) return "pnpm"
  if (ua.startsWith("bun")) return "bun"
  if (ua.startsWith("yarn")) return "yarn"
  return "npm"
}

async function detectAlias(cwd) {
  for (const name of ["tsconfig.json", "jsconfig.json"]) {
    const json = await readJson(path.join(cwd, name))
    const paths = json?.compilerOptions?.paths
    if (!paths) continue
    for (const [key, targets] of Object.entries(paths)) {
      if (!key.endsWith("/*")) continue
      const target = String(targets[0] ?? "").replace(/^\.\//, "").replace(/\/\*$/, "")
      return { prefix: key.slice(0, -2), target }
    }
  }
  return null
}

async function findCss(cwd) {
  const candidates = [
    "src/app/globals.css", "app/globals.css", "src/styles/globals.css", "styles/globals.css",
    "src/index.css", "src/globals.css", "src/main.css", "app/app.css", "src/app.css",
  ]
  for (const file of candidates) if (existsSync(path.join(cwd, file))) return file
  return null
}

async function ask(question, fallback) {
  if (!process.stdin.isTTY) return fallback
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const answer = (await rl.question(`${c.cyan("?")} ${question} ${c.dim(`(${fallback})`)} `)).trim()
  rl.close()
  return answer || fallback
}

async function confirm(question, fallback = true) {
  const answer = await ask(`${question} ${fallback ? "[Y/n]" : "[y/N]"}`, fallback ? "y" : "n")
  return /^y/i.test(answer)
}

async function loadConfig(cwd) {
  const config = await readJson(path.join(cwd, CONFIG))
  if (!config) log.fail(`No ${CONFIG} found. Run ${c.bold("npx plum-ui init")} first.`)
  return config
}

// ---------- registry ----------

async function fetchJson(url) {
  let res
  try {
    res = await fetch(url)
  } catch (e) {
    log.fail(`Could not reach ${url} (${e.cause?.code ?? e.message})`)
  }
  if (res.status === 404) return null
  if (!res.ok) log.fail(`${url} answered ${res.status}`)
  return res.json()
}

async function resolveTree(registry, names) {
  const items = new Map()
  const queue = [...names]
  while (queue.length) {
    const name = queue.shift()
    if (items.has(name)) continue
    const item = await fetchJson(`${registry}/${name}.json`)
    if (!item) log.fail(`Unknown component ${c.bold(name)}. Run ${c.bold("npx plum-ui list")} to see them all.`)
    items.set(name, item)
    queue.push(...(item.registryDependencies ?? []))
  }
  return [...items.values()]
}

function targetFor(file, config) {
  const base = path.basename(file.path)
  if (file.type === "ui") return path.join(config.paths.ui, base)
  if (file.type === "lib") return path.join(config.paths.lib, base)
  if (file.type === "style") return path.join(path.dirname(config.paths.css), base)
  return file.path
}

function rewriteImports(content, config) {
  return content
    .replaceAll('from "@/components/ui/', `from "${config.aliases.ui}/`)
    .replaceAll('from "@/lib/', `from "${config.aliases.lib}/`)
}

async function installDeps(cwd, deps, flags) {
  const pkg = (await readJson(path.join(cwd, "package.json"))) ?? {}
  const have = { ...pkg.dependencies, ...pkg.devDependencies }
  const missing = [...new Set(deps)].filter((d) => !have[d])
  if (!missing.length) return
  if (flags.install === false) {
    log.warn(`Skipped installing ${missing.join(" ")}`)
    return
  }
  const pm = detectPackageManager(cwd)
  const verb = pm === "npm" ? "install" : "add"
  log.step(`${c.dim("$")} ${pm} ${verb} ${missing.join(" ")}`)
  const res = spawnSync(pm, [verb, ...missing], { cwd, stdio: "inherit", shell: process.platform === "win32" })
  if (res.status !== 0) log.fail(`${pm} ${verb} failed`)
}

async function writeItems(cwd, items, config, flags) {
  const deps = []
  const written = []
  for (const item of items) {
    deps.push(...(item.dependencies ?? []))
    for (const file of item.files ?? []) {
      const rel = targetFor(file, config)
      const abs = path.join(cwd, rel)
      if (existsSync(abs) && !flags.overwrite) {
        const local = await fs.readFile(abs, "utf8")
        if (local === rewriteImports(file.content, config)) continue
        const yes = flags.yes ? false : await confirm(`${rel} already exists. Overwrite?`, false)
        if (!yes) {
          log.step(c.dim(`kept ${rel}`))
          continue
        }
      }
      if (flags["dry-run"]) {
        log.step(`would write ${rel}`)
        continue
      }
      await fs.mkdir(path.dirname(abs), { recursive: true })
      await fs.writeFile(abs, rewriteImports(file.content, config))
      written.push(rel)
    }
  }
  return { deps, written }
}

// le thème doit etre importé juste après tailwind sinon les @theme passent à la trappe
async function linkTheme(cwd, config) {
  const cssPath = path.join(cwd, config.paths.css)
  const css = existsSync(cssPath) ? await fs.readFile(cssPath, "utf8") : ""
  if (css.includes("plum.css")) return
  const line = `@import "./plum.css";`
  const next = /@import\s+["']tailwindcss["'];?/.test(css)
    ? css.replace(/(@import\s+["']tailwindcss["'];?)/, `$1\n${line}`)
    : `@import "tailwindcss";\n${line}\n${css}`
  await fs.mkdir(path.dirname(cssPath), { recursive: true })
  await fs.writeFile(cssPath, next)
  log.ok(`Linked the theme in ${config.paths.css}`)
}

// ---------- commandes ----------

async function init(cwd, flags) {
  console.log(`\n${c.plum("●")} ${c.bold("Plum UI")} ${c.dim(`v${VERSION}`)}\n`)
  if (!existsSync(path.join(cwd, "package.json"))) log.fail("No package.json here. Run this at the root of your app.")

  const pkg = await readJson(path.join(cwd, "package.json"))
  const deps = { ...pkg.dependencies, ...pkg.devDependencies }
  if (!deps.react) log.warn("React isn't listed in package.json.")
  if (!deps.tailwindcss) log.warn(`Tailwind CSS v4 isn't installed. See ${c.cyan("https://tailwindcss.com/docs/installation")}`)

  const hasSrc = existsSync(path.join(cwd, "src"))
  const alias = (await detectAlias(cwd)) ?? { prefix: "@", target: hasSrc ? "src" : "" }
  const srcRoot = alias.target
  const join = (...p) => p.filter(Boolean).join("/")
  const defaultCss = (await findCss(cwd)) ?? join(srcRoot, "styles/globals.css")

  const pick = (q, v) => (flags.yes ? v : ask(q, v))
  const css = await pick("Where is your global CSS file?", defaultCss)
  const ui = await pick("Where should components go?", join(srcRoot, "components/ui"))
  const lib = await pick("Where should utilities go?", join(srcRoot, "lib"))

  const toAlias = (dir) => {
    const rel = srcRoot ? path.posix.relative(srcRoot, dir) : dir
    return `${alias.prefix}/${rel}`
  }

  const config = {
    $schema: `${(flags.registry ?? DEFAULT_REGISTRY).replace(/\/registry$/, "")}/schema/config.json`,
    registry: flags.registry ?? DEFAULT_REGISTRY,
    paths: { ui, lib, css },
    aliases: { ui: toAlias(ui), lib: toAlias(lib) },
  }

  if (existsSync(path.join(cwd, CONFIG)) && !flags.yes && !(await confirm(`${CONFIG} exists. Replace it?`, false))) {
    log.fail("Aborted.")
  }
  await fs.writeFile(path.join(cwd, CONFIG), JSON.stringify(config, null, 2) + "\n")
  log.ok(`Wrote ${CONFIG}`)

  const items = await resolveTree(config.registry, ["utils", "motion", "theme"])
  const { deps: itemDeps, written } = await writeItems(cwd, items, config, { ...flags, overwrite: flags.overwrite })
  written.forEach((f) => log.step(`${c.green("+")} ${f}`))
  await linkTheme(cwd, config)
  await installDeps(cwd, [...BASE_DEPS, ...itemDeps], flags)

  console.log(`\n${c.green("✓")} Ready. Add your first component:\n\n  ${c.bold("npx plum-ui add button dialog toast")}\n`)
}

async function add(cwd, names, flags) {
  const config = await loadConfig(cwd)
  const registry = flags.registry ?? config.registry
  if (flags.all) {
    const index = await fetchJson(`${registry}/index.json`)
    names = index.items.filter((i) => i.type === "ui").map((i) => i.name)
  }
  if (!names.length) log.fail(`Tell me what to add, e.g. ${c.bold("npx plum-ui add button")}`)

  log.info(`Resolving ${names.map((n) => c.bold(n)).join(", ")}`)
  const items = await resolveTree(registry, names)
  const extra = items.filter((i) => !names.includes(i.name) && i.type === "ui").map((i) => i.name)
  if (extra.length) log.step(c.dim(`also needs ${extra.join(", ")}`))

  const { deps, written } = await writeItems(cwd, items, config, flags)
  written.forEach((f) => log.step(`${c.green("+")} ${f}`))
  if (!flags["dry-run"]) await installDeps(cwd, deps, flags)
  log.ok(written.length ? `Added ${written.length} file${written.length > 1 ? "s" : ""}` : "Everything was already up to date")
}

async function list(cwd, flags) {
  const config = existsSync(path.join(cwd, CONFIG)) ? await readJson(path.join(cwd, CONFIG)) : null
  const registry = flags.registry ?? config?.registry ?? DEFAULT_REGISTRY
  const index = await fetchJson(`${registry}/index.json`)
  const groups = new Map()
  for (const item of index.items.filter((i) => i.type === "ui")) {
    const key = item.category ?? "Other"
    groups.set(key, [...(groups.get(key) ?? []), item])
  }
  const order = ["Inputs", "Overlays", "Feedback", "Navigation", "Data Display", "Motion"]
  const sorted = [...groups].sort(([a], [b]) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99))
  for (const [group, items] of sorted) {
    console.log(`\n${c.bold(group)}`)
    const width = Math.max(...items.map((i) => i.name.length))
    for (const i of items) {
      const installed = config && existsSync(path.join(cwd, config.paths.ui, `${i.name}.tsx`))
      console.log(`  ${installed ? c.green("●") : c.dim("○")} ${i.name.padEnd(width)}  ${c.dim(i.description ?? "")}`)
    }
  }
  console.log()
}

// diff ligne à ligne façon lcs, suffisant pr des fichiers de composants
function lineDiff(a, b) {
  const x = a.split("\n")
  const y = b.split("\n")
  const dp = Array.from({ length: x.length + 1 }, () => new Uint32Array(y.length + 1))
  for (let i = x.length - 1; i >= 0; i--)
    for (let j = y.length - 1; j >= 0; j--) dp[i][j] = x[i] === y[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
  const out = []
  let i = 0
  let j = 0
  while (i < x.length || j < y.length) {
    if (i < x.length && j < y.length && x[i] === y[j]) out.push([" ", x[i++], j++])
    else if (j < y.length && (i >= x.length || dp[i][j + 1] >= dp[i + 1][j])) out.push(["+", y[j++]])
    else out.push(["-", x[i++]])
  }
  return out
}

async function diff(cwd, names, flags) {
  const config = await loadConfig(cwd)
  const registry = flags.registry ?? config.registry
  if (!names.length) {
    const dir = path.join(cwd, config.paths.ui)
    names = existsSync(dir) ? (await fs.readdir(dir)).filter((f) => f.endsWith(".tsx")).map((f) => f.slice(0, -4)) : []
  }
  let changed = 0
  for (const name of names) {
    const item = await fetchJson(`${registry}/${name}.json`)
    if (!item) continue
    for (const file of item.files) {
      const rel = targetFor(file, config)
      const abs = path.join(cwd, rel)
      if (!existsSync(abs)) continue
      const local = await fs.readFile(abs, "utf8")
      const remote = rewriteImports(file.content, config)
      if (local === remote) continue
      changed++
      console.log(`\n${c.bold(rel)} ${c.dim("local → registry")}`)
      const lines = lineDiff(local, remote)
      lines.forEach(([op, text], k) => {
        // on montre que les changements + 2 lignes de contexte
        const near = lines.slice(Math.max(0, k - 2), k + 3).some(([o]) => o !== " ")
        if (op === "+") console.log(c.green(`+ ${text}`))
        else if (op === "-") console.log(c.red(`- ${text}`))
        else if (near) console.log(c.dim(`  ${text}`))
      })
    }
  }
  if (!changed) log.ok("Your components match the registry")
  else console.log(`\n${c.dim(`Run ${c.bold("npx plum-ui add <name> --overwrite")} to take the registry version.`)}`)
}

function help() {
  console.log(`
${c.plum("●")} ${c.bold("plum-ui")} ${c.dim(`v${VERSION}`)} — add Plum UI components to your project

${c.bold("Usage")}
  npx plum-ui init               set up plum.json, utils, motion presets and the theme
  npx plum-ui add <name...>      add components and everything they need
  npx plum-ui add --all          add every component
  npx plum-ui list               browse the registry
  npx plum-ui diff [name...]     compare your files with the registry

${c.bold("Options")}
  -y, --yes                     accept defaults, never prompt
  -o, --overwrite               replace existing files
  --dry-run                     show what would be written
  --no-install                  don't install npm dependencies
  --cwd <dir>                   run in another directory
  --registry <url>              use another registry (env: PLUM_REGISTRY)
`)
}

const { command, args, flags } = parseArgs(process.argv.slice(2))
const cwd = path.resolve(flags.cwd ?? process.cwd())

if (flags.version) console.log(VERSION)
else if (flags.help || !command || command === "help") help()
else if (command === "init") await init(cwd, flags)
else if (command === "add") await add(cwd, args, flags)
else if (command === "list" || command === "ls") await list(cwd, flags)
else if (command === "diff") await diff(cwd, args, flags)
else log.fail(`Unknown command ${c.bold(command)}. Run ${c.bold("npx plum-ui --help")}.`)
