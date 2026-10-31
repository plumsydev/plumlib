"use client"

import * as React from "react"
import { ProgressRing } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export default function ProgressRingDemo() {
  const [value, setValue] = React.useState(64)
  return (
    <div className="flex items-center gap-6">
      <ProgressRing value={value} size={64} strokeWidth={5} showValue />
      <ProgressRing value={value} size={40} className="text-success" />
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setValue((v) => Math.max(0, v - 15))}>
          −15
        </Button>
        <Button size="sm" variant="outline" onClick={() => setValue((v) => Math.min(100, v + 15))}>
          +15
        </Button>
      </div>
    </div>
  )
}
