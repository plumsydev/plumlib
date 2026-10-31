"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

export default function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const fmt = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" })

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-xl border bg-card shadow-xs">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </div>
      <p className="h-5 text-sm text-muted-foreground">{date ? fmt.format(date) : "No date selected"}</p>
    </div>
  )
}
