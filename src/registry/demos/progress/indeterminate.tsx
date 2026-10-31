"use client"

import { Progress } from "@/components/ui/progress"

export default function ProgressIndeterminate() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <p className="text-sm text-muted-foreground">Provisioning database…</p>
      <Progress value={null} variant="brand" size="sm" />
    </div>
  )
}
