"use client"

import * as React from "react"
import { ColorPicker } from "@/components/ui/color-picker"
import { Label } from "@/components/ui/label"

export default function ColorPickerDemo() {
  const [color, setColor] = React.useState("#8b5cf6")
  return (
    <div className="flex flex-col items-center gap-3">
      <Label>Label color</Label>
      <ColorPicker value={color} onValueChange={setColor} />
      <span
        className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors duration-300"
        style={{ color, borderColor: `${color}55`, background: `${color}14` }}
      >
        <span className="size-1.5 rounded-full" style={{ background: color }} />
        In review
      </span>
    </div>
  )
}
