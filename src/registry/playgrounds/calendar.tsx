"use client"

import { Calendar } from "@/components/ui/calendar"
import { Playground } from "@/components/site/playground"

export default function CalendarPlayground() {
  return (
    <Playground
      controls={{
        mode: { type: "select", options: ["single", "range", "multiple"], default: "single" },
        numberOfMonths: { type: "select", options: ["1", "2"], default: "1", label: "months" },
        weekStartsOn: { type: "select", options: ["0", "1"], default: "1" },
        locale: { type: "select", options: ["en-US", "fr-FR", "de-DE", "es-ES", "ja-JP"], default: "en-US" },
        showOutsideDays: { type: "boolean", default: true },
        disableWeekends: { type: "boolean", default: false },
      }}
      render={({ mode, numberOfMonths, weekStartsOn, locale, showOutsideDays, disableWeekends }) => (
        <div className="rounded-xl border bg-card shadow-xs">
          <Calendar
            // remonte qd le mode change, la valeur interne n'a pas la même forme
            key={mode}
            mode={mode as "single"}
            numberOfMonths={Number(numberOfMonths) as 1 | 2}
            weekStartsOn={Number(weekStartsOn) as 0 | 1}
            locale={locale}
            showOutsideDays={showOutsideDays}
            disabled={disableWeekends ? (d) => d.getDay() === 0 || d.getDay() === 6 : undefined}
          />
        </div>
      )}
      code={({ mode, numberOfMonths, weekStartsOn, locale, showOutsideDays, disableWeekends }) => {
        const state = mode === "single" ? "Date | undefined" : mode === "range" ? "DateRange | undefined" : "Date[]"
        const lines = [
          `mode="${mode}"`,
          "selected={value}",
          "onSelect={setValue}",
          numberOfMonths === "2" && "numberOfMonths={2}",
          weekStartsOn === "0" && "weekStartsOn={0}",
          locale !== "en-US" && `locale="${locale}"`,
          !showOutsideDays && "showOutsideDays={false}",
          disableWeekends && "disabled={(d) => d.getDay() === 0 || d.getDay() === 6}",
        ].filter(Boolean)
        return `const [value, setValue] = React.useState<${state}>(${mode === "multiple" ? "[]" : ""})

<Calendar
  ${lines.join("\n  ")}
/>`
      }}
    />
  )
}
