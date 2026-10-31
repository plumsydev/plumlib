"use client"

import * as React from "react"
import { Calendar, type DateRange } from "@/components/ui/calendar"

export default function CalendarRange() {
  const today = new Date()
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
    to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 9),
  })
  const nights = range?.from && range.to ? Math.round((range.to.getTime() - range.from.getTime()) / 86400000) : 0

  return (
    <div className="rounded-xl border bg-card shadow-xs">
      <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} minDate={today}>
        <div className="flex items-center justify-between px-1 text-sm">
          <span className="text-muted-foreground">
            {nights ? `${nights} night${nights > 1 ? "s" : ""} in Lisbon` : "Select your check-out date"}
          </span>
          <span className="font-medium tabular-nums">{nights ? `€${nights * 142}` : "—"}</span>
        </div>
      </Calendar>
    </div>
  )
}
