"use client"

import * as React from "react"
import { DatePicker } from "@/components/ui/date-picker"
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

export default function DatePickerForm() {
  const [date, setDate] = React.useState<Date | undefined>()
  const [submitted, setSubmitted] = React.useState(false)
  const tooSoon = date && date.getTime() - Date.now() < 2 * 86400000
  const invalid = submitted && (!date || tooSoon)

  return (
    <form
      className="w-72 space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
        if (date && !tooSoon) toast.success("Maintenance scheduled", { description: new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(date) })
      }}
    >
      <Field>
        <FieldLabel>Window name</FieldLabel>
        <FieldControl>
          <Input defaultValue="Database upgrade" />
        </FieldControl>
      </Field>
      <Field invalid={invalid}>
        <FieldLabel>Start date</FieldLabel>
        <DatePicker value={date} onChange={setDate} aria-invalid={invalid || undefined} disabledDates={(d) => d.getDay() === 0 || d.getDay() === 6} />
        <FieldDescription>Weekdays only, at least 48h ahead.</FieldDescription>
        <FieldError>{!date ? "Pick a date." : "Give the team at least 48 hours."}</FieldError>
      </Field>
      <Button type="submit" className="w-full">Schedule</Button>
    </form>
  )
}
