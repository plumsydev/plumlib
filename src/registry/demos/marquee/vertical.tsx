"use client"

import { Badge } from "@/components/ui/badge"
import { Marquee } from "@/components/ui/marquee"

const updates = [
  { tag: "New", variant: "brand", text: "Dock component with magnification" },
  { tag: "Fix", variant: "success", text: "Checkbox draws its check again" },
  { tag: "Perf", variant: "info", text: "Marquee now runs on the compositor" },
  { tag: "New", variant: "brand", text: "Spotlight groups light up together" },
  { tag: "Fix", variant: "success", text: "Toasts respect reduced motion" },
] as const

export default function MarqueeVertical() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl border bg-card">
      <div className="border-b px-4 py-2.5 text-sm font-medium">Changelog</div>
      <Marquee vertical speed={22} className="h-56 px-4 [--gap:0.25rem]">
        {updates.map((u) => (
          <div key={u.text} className="flex items-center gap-2.5 py-2 text-sm">
            <Badge variant={u.variant} className="w-11">{u.tag}</Badge>
            <span className="truncate">{u.text}</span>
          </div>
        ))}
      </Marquee>
    </div>
  )
}
