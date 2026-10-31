"use client"

import * as React from "react"
import { Rating } from "@/components/ui/rating"
import { AnimatedNumber } from "@/components/ui/animated-number"

export default function RatingHalf() {
  const [value, setValue] = React.useState(3.5)
  return (
    <div className="flex flex-col items-center gap-2">
      <Rating value={value} onValueChange={setValue} allowHalf size="lg" />
      <p className="text-sm text-muted-foreground">
        <AnimatedNumber value={value} format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }} className="font-medium text-foreground" /> out of 5
        <span className="ml-1.5 text-xs">· hover the left half of a star</span>
      </p>
    </div>
  )
}
