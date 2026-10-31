"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Magnetic } from "@/components/ui/magnetic"
import { Slider } from "@/components/ui/slider"

export default function MagneticStrength() {
  const [strength, setStrength] = React.useState(0.4)
  const [range, setRange] = React.useState(100)

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-10">
      <div className="relative flex size-48 items-center justify-center">
        {/* le cercle pointillé montre la zone d'influence */}
        <span
          className="absolute rounded-full border border-dashed border-foreground/15 transition-all duration-300"
          style={{ width: 64 + range * 2, height: 64 + range * 2 }}
        />
        <Magnetic strength={strength} range={range}>
          <div className="flex size-16 items-center justify-center rounded-2xl bg-foreground text-background shadow-lg">
            <span className="font-mono text-sm font-medium">{strength.toFixed(2)}</span>
          </div>
        </Magnetic>
      </div>
      <div className="grid w-full gap-5">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Strength</Label>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">{strength.toFixed(2)}</span>
          </div>
          <Slider value={[strength]} min={0} max={1} step={0.05} onValueChange={([v]) => setStrength(v)} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Range</Label>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">{range}px</span>
          </div>
          <Slider value={[range]} min={20} max={160} step={5} onValueChange={([v]) => setRange(v)} />
        </div>
      </div>
    </div>
  )
}
