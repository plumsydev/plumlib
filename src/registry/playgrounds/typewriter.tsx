"use client"

import { Typewriter } from "@/components/ui/typewriter"
import { Playground, jsxProps } from "@/components/site/playground"

export default function TypewriterPlayground() {
  return (
    <Playground
      controls={{
        words: { type: "text", default: "fast, alive, inevitable, yours", label: "words (comma separated)" },
        typeSpeed: { type: "number", default: 70, min: 20, max: 200, step: 5 },
        deleteSpeed: { type: "number", default: 35, min: 10, max: 120, step: 5 },
        pause: { type: "number", default: 1600, min: 300, max: 4000, step: 100 },
        cursor: { type: "boolean", default: true },
      }}
      render={({ words, ...p }) => {
        const list = words.split(",").map((w) => w.trim()).filter(Boolean)
        return (
          <h3 className="text-center text-3xl font-semibold tracking-tight">
            Make it <Typewriter key={list.join("|")} words={list.length ? list : ["…"]} className="text-muted-foreground" {...p} />
          </h3>
        )
      }}
      code={({ words, ...p }) => {
        const list = words.split(",").map((w) => w.trim()).filter(Boolean)
        return `import { Typewriter } from "@/components/ui/typewriter"

<Typewriter
  words={${JSON.stringify(list)}}${jsxProps(p, { typeSpeed: 70, deleteSpeed: 35, pause: 1600, cursor: true })}${p.cursor ? "" : "\n  cursor={false}"}
/>`
      }}
    />
  )
}
