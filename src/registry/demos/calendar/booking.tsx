"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/toast"

const slots = ["09:00", "09:30", "10:00", "11:30", "14:00", "15:30", "16:00"]

export default function CalendarBooking() {
  const today = new Date()
  const [date, setDate] = React.useState<Date | undefined>()
  const [slot, setSlot] = React.useState<string | null>(null)
  const weekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6
  const max = new Date(today.getFullYear(), today.getMonth() + 2, 0)
  // on ouvre sur le 1er jour ouvré, sinon un samedi soir on tombe sur un mois tt barré
  const firstOpen = new Date(today)
  while (weekend(firstOpen)) firstOpen.setDate(firstOpen.getDate() + 1)
  // faux créneaux pris, qui dépendent du jour pr que ça change qd on clique
  const taken = (s: string) => date && (date.getDate() + s.length + Number(s.slice(0, 2))) % 4 === 0

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-card shadow-xs sm:flex-row">
      <Calendar
        mode="single"
        selected={date}
        onSelect={(d) => {
          setDate(d)
          setSlot(null)
        }}
        defaultMonth={firstOpen}
        minDate={today}
        maxDate={max}
        disabled={weekend}
      />
      <div className="flex w-full flex-col gap-2 border-t p-3 sm:w-40 sm:border-t-0 sm:border-l">
        <p className="px-1 text-xs font-medium text-muted-foreground">{date ? "Available times" : "Pick a weekday"}</p>
        <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-1">
          {slots.map((s) => (
            <button
              key={s}
              type="button"
              disabled={!date || taken(s)}
              onClick={() => setSlot(s)}
              className={cn(
                "h-8 cursor-pointer rounded-md border text-sm tabular-nums transition-[background-color,color,border-color,transform,translate,scale,rotate] duration-150 active:scale-95",
                "hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent",
                slot === s && "border-primary bg-primary text-primary-foreground hover:bg-primary"
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <Button
          size="sm"
          className="mt-auto"
          disabled={!slot}
          onClick={() =>
            toast.success("Call booked", {
              description: `${new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date)} at ${slot}`,
            })
          }
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}
