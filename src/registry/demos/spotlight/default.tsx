"use client"

import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Spotlight, SpotlightGroup } from "@/components/ui/spotlight"

const plans = [
  { name: "Hobby", price: "$0", desc: "For side projects.", features: ["1 project", "Community support", "Basic analytics"] },
  { name: "Pro", price: "$20", desc: "For growing teams.", features: ["Unlimited projects", "Preview deployments", "Advanced analytics"], featured: true },
  { name: "Scale", price: "$80", desc: "For serious traffic.", features: ["SSO & audit logs", "99.99% SLA", "Dedicated support"] },
]

export default function SpotlightDemo() {
  return (
    <SpotlightGroup className="grid w-full max-w-3xl gap-3 sm:grid-cols-3">
      {plans.map((plan) => (
        <Spotlight key={plan.name} className="flex flex-col rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{plan.name}</h3>
            {plan.featured && <Badge variant="secondary">Popular</Badge>}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
          <p className="mt-5 text-3xl font-semibold tracking-tight">
            {plan.price}
            <span className="text-sm font-normal text-muted-foreground"> /mo</span>
          </p>
          <ul className="mt-5 flex-1 space-y-2 text-sm">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Check className="size-3.5 text-muted-foreground" /> {f}
              </li>
            ))}
          </ul>
          <Button className="mt-6 w-full" size="sm" variant={plan.featured ? "default" : "outline"}>
            Choose {plan.name}
          </Button>
        </Spotlight>
      ))}
    </SpotlightGroup>
  )
}
