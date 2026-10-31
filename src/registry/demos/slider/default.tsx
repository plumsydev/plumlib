"use client"

import { Slider } from "@/components/ui/slider"

export default function SliderDemo() {
  return <Slider defaultValue={[64]} max={100} step={1} className="max-w-xs" aria-label="Volume" />
}
