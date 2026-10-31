"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const sides = ["top", "right", "bottom", "left"] as const

export default function SheetSides() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {sides.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline" className="capitalize">
              {side}
            </Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader className="pb-6">
              <SheetTitle className="capitalize">{side} sheet</SheetTitle>
              <SheetDescription>Slides in from the {side} edge of the screen.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
