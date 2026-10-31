"use client"

import { Slider } from "@/components/ui/slider"

export default function SliderTooltip() {
  return (
    <Slider
      defaultValue={[2048]}
      min={256}
      max={8192}
      step={256}
      showTooltip
      formatValue={(v) => `${v} MB`}
      className="max-w-xs"
      aria-label="Memory"
    />
  )
}
