"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function SliderRange() {
  const [value, setValue] = React.useState([20, 80])

  return (
    <div className="grid w-full max-w-xs gap-4">
      <div className="flex items-center justify-between">
        <Label>Price range</Label>
        <span className="text-sm tabular-nums text-muted-foreground">
          ${value[0]} – ${value[1]}
        </span>
      </div>
      <Slider value={value} onValueChange={setValue} max={100} step={5} minStepsBetweenThumbs={1} showTooltip formatValue={(v) => `$${v}`} />
    </div>
  )
}
