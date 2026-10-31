"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tilt } from "@/components/ui/tilt"

export default function TiltSettings() {
  const [max, setMax] = React.useState(12)
  const [glare, setGlare] = React.useState(true)

  return (
    <div className="flex flex-col items-center gap-8 sm:flex-row sm:gap-12">
      <Tilt max={max} glare={glare} className="rounded-2xl">
        <div className="flex size-48 flex-col items-center justify-center gap-1 rounded-2xl border bg-card shadow-lg">
          <span className="text-4xl font-semibold tracking-tight tabular-nums">{max}°</span>
          <span className="text-xs text-muted-foreground">max tilt</span>
        </div>
      </Tilt>
      <div className="grid w-56 gap-5">
        <div className="space-y-2">
          <Label>Max angle</Label>
          <Slider value={[max]} min={0} max={25} onValueChange={([v]) => setMax(v)} />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="tilt-glare">Glare</Label>
          <Switch id="tilt-glare" checked={glare} onCheckedChange={setGlare} />
        </div>
      </div>
    </div>
  )
}
