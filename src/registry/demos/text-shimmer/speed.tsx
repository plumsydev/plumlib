"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { TextShimmer } from "@/components/ui/text-shimmer"

export default function TextShimmerSpeed() {
  const [duration, setDuration] = React.useState(2)
  const [spread, setSpread] = React.useState(2)

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-8">
      <TextShimmer as="h3" duration={duration} spread={spread} className="text-4xl font-semibold tracking-tight">
        Generating preview
      </TextShimmer>
      <div className="grid w-full gap-5">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Duration</Label>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">{duration.toFixed(1)}s</span>
          </div>
          <Slider value={[duration]} min={0.5} max={5} step={0.1} onValueChange={([v]) => setDuration(v)} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Spread</Label>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">{spread}</span>
          </div>
          <Slider value={[spread]} min={1} max={6} step={0.5} onValueChange={([v]) => setSpread(v)} />
        </div>
      </div>
    </div>
  )
}
