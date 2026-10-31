"use client"

import * as React from "react"
import { AnimatedNumber } from "@/components/ui/animated-number"

const stats = [
  { label: "Visitors", value: 48213, format: {} },
  { label: "Bounce rate", value: 0.3241, format: { style: "percent", minimumFractionDigits: 1 } },
  { label: "Revenue", value: 12940, format: { style: "currency", currency: "USD", notation: "compact" } },
] satisfies { label: string; value: number; format: Intl.NumberFormatOptions }[]

export default function AnimatedNumberStats() {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    // on part de zero au montage pr que les roulettes tournent direct
    const t = setTimeout(() => setReady(true), 250)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="grid w-full max-w-md grid-cols-3 divide-x rounded-xl border bg-card shadow-xs">
      {stats.map((s) => (
        <div key={s.label} className="p-4">
          <div className="text-xs text-muted-foreground">{s.label}</div>
          <AnimatedNumber value={ready ? s.value : 0} format={s.format} className="mt-1 text-xl font-semibold tracking-tight" />
        </div>
      ))}
    </div>
  )
}
