"use client"

import { ScrollArea } from "@/components/ui/scroll-area"

const shots = [
  { title: "Dashboard", hue: 250 },
  { title: "Analytics", hue: 160 },
  { title: "Settings", hue: 30 },
  { title: "Billing", hue: 330 },
  { title: "Team", hue: 200 },
  { title: "Logs", hue: 100 },
]

export default function ScrollAreaHorizontal() {
  return (
    <ScrollArea orientation="horizontal" fade className="w-full max-w-md rounded-lg border bg-card">
      <div className="flex w-max gap-3 p-4">
        {shots.map((s) => (
          <figure key={s.title} className="shrink-0">
            <div
              className="h-28 w-44 rounded-md border"
              style={{
                background: `linear-gradient(135deg, oklch(0.92 0.04 ${s.hue}), oklch(0.8 0.08 ${s.hue}))`,
              }}
            />
            <figcaption className="pt-2 text-xs text-muted-foreground">{s.title}</figcaption>
          </figure>
        ))}
      </div>
    </ScrollArea>
  )
}
