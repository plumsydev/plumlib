"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"

export default function CalendarMultiple() {
  const [days, setDays] = React.useState<Date[]>([])
  const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" })
  const sorted = [...days].sort((a, b) => a.getTime() - b.getTime())

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
      <div className="rounded-xl border bg-card shadow-xs">
        <Calendar mode="multiple" selected={days} onSelect={setDays} />
      </div>
      <div className="w-56 space-y-2 pt-1">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-medium">Time off</span>
          <span className="text-muted-foreground tabular-nums">{days.length} / 25 days</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {sorted.length ? (
            sorted.map((d) => (
              <Badge key={d.toDateString()} variant="secondary" className="cursor-pointer" onClick={() => setDays((all) => all.filter((x) => x.toDateString() !== d.toDateString()))}>
                {fmt.format(d)}
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Click days to add them. Click again to remove.</p>
          )}
        </div>
      </div>
    </div>
  )
}
