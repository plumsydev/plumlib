"use client"

import * as React from "react"
import { TextEffect } from "@/components/ui/text-effect"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const presets = ["fade", "blur", "slide", "scale"] as const
const pers = ["word", "char"] as const

export default function TextEffectPresets() {
  const [preset, setPreset] = React.useState<(typeof presets)[number]>("slide")
  const [per, setPer] = React.useState<(typeof pers)[number]>("char")

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="flex flex-wrap justify-center gap-3">
        <ToggleGroup type="single" variant="outline" size="sm" value={preset} onValueChange={(v) => v && setPreset(v as typeof preset)}>
          {presets.map((p) => (
            <ToggleGroupItem key={p} value={p} className="px-3 capitalize">{p}</ToggleGroupItem>
          ))}
        </ToggleGroup>
        <ToggleGroup type="single" variant="outline" size="sm" value={per} onValueChange={(v) => v && setPer(v as typeof per)}>
          {pers.map((p) => (
            <ToggleGroupItem key={p} value={p} className="px-3">per {p}</ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      {/* la key rejoue l'anim à chaque changement de preset */}
      <TextEffect key={preset + per} preset={preset} per={per} as="h3" className="text-center text-3xl font-semibold tracking-tight">
        Motion with intent
      </TextEffect>
    </div>
  )
}
