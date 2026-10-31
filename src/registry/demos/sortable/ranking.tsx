"use client"

import * as React from "react"
import { AnimatedNumber } from "@/components/ui/animated-number"
import { Sortable, SortableHandle, SortableItem } from "@/components/ui/sortable"

const features = ["Offline mode", "SSO for teams", "Public API", "Mobile app", "Audit logs"]

export default function SortableRanking() {
  const [items, setItems] = React.useState(features)

  return (
    <div className="w-full max-w-sm space-y-3">
      <div>
        <h3 className="text-sm font-medium">Rank what we build next</h3>
        <p className="text-xs text-muted-foreground">Drag, or focus a handle and press Space then ↑ ↓.</p>
      </div>
      <Sortable values={items} onValuesChange={setItems} className="gap-1.5">
        {items.map((item, i) => (
          <SortableItem key={item} value={item} className="flex items-center gap-3 border px-2 py-2">
            {/* le rang roule qd on déplace, on voit tt de suite l'effet */}
            <span className="flex w-6 justify-center font-mono text-sm text-muted-foreground">
              <AnimatedNumber value={i + 1} />
            </span>
            <span className="flex-1 text-sm">{item}</span>
            <SortableHandle />
          </SortableItem>
        ))}
      </Sortable>
    </div>
  )
}
