"use client"

import * as React from "react"
import { Check, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tilt } from "@/components/ui/tilt"

export default function TiltProduct() {
  const [added, setAdded] = React.useState(false)

  return (
    <Tilt max={6} scale={1.03} className="rounded-2xl">
      <div className="w-64 overflow-hidden rounded-2xl border bg-card shadow-lg">
        <div className="relative flex aspect-square items-center justify-center bg-muted/60">
          <div className="size-28 rounded-full bg-gradient-to-br from-foreground/80 to-foreground/40 shadow-2xl" style={{ transform: "translateZ(40px)" }} />
        </div>
        <div className="space-y-3 p-4">
          <div>
            <h3 className="font-medium">Orb Speaker</h3>
            <p className="text-sm text-muted-foreground">Graphite · 360° sound</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold tabular-nums">$249</span>
            <Button size="sm" variant={added ? "secondary" : "default"} onClick={() => setAdded((a) => !a)}>
              {added ? <Check /> : <Plus />} {added ? "Added" : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </Tilt>
  )
}
