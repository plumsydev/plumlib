"use client"

import * as React from "react"
import { AnimatedNumber } from "@/components/ui/animated-number"
import { Sparkline } from "@/components/ui/chart"

const kpis = [
  { label: "MRR", value: 48210, format: { style: "currency", currency: "EUR", maximumFractionDigits: 0 } as const, color: "var(--brand)", delta: "+12.4%" },
  { label: "Active users", value: 3821, format: {}, color: "var(--info)", delta: "+4.1%" },
  { label: "Churn", value: 1.8, format: { maximumFractionDigits: 1 }, color: "var(--destructive)", delta: "-0.3%", suffix: "%" },
]

function walk(n: number, seed: number) {
  let v = 50
  let s = seed
  return Array.from({ length: n }, () => {
    s = (s * 9301 + 49297) % 233280
    v += (s / 233280 - 0.42) * 12
    return v
  })
}

export default function ChartSparkline() {
  const [tick, setTick] = React.useState(0)
  const series = kpis.map((_, i) => walk(16, i * 17 + tick))

  return (
    <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-3">
      {kpis.map((k, i) => (
        <button
          key={k.label}
          type="button"
          onClick={() => setTick((t) => t + 1)}
          className="cursor-pointer rounded-xl border bg-card p-4 text-left transition-colors hover:border-foreground/20"
        >
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            {k.label}
            <span className={k.delta.startsWith("-") && k.label !== "Churn" ? "text-destructive" : "text-success"}>{k.delta}</span>
          </div>
          <div className="mt-1 text-xl font-semibold tracking-tight">
            <AnimatedNumber value={k.value + (tick % 2 ? Math.round(k.value * 0.03) : 0)} format={k.format} />
            {k.suffix}
          </div>
          <Sparkline data={series[i]} color={k.color} width={180} height={36} className="mt-2 w-full" />
        </button>
      ))}
      <p className="text-center text-xs text-muted-foreground sm:col-span-3">Click a card to refresh the data.</p>
    </div>
  )
}
