import "server-only"
import { promises as fs } from "node:fs"
import path from "node:path"

// lit les sources au build pr les afficher ds la doc, les imports restent tels quels
export async function readSource(...segments: string[]) {
  const file = path.join(process.cwd(), "src", ...segments)
  try {
    return await fs.readFile(file, "utf8")
  } catch {
    return `// source introuvable : ${segments.join("/")}`
  }
}

export const readDemo = (slug: string, name: string) => readSource("registry", "demos", slug, `${name}.tsx`)
export const readComponent = (slug: string) => readSource("components", "ui", `${slug}.tsx`)
