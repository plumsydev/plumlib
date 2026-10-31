"use client"

import { Activity, Globe, Lock, Zap } from "lucide-react"
import { Spotlight, SpotlightGroup } from "@/components/ui/spotlight"

const features = [
  { icon: Zap, title: "Edge functions", desc: "Run code 50ms from every user." },
  { icon: Globe, title: "Global CDN", desc: "Assets cached in 120 regions." },
  { icon: Lock, title: "Firewall", desc: "Block bots before they hit your app." },
  { icon: Activity, title: "Observability", desc: "Logs, traces and metrics in one place." },
]

export default function SpotlightGrid() {
  return (
    // fill désactivé, on garde que les bordures qui s'allument : plus discret
    <SpotlightGroup className="grid w-full max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border">
      {features.map(({ icon: Icon, title, desc }) => (
        <Spotlight key={title} size={420} border={false} className="bg-card p-5">
          <Icon className="size-4 text-muted-foreground" />
          <h3 className="mt-3 text-sm font-medium">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
        </Spotlight>
      ))}
    </SpotlightGroup>
  )
}
