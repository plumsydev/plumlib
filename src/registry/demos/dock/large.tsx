"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Dock, DockItem } from "@/components/ui/dock"
import { Bookmark, Compass, Home, Library, User } from "lucide-react"

const items = [
  { label: "Home", icon: Home },
  { label: "Explore", icon: Compass },
  { label: "Library", icon: Library },
  { label: "Saved", icon: Bookmark },
  { label: "Profile", icon: User },
]

export default function DockLarge() {
  const [magnification, setMagnification] = React.useState(72)
  const [distance, setDistance] = React.useState(140)

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="flex h-32 items-end">
        <Dock magnification={magnification} distance={distance}>
          {items.map((i) => (
            <DockItem key={i.label} label={i.label}>
              <i.icon />
            </DockItem>
          ))}
        </Dock>
      </div>
      <div className="grid w-full max-w-sm gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Magnification</Label>
            <span className="font-mono text-xs text-muted-foreground">{magnification}px</span>
          </div>
          <Slider value={[magnification]} min={40} max={96} onValueChange={([v]) => setMagnification(v)} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Distance</Label>
            <span className="font-mono text-xs text-muted-foreground">{distance}px</span>
          </div>
          <Slider value={[distance]} min={60} max={260} step={10} onValueChange={([v]) => setDistance(v)} />
        </div>
      </div>
    </div>
  )
}
