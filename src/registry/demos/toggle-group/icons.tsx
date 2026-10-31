"use client"

import { LayoutGrid, List, Rows3 } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function ToggleGroupIcons() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <ToggleGroup type="single" variant="outline" defaultValue="grid" aria-label="View">
        <ToggleGroupItem value="list" aria-label="List">
          <List />
        </ToggleGroupItem>
        <ToggleGroupItem value="rows" aria-label="Rows">
          <Rows3 />
        </ToggleGroupItem>
        <ToggleGroupItem value="grid" aria-label="Grid">
          <LayoutGrid />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" variant="ghost" size="sm" defaultValue="all" aria-label="Filter">
        <ToggleGroupItem value="all">All</ToggleGroupItem>
        <ToggleGroupItem value="active">Active</ToggleGroupItem>
        <ToggleGroupItem value="archived">Archived</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
