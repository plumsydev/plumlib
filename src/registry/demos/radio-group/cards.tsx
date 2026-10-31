"use client"

import { RadioGroup, RadioGroupCard } from "@/components/ui/radio-group"

const plans = [
  { value: "hobby", name: "Hobby", desc: "For personal projects and experiments.", price: "Free" },
  { value: "pro", name: "Pro", desc: "For teams shipping to production.", price: "$20/mo" },
  { value: "enterprise", name: "Enterprise", desc: "SSO, audit logs and dedicated support.", price: "Custom" },
]

export default function RadioGroupCards() {
  return (
    <RadioGroup defaultValue="pro" className="w-full max-w-sm">
      {plans.map((p) => (
        <RadioGroupCard key={p.value} value={p.value}>
          <span className="flex items-center justify-between text-sm font-medium">
            {p.name}
            <span className="tabular-nums text-muted-foreground">{p.price}</span>
          </span>
          <span className="text-sm text-muted-foreground">{p.desc}</span>
        </RadioGroupCard>
      ))}
    </RadioGroup>
  )
}
