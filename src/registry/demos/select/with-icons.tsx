"use client"

import { Circle, CircleCheck, CircleDashed, CircleDot } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SelectWithIcons() {
  return (
    <Select defaultValue="progress">
      <SelectTrigger size="sm" className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="backlog">
          <CircleDashed /> Backlog
        </SelectItem>
        <SelectItem value="todo">
          <Circle /> Todo
        </SelectItem>
        <SelectItem value="progress">
          <CircleDot className="text-warning" /> In progress
        </SelectItem>
        <SelectItem value="done">
          <CircleCheck className="text-brand" /> Done
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
