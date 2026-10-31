"use client"

import { Badge } from "@/components/ui/badge"

export default function BadgeStatus() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="success" dot>Operational</Badge>
      <Badge variant="warning" dot>Degraded</Badge>
      <Badge variant="destructive" dot>Outage</Badge>
      <Badge variant="info">Beta</Badge>
    </div>
  )
}
