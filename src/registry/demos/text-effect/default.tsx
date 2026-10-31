"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TextEffect } from "@/components/ui/text-effect"

export default function TextEffectDemo() {
  const [key, setKey] = React.useState(0)

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div key={key} className="space-y-3">
        <TextEffect as="h2" className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Ship interfaces people remember.
        </TextEffect>
        <TextEffect delay={0.5} preset="fade" className="mx-auto max-w-sm text-muted-foreground">
          Every word lands on its own beat, so the eye follows the sentence instead of the layout.
        </TextEffect>
      </div>
      <Button variant="outline" size="sm" onClick={() => setKey((k) => k + 1)}>
        <RotateCcw /> Replay
      </Button>
    </div>
  )
}
