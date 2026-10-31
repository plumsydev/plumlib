"use client"

import * as React from "react"
import { AreaChart } from "@/components/ui/chart"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// données pseudo aléatoires mais stables, sinon le rendu serveur et client se battent
function series(days: number, seed: number) {
  let s = seed
  const rand = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
  const start = new Date(2026, 9, 31)
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() - (days - 1 - i))
    const wave = Math.sin(i / 3) * 0.25 + 1
    return {
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      desktop: Math.round((1800 + rand() * 900) * wave),
      mobile: Math.round((1100 + rand() * 700) * wave),
    }
  })
}

const ranges = { "7d": series(7, 3), "30d": series(30, 7), "90d": series(90, 11) }

export default function ChartDemo() {
  const [range, setRange] = React.useState<keyof typeof ranges>("30d")
  const data = ranges[range]
  const total = data.reduce((s, d) => s + d.desktop + d.mobile, 0)

  return (
    <div className="w-full max-w-2xl rounded-xl border bg-card p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-sm text-muted-foreground">Visitors</div>
          <div className="text-2xl font-semibold tracking-tight tabular-nums">{total.toLocaleString("en-US")}</div>
        </div>
        <ToggleGroup type="single" variant="outline" size="sm" value={range} onValueChange={(v) => v && setRange(v as keyof typeof ranges)}>
          <ToggleGroupItem value="7d">7d</ToggleGroupItem>
          <ToggleGroupItem value="30d">30d</ToggleGroupItem>
          <ToggleGroupItem value="90d">90d</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <AreaChart
        key={range}
        data={data}
        index="date"
        series={[
          { key: "desktop", label: "Desktop" },
          { key: "mobile", label: "Mobile" },
        ]}
        stacked
      />
    </div>
  )
}
