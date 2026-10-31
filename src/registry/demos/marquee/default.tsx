"use client"

import { Marquee } from "@/components/ui/marquee"

const companies = ["Northwind", "Acme", "Globex", "Initech", "Umbrella", "Hooli", "Stark", "Wayne", "Tyrell", "Soylent"]

export default function MarqueeDemo() {
  return (
    <div className="w-full max-w-2xl space-y-4">
      <p className="text-center text-xs tracking-wider text-muted-foreground uppercase">Trusted by teams at</p>
      <Marquee speed={36} className="[--gap:3rem]">
        {companies.map((c) => (
          <span key={c} className="text-xl font-semibold tracking-tight text-foreground/50 transition-colors hover:text-foreground">
            {c}
          </span>
        ))}
      </Marquee>
    </div>
  )
}
