"use client"

import { Bookmark, Star } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

export default function ToggleOutline() {
  return (
    <div className="flex items-center gap-2">
      <Toggle variant="outline" aria-label="Star" className="data-[state=on]:[&_svg]:fill-warning data-[state=on]:[&_svg]:stroke-warning">
        <Star /> Star
      </Toggle>
      <Toggle variant="outline" size="sm" aria-label="Bookmark" className="data-[state=on]:[&_svg]:fill-current">
        <Bookmark /> Save
      </Toggle>
    </div>
  )
}
