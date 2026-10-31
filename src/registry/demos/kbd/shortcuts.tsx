"use client"

import * as React from "react"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

const shortcuts = [
  { label: "Open command menu", keys: ["⌘", "K"], match: (e: KeyboardEvent) => e.metaKey && e.key.toLowerCase() === "k" },
  { label: "New issue", keys: ["C"], match: (e: KeyboardEvent) => !e.metaKey && e.key.toLowerCase() === "c" },
  { label: "Search", keys: ["/"], match: (e: KeyboardEvent) => e.key === "/" },
  { label: "Go to inbox", keys: ["G", "I"], match: (e: KeyboardEvent) => e.key.toLowerCase() === "i" },
  { label: "Toggle sidebar", keys: ["["], match: (e: KeyboardEvent) => e.key === "[" },
]

export default function KbdShortcuts() {
  const [hit, setHit] = React.useState<number | null>(null)

  // la ligne du raccourci s'allume qd tu le tapes, pratique pr apprendre
  React.useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    const down = (e: KeyboardEvent) => {
      const i = shortcuts.findIndex((s) => s.match(e))
      if (i === -1) return
      if (e.metaKey || e.key === "/") e.preventDefault()
      setHit(i)
      clearTimeout(t)
      t = setTimeout(() => setHit(null), 700)
    }
    window.addEventListener("keydown", down)
    return () => {
      window.removeEventListener("keydown", down)
      clearTimeout(t)
    }
  }, [])

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl border bg-card">
      <div className="border-b px-4 py-2.5 text-xs font-medium text-muted-foreground">Keyboard shortcuts — try them</div>
      <ul className="p-1.5">
        {shortcuts.map((s, i) => (
          <li
            key={s.label}
            data-hit={hit === i || undefined}
            className="flex items-center justify-between rounded-md px-2.5 py-2 text-sm transition-colors duration-300 data-[hit]:bg-brand/10 data-[hit]:duration-75"
          >
            {s.label}
            <KbdGroup>
              {s.keys.map((k) => (
                <Kbd key={k} data-pressed={hit === i}>
                  {k}
                </Kbd>
              ))}
            </KbdGroup>
          </li>
        ))}
      </ul>
    </div>
  )
}
