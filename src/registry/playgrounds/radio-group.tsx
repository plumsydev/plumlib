"use client"

import { RadioGroup, RadioGroupCard, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Playground } from "@/components/site/playground"

const plans = [
  ["hobby", "Hobby", "For side projects"],
  ["pro", "Pro", "For growing teams"],
  ["enterprise", "Enterprise", "Custom contracts"],
] as const

export default function RadioGroupPlayground() {
  return (
    <Playground
      controls={{
        variant: { type: "select", options: ["item", "card"], default: "item" },
        orientation: { type: "select", options: ["vertical", "horizontal"], default: "vertical" },
        disabled: { type: "boolean", default: false },
      }}
      render={({ variant, orientation, disabled }) => (
        <RadioGroup
          defaultValue="pro"
          disabled={disabled}
          orientation={orientation}
          className={orientation === "horizontal" ? "flex flex-wrap gap-4" : variant === "card" ? "w-full max-w-xs" : ""}
        >
          {plans.map(([value, label, desc]) =>
            variant === "card" ? (
              <RadioGroupCard key={value} value={value}>
                <span className="text-sm font-medium">{label}</span>
                <span className="text-xs text-muted-foreground">{desc}</span>
              </RadioGroupCard>
            ) : (
              <div key={value} className="flex items-center gap-2.5">
                <RadioGroupItem value={value} id={`pg-r-${value}`} />
                <Label htmlFor={`pg-r-${value}`}>{label}</Label>
              </div>
            )
          )}
        </RadioGroup>
      )}
      code={({ variant, orientation, disabled }) => `<RadioGroup defaultValue="pro"${orientation === "horizontal" ? ' orientation="horizontal" className="flex gap-4"' : ""}${disabled ? " disabled" : ""}>
${
  variant === "card"
    ? `  <RadioGroupCard value="hobby">
    <span className="text-sm font-medium">Hobby</span>
    <span className="text-xs text-muted-foreground">For side projects</span>
  </RadioGroupCard>
  {/* … */}`
    : `  <div className="flex items-center gap-2.5">
    <RadioGroupItem value="hobby" id="hobby" />
    <Label htmlFor="hobby">Hobby</Label>
  </div>
  {/* … */}`
}
</RadioGroup>`}
    />
  )
}
