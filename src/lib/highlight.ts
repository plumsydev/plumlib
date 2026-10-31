import "server-only"
import { createHighlighter, type Highlighter } from "shiki"

let highlighter: Promise<Highlighter> | null = null

// un seul highlighter pr tt le build sinon shiki recharge les grammaires à chaque page mskn
function getHighlighter() {
  highlighter ??= createHighlighter({
    themes: ["github-light-default", "github-dark-default"],
    langs: ["tsx", "ts", "bash", "css", "json"],
  })
  return highlighter
}

export async function highlight(code: string, lang: string = "tsx") {
  const hl = await getHighlighter()
  return hl.codeToHtml(code.trimEnd(), {
    lang,
    themes: { light: "github-light-default", dark: "github-dark-default" },
    defaultColor: false,
  })
}
