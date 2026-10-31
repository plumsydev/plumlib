"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { CopyIconButton } from "./copy"
import { cn } from "@/lib/utils"

const presets = [
  { name: "Plum", hue: 330 },
  { name: "Ocean", hue: 245 },
  { name: "Forest", hue: 155 },
  { name: "Ember", hue: 35 },
  { name: "Violet", hue: 290 },
]

const radii = [0, 0.375, 0.625, 0.875]

export function ThemePlayground() {
  const [hue, setHue] = React.useState(330)
  const [radius, setRadius] = React.useState(0.625)

  const vars = {
    "--brand": `oklch(0.56 0.2 ${hue})`,
    "--ring": `oklch(0.56 0.2 ${hue} / 45%)`,
    "--radius": `${radius}rem`,
  } as React.CSSProperties

  const css = `:root {
  --radius: ${radius}rem;
  --brand: oklch(0.56 0.2 ${hue});
  --ring: oklch(0.56 0.2 ${hue} / 45%);
}

.dark {
  --brand: oklch(0.7 0.17 ${hue});
  --ring: oklch(0.7 0.17 ${hue} / 50%);
}`

  return (
    <div className="my-6 overflow-hidden rounded-xl border">
      <div className="grid gap-6 border-b bg-muted/30 p-5 sm:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Brand hue</Label>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">{hue}°</span>
          </div>
          <Slider value={[hue]} onValueChange={([v]) => setHue(v)} min={0} max={360} step={1} />
          <div className="flex flex-wrap gap-1.5">
            {presets.map((p) => (
              <button
                key={p.name}
                onClick={() => setHue(p.hue)}
                className={cn(
                  "flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors hover:bg-accent",
                  hue === p.hue && "border-foreground/30 bg-accent"
                )}
              >
                <span className="size-2.5 rounded-full" style={{ background: `oklch(0.56 0.2 ${p.hue})` }} />
                {p.name}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <Label>Radius</Label>
          <div className="grid grid-cols-4 gap-1.5">
            {radii.map((r) => (
              <button
                key={r}
                onClick={() => setRadius(r)}
                className={cn(
                  "cursor-pointer rounded-md border py-1.5 font-mono text-xs transition-colors hover:bg-accent",
                  radius === r && "border-foreground/30 bg-accent"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={vars} className="grid gap-6 p-6 sm:grid-cols-2">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="brand">Upgrade plan</Button>
            <Button variant="outline">Cancel</Button>
          </div>
          <div className="flex gap-2">
            <Badge variant="brand">New</Badge>
            <Badge variant="outline">v0.1</Badge>
          </div>
        </div>
        <div className="space-y-4">
          <Input placeholder="Focus me to see the ring" />
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Checkbox id="pg-check" defaultChecked />
              <Label htmlFor="pg-check">Remember</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="pg-switch" defaultChecked />
              <Label htmlFor="pg-switch">Alerts</Label>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t bg-muted/30">
        <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-foreground/80">{css}</pre>
        <CopyIconButton value={css} className="absolute top-2.5 right-2.5" />
      </div>
    </div>
  )
}
