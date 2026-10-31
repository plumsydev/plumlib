"use client"

import * as React from "react"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Playground } from "@/components/site/playground"

function Live({ keys, separator }: { keys: string; separator: boolean }) {
  const [pressed, setPressed] = React.useState<string[]>([])
  const list = keys.split("+").map((k) => k.trim()).filter(Boolean)

  // les touches s'enfoncent pour de vrai qd tu tapes au clavier
  React.useEffect(() => {
    const norm = (e: KeyboardEvent) =>
      ({ Meta: "⌘", Control: "Ctrl", Shift: "⇧", Alt: "⌥", Enter: "↵" })[e.key] ?? e.key.toUpperCase()
    const down = (e: KeyboardEvent) => setPressed((p) => [...new Set([...p, norm(e)])])
    const up = (e: KeyboardEvent) => setPressed((p) => p.filter((k) => k !== norm(e)))
    const reset = () => setPressed([])
    window.addEventListener("keydown", down)
    window.addEventListener("keyup", up)
    window.addEventListener("blur", reset)
    return () => {
      window.removeEventListener("keydown", down)
      window.removeEventListener("keyup", up)
      window.removeEventListener("blur", reset)
    }
  }, [])

  return (
    <div className="flex flex-col items-center gap-3">
      <KbdGroup>
        {list.map((k, i) => (
          <React.Fragment key={k + i}>
            {separator && i > 0 && <span className="text-xs text-muted-foreground">+</span>}
            <Kbd data-pressed={pressed.includes(k.toUpperCase()) || pressed.includes(k)} className="h-7 min-w-7 text-xs">
              {k}
            </Kbd>
          </React.Fragment>
        ))}
      </KbdGroup>
      <p className="text-xs text-muted-foreground">Press the keys on your keyboard</p>
    </div>
  )
}

export default function KbdPlayground() {
  return (
    <Playground
      controls={{
        keys: { type: "text", default: "⌘ + ⇧ + K" },
        separator: { type: "boolean", default: true },
      }}
      render={(v) => <Live {...v} />}
      code={({ keys, separator }) => {
        const list = keys.split("+").map((k) => k.trim()).filter(Boolean)
        return `<KbdGroup>
${list.map((k) => `  <Kbd>${k}</Kbd>`).join(separator ? "\n  <span>+</span>\n" : "\n")}
</KbdGroup>`
      }}
    />
  )
}
