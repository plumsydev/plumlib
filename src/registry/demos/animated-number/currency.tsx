"use client"

import * as React from "react"
import { AnimatedNumber } from "@/components/ui/animated-number"

const fmt: Intl.NumberFormatOptions = { style: "currency", currency: "EUR", minimumFractionDigits: 2 }

export default function AnimatedNumberCurrency() {
  const [price, setPrice] = React.useState(184.32)
  const [delta, setDelta] = React.useState(0)

  React.useEffect(() => {
    // un faux ticker boursier, aucun conseil financier hein
    const id = setInterval(() => {
      const d = Math.round((Math.random() - 0.48) * 400) / 100
      setDelta(d)
      setPrice((p) => Math.max(1, Math.round((p + d) * 100) / 100))
    }, 1600)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs font-medium text-muted-foreground">ACME · Live</span>
      <AnimatedNumber value={price} format={fmt} locales="fr-FR" className="text-4xl font-semibold tracking-tight" />
      <AnimatedNumber
        value={delta}
        format={{ signDisplay: "always", minimumFractionDigits: 2 }}
        className={delta >= 0 ? "text-sm text-success" : "text-sm text-destructive"}
      />
    </div>
  )
}
