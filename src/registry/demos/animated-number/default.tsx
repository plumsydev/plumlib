"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { AnimatedNumber } from "@/components/ui/animated-number"
import { Button } from "@/components/ui/button"

export default function AnimatedNumberDemo() {
  const [value, setValue] = React.useState(1280)

  return (
    <div className="flex flex-col items-center gap-5">
      <AnimatedNumber value={value} className="text-5xl font-semibold tracking-tight" />
      <div className="flex gap-2">
        <Button variant="outline" size="icon-sm" aria-label="Decrease" onClick={() => setValue((v) => v - 137)}>
          <Minus />
        </Button>
        <Button variant="outline" size="sm" onClick={() => setValue(Math.round(Math.random() * 99999))}>
          Randomize
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Increase" onClick={() => setValue((v) => v + 137)}>
          <Plus />
        </Button>
      </div>
    </div>
  )
}
