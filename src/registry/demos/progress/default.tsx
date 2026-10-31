"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"

export default function ProgressDemo() {
  const [value, setValue] = React.useState(12)

  React.useEffect(() => {
    // on fait avancer par à-coups comme un vrai upload
    const id = setInterval(() => setValue((v) => (v >= 100 ? 8 : Math.min(100, v + Math.random() * 22))), 1100)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">Uploading assets</span>
        <span className="text-muted-foreground tabular-nums">{Math.round(value)}%</span>
      </div>
      <Progress value={value} />
    </div>
  )
}
