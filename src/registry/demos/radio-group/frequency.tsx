"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { spring } from "@/lib/motion"

const options = [
  { value: "instant", label: "Instantly", summary: "You'll get an email for every mention and reply." },
  { value: "daily", label: "Daily digest", summary: "One email at 9:00 with everything from the last 24 hours." },
  { value: "weekly", label: "Weekly digest", summary: "A Monday morning recap. Quiet the rest of the week." },
  { value: "never", label: "Never", summary: "No emails. You'll still see notifications in the app." },
]

export default function RadioGroupFrequency() {
  const [value, setValue] = React.useState("daily")
  const current = options.find((o) => o.value === value)!

  return (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <h3 className="text-sm font-medium">Email notifications</h3>
        <p className="text-xs text-muted-foreground">How often should we write?</p>
      </div>
      <RadioGroup value={value} onValueChange={setValue}>
        {options.map((o) => (
          <div key={o.value} className="flex items-center gap-2.5">
            <RadioGroupItem value={o.value} id={`freq-${o.value}`} />
            <Label htmlFor={`freq-${o.value}`}>{o.label}</Label>
          </div>
        ))}
      </RadioGroup>
      <div className="relative min-h-12 overflow-hidden rounded-lg border bg-muted/40 px-3 py-2.5 text-xs text-muted-foreground">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={current.value}
            initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
            transition={spring.snappy}
          >
            {current.summary}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}
