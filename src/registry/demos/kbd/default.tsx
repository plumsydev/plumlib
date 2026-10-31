"use client"

import { Command } from "lucide-react"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

const shortcuts = [
  { label: "Search", keys: [<Command key="c" />, "K"] },
  { label: "New issue", keys: ["C"] },
  { label: "Go to inbox", keys: ["G", "I"] },
  { label: "Toggle sidebar", keys: [<Command key="c" />, "\\"] },
]

export default function KbdDemo() {
  return (
    <div className="w-full max-w-xs divide-y rounded-xl border bg-card text-sm shadow-xs">
      {shortcuts.map((s) => (
        <div key={s.label} className="flex items-center justify-between px-4 py-2.5">
          <span className="text-muted-foreground">{s.label}</span>
          <KbdGroup>
            {s.keys.map((k, i) => (
              <Kbd key={i}>{k}</Kbd>
            ))}
          </KbdGroup>
        </div>
      ))}
    </div>
  )
}
