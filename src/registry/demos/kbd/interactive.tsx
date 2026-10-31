"use client"

import * as React from "react"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

const keys = ["Shift", "Alt", "Meta", "K"] as const
const labels: Record<(typeof keys)[number], string> = { Shift: "⇧", Alt: "⌥", Meta: "⌘", K: "K" }

export default function KbdInteractive() {
  const [pressed, setPressed] = React.useState<Set<string>>(new Set())

  React.useEffect(() => {
    // on écoute le vrai clavier pr enfoncer les touches à l'écran
    const norm = (e: KeyboardEvent) => (e.key.length === 1 ? e.key.toUpperCase() : e.key)
    const down = (e: KeyboardEvent) => setPressed((p) => new Set(p).add(norm(e)))
    const up = (e: KeyboardEvent) =>
      setPressed((p) => {
        const n = new Set(p)
        n.delete(norm(e))
        return n
      })
    const reset = () => setPressed(new Set())
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
        {keys.map((k) => (
          <Kbd key={k} data-pressed={pressed.has(k)} className="h-8 min-w-8 text-sm">
            {labels[k]}
          </Kbd>
        ))}
      </KbdGroup>
      <p className="text-xs text-muted-foreground">Press the keys on your keyboard</p>
    </div>
  )
}
