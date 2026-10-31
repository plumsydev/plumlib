"use client"

import * as React from "react"
import { NumberInput } from "@/components/ui/number-input"
import { AnimatedNumber } from "@/components/ui/animated-number"
import { Label } from "@/components/ui/label"

const PRICE = 12

export default function NumberInputDemo() {
  const [seats, setSeats] = React.useState(5)

  return (
    <div className="w-full max-w-xs space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="seats">Team seats</Label>
        <span className="text-xs text-muted-foreground">${PRICE} per seat</span>
      </div>
      <NumberInput id="seats" value={seats} onValueChange={setSeats} min={1} max={50} containerClassName="w-full" />
      <div className="flex items-baseline justify-between border-t pt-3 text-sm">
        <span className="text-muted-foreground">Billed monthly</span>
        <AnimatedNumber
          value={seats * PRICE}
          format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
          className="text-lg font-semibold tracking-tight"
        />
      </div>
      <p className="text-xs text-muted-foreground">Hold a button to repeat. Arrow keys work too, Shift for steps of 10.</p>
    </div>
  )
}
