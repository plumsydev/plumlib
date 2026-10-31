"use client"

import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="brand">
        <Check /> Shipped
      </Badge>
    </div>
  )
}
