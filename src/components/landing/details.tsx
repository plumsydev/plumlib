"use client"

import * as React from "react"
import { Bold, Italic, Underline } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CopyButton } from "@/components/ui/copy-button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Reveal, SectionHeading } from "./reveal"

function LoadingTile() {
  const [loading, setLoading] = React.useState(false)
  return (
    <Button
      loading={loading}
      onClick={() => {
        setLoading(true)
        setTimeout(() => setLoading(false), 1600)
      }}
    >
      {loading ? "Deploying" : "Deploy"}
    </Button>
  )
}

const tiles = [
  {
    name: "Checkbox",
    hint: "The check draws itself",
    node: (
      <div className="flex items-center gap-2.5">
        <Checkbox id="d-check" defaultChecked />
        <Label htmlFor="d-check">Email me updates</Label>
      </div>
    ),
  },
  { name: "Switch", hint: "The thumb stretches on press", node: <Switch defaultChecked aria-label="Toggle" /> },
  { name: "Button", hint: "Loading grows in place", node: <LoadingTile /> },
  { name: "Copy button", hint: "Icons swap with a spring", node: <CopyButton value="plum" label="Copy token" variant="outline" /> },
  {
    name: "Toggle group",
    hint: "The indicator follows you",
    node: (
      <ToggleGroup type="single" variant="outline" defaultValue="bold" aria-label="Format">
        <ToggleGroupItem value="bold" aria-label="Bold"><Bold /></ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic"><Italic /></ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline"><Underline /></ToggleGroupItem>
      </ToggleGroup>
    ),
  },
  {
    name: "Slider",
    hint: "Drag it, the value follows",
    node: <Slider defaultValue={[60]} showTooltip formatValue={(v) => `${v}%`} className="w-40" aria-label="Volume" />,
  },
]

export function Details() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        eyebrow="Details"
        title="Go on, touch something."
        description="Small interactions are where interfaces earn trust. Each one here is tuned by hand."
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t, i) => (
          <Reveal key={t.name} delay={(i % 3) * 0.06}>
            <div className="group relative flex h-52 flex-col overflow-hidden rounded-2xl border bg-card transition-[border-color,box-shadow] duration-300 hover:border-foreground/15 hover:shadow-lg">
              <div className="flex flex-1 items-center justify-center">{t.node}</div>
              <div className="flex items-center justify-between border-t px-4 py-3 text-sm">
                <span className="font-medium">{t.name}</span>
                <span className="text-xs text-muted-foreground">{t.hint}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
