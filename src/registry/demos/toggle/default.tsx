"use client"

import { Bold, Italic, Underline } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

export default function ToggleDemo() {
  return (
    <div className="flex items-center gap-1">
      <Toggle aria-label="Bold" defaultPressed>
        <Bold />
      </Toggle>
      <Toggle aria-label="Italic">
        <Italic />
      </Toggle>
      <Toggle aria-label="Underline">
        <Underline />
      </Toggle>
    </div>
  )
}
