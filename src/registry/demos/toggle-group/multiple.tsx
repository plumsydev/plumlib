"use client"

import { Bold, Code, Italic, Strikethrough } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function ToggleGroupMultiple() {
  return (
    <ToggleGroup type="multiple" defaultValue={["bold"]} aria-label="Formatting">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="strike" aria-label="Strikethrough">
        <Strikethrough />
      </ToggleGroupItem>
      <ToggleGroupItem value="code" aria-label="Code">
        <Code />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
