"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { AnimatedNumber } from "@/components/ui/animated-number"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const plans = [
  { name: "Hobby", monthly: 0, yearly: 0, desc: "For side projects.", features: ["1 project", "Community support"] },
  { name: "Pro", monthly: 24, yearly: 19, desc: "For growing teams.", features: ["Unlimited projects", "Preview comments", "Priority support"], featured: true },
]

export default function CardPricing() {
  const [billing, setBilling] = React.useState("yearly")
  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-5">
      <ToggleGroup type="single" variant="outline" size="sm" value={billing} onValueChange={(v) => v && setBilling(v)}>
        <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
        <ToggleGroupItem value="yearly">Yearly · save 20%</ToggleGroupItem>
      </ToggleGroup>
      <div className="grid w-full gap-3 sm:grid-cols-2">
        {plans.map((p) => (
          <Card key={p.name} interactive className={p.featured ? "border-foreground/20 shadow-md" : undefined}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {p.name}
                {p.featured && <Badge variant="brand">Popular</Badge>}
              </CardTitle>
              <CardDescription>{p.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* le prix roule qd on change de période */}
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-semibold tracking-tight">
                  €<AnimatedNumber value={billing === "yearly" ? p.yearly : p.monthly} />
                </span>
                <span className="text-sm text-muted-foreground">/ month</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="size-3.5 text-success" /> {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={p.featured ? "default" : "outline"}>
                {p.monthly ? "Start trial" : "Get started"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
