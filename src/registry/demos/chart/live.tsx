"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { LineChart } from "@/components/ui/chart"

function point(i: number, prev?: number) {
  const base = prev ?? 220
  return { t: `${i}s`, p50: Math.max(80, Math.round(base + (Math.random() - 0.5) * 60)), p95: 0 }
}

export default function ChartLive() {
  const [data, setData] = React.useState(() => {
    const out: { t: string; p50: number; p95: number }[] = []
    for (let i = 0; i < 20; i++) out.push(point(i, out[i - 1]?.p50))
    return out.map((d) => ({ ...d, p95: d.p50 + 120 }))
  })

  // un point de plus toutes les 1.5s, la courbe glisse au lieu de sauter
  React.useEffect(() => {
    let i = 20
    const id = setInterval(() => {
      setData((d) => {
        const next = point(i++, d[d.length - 1].p50)
        return [...d.slice(1), { ...next, p95: next.p50 + 90 + Math.round(Math.random() * 80) }]
      })
    }, 1500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="w-full max-w-2xl rounded-xl border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">Response time</div>
          <div className="text-xs text-muted-foreground">api.acme.com · last 30 seconds</div>
        </div>
        <Badge variant="success" dot>
          Live
        </Badge>
      </div>
      <LineChart
        data={data}
        index="t"
        height={220}
        xAxis={false}
        valueFormatter={(v) => `${Math.round(v)}ms`}
        series={[
          { key: "p50", label: "p50", color: "var(--foreground)" },
          { key: "p95", label: "p95", color: "var(--brand)" },
        ]}
      />
    </div>
  )
}
