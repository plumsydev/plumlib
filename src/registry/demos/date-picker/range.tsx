"use client"

import * as React from "react"
import type { DateRange } from "@/components/ui/calendar"
import { DateRangePicker } from "@/components/ui/date-picker"
import { AnimatedNumber } from "@/components/ui/animated-number"

export default function DateRangePickerDemo() {
  const [range, setRange] = React.useState<DateRange | undefined>()
  const days = range?.from && range.to ? Math.round((range.to.getTime() - range.from.getTime()) / 86400000) + 1 : 0

  return (
    <div className="w-80 space-y-4">
      <DateRangePicker value={range} onChange={setRange} placeholder="Filter by date" />
      <div className="grid grid-cols-2 gap-3 rounded-lg border p-3">
        <div>
          <div className="text-xs text-muted-foreground">Visitors</div>
          <AnimatedNumber value={days * 1842} className="text-lg font-semibold" />
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Signups</div>
          <AnimatedNumber value={days * 37} className="text-lg font-semibold" />
        </div>
      </div>
    </div>
  )
}
