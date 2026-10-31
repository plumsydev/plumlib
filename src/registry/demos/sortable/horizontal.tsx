"use client"

import * as React from "react"
import { Sortable, SortableItem } from "@/components/ui/sortable"

export default function SortableHorizontal() {
  const [tabs, setTabs] = React.useState(["Overview", "Deployments", "Analytics", "Logs", "Settings"])

  return (
    <div className="space-y-3 text-center">
      <Sortable axis="x" values={tabs} onValuesChange={setTabs} className="gap-1.5 rounded-xl border bg-muted/40 p-1.5">
        {tabs.map((tab) => (
          <SortableItem key={tab} value={tab} handle={false} className="rounded-md border bg-background px-3 py-1.5 text-sm shadow-xs">
            {tab}
          </SortableItem>
        ))}
      </Sortable>
      <p className="text-xs text-muted-foreground">Drag the tabs to reorder them.</p>
    </div>
  )
}
