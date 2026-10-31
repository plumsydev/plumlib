"use client"

import { Spinner } from "@/components/ui/spinner"
import { Badge } from "@/components/ui/badge"

export default function SpinnerInline() {
  return (
    <div className="flex flex-col items-center gap-4 text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Spinner size="sm" />
        Building <span className="font-mono text-foreground">acme-web</span>
      </div>
      <Badge variant="outline" className="gap-1.5">
        <Spinner size="sm" variant="dots" className="size-3" />
        Queued
      </Badge>
    </div>
  )
}
