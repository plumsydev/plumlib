"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TextEffect } from "@/components/ui/text-effect"

export default function TextEffectLines() {
  const [key, setKey] = React.useState(0)

  return (
    <div className="flex flex-col items-center gap-6">
      <figure key={key} className="max-w-sm">
        <TextEffect per="line" preset="slide" trigger="inView" className="text-xl leading-snug font-medium tracking-tight">
          {"Good motion is invisible.\nYou only notice it\nwhen it's missing."}
        </TextEffect>
        <TextEffect as="span" delay={0.6} preset="fade" className="mt-3 block text-sm text-muted-foreground">
          — Every product designer, eventually
        </TextEffect>
      </figure>
      <Button variant="ghost" size="sm" onClick={() => setKey((k) => k + 1)}>
        <RotateCcw /> Replay
      </Button>
    </div>
  )
}
