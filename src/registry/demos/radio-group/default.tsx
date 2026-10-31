"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      {[
        ["default", "Default"],
        ["comfortable", "Comfortable"],
        ["compact", "Compact"],
      ].map(([value, label]) => (
        <div key={value} className="flex items-center gap-2.5">
          <RadioGroupItem value={value} id={`r-${value}`} />
          <Label htmlFor={`r-${value}`}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}
