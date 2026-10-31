"use client"

import * as React from "react"
import { MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

const places = [
  ["Café Lomi", "Coffee · 350 m", "Open until 18:00"],
  ["Le Comptoir Général", "Bar · 900 m", "Open until 02:00"],
  ["Ten Belles", "Coffee · 1.2 km", "Open until 17:00"],
  ["Holybelly", "Brunch · 1.4 km", "Opens at 09:00"],
  ["Du Pain et des Idées", "Bakery · 1.8 km", "Closed today"],
]

export default function DrawerSnapPoints() {
  const snapPoints = ["180px", 0.55, 1] as const
  const [snap, setSnap] = React.useState<number | string | null>(snapPoints[0])

  return (
    <Drawer snapPoints={[...snapPoints]} activeSnapPoint={snap} setActiveSnapPoint={setSnap} shouldScaleBackground={false}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <MapPin /> Nearby places
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full max-h-[96%]">
        <DrawerHeader className="text-left">
          <DrawerTitle>5 places nearby</DrawerTitle>
          <DrawerDescription>Drag the handle up to see more.</DrawerDescription>
        </DrawerHeader>
        <ul className="mx-auto w-full max-w-md divide-y overflow-y-auto px-4">
          {places.map(([name, meta, hours]) => (
            <li key={name} className="flex items-center gap-3 py-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-muted">
                <MapPin className="size-4 text-muted-foreground" />
              </span>
              <div className="flex-1">
                <div className="text-sm font-medium">{name}</div>
                <div className="text-xs text-muted-foreground">
                  {meta} · {hours}
                </div>
              </div>
              <Button size="icon-sm" variant="ghost" aria-label={`Directions to ${name}`}>
                <Navigation />
              </Button>
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  )
}
