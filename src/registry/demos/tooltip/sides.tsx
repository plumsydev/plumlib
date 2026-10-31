"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const sides = ["top", "right", "bottom", "left"] as const

export default function TooltipSides() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {sides.map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" className="capitalize">
              {side}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side} showArrow>
            Tooltip on the {side}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
