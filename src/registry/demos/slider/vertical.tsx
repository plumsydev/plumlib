"use client"

import { Slider } from "@/components/ui/slider"

export default function SliderVertical() {
  return (
    <div className="flex h-44 items-center gap-8">
      <Slider orientation="vertical" defaultValue={[40]} aria-label="Bass" />
      <Slider orientation="vertical" defaultValue={[70]} aria-label="Mid" />
      <Slider orientation="vertical" defaultValue={[55]} aria-label="Treble" />
    </div>
  )
}
