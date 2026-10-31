"use client"

import * as React from "react"
import { ColorPickerPanel, hexToHsv } from "@/components/ui/color-picker"

export default function ColorPickerInline() {
  const [color, setColor] = React.useState("#0ea5e9")
  // texte blanc ou noir selon la luminosité, sinon c'est illisible sur les jaunes
  const hsv = hexToHsv(color)
  const dark = hsv ? hsv.v > 0.75 && hsv.s < 0.6 : false

  return (
    <div className="grid w-full max-w-lg items-center gap-6 sm:grid-cols-[15rem_1fr]">
      <ColorPickerPanel value={color} onValueChange={setColor} />
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="h-20 transition-colors duration-200" style={{ background: color }} />
        <div className="space-y-3 p-4">
          <div>
            <p className="text-sm font-semibold">Acme Pro</p>
            <p className="text-xs text-muted-foreground">Your brand, applied live.</p>
          </div>
          <button
            type="button"
            className="h-8 w-full rounded-md text-sm font-medium transition-colors duration-200"
            style={{ background: color, color: dark ? "#111" : "#fff" }}
          >
            Upgrade
          </button>
        </div>
      </div>
    </div>
  )
}
