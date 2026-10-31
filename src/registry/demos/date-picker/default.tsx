"use client"

import * as React from "react"
import { DatePicker } from "@/components/ui/date-picker"
import { Label } from "@/components/ui/label"

export default function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>()
  const days = date ? Math.ceil((date.getTime() - Date.now()) / 86400000) : null

  return (
    <div className="w-64 space-y-2">
      <Label>Launch date</Label>
      <DatePicker value={date} onChange={setDate} minDate={new Date()} />
      <p className="h-5 text-xs text-muted-foreground">
        {days === null ? "Pick the day you ship." : days <= 0 ? "Shipping today." : `${days} day${days > 1 ? "s" : ""} to go.`}
      </p>
    </div>
  )
}
