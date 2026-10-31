"use client"

import * as React from "react"
import { Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TextShimmer } from "@/components/ui/text-shimmer"

const steps = ["Reading your codebase", "Planning changes", "Editing 4 files", "Running tests"]

export default function TextShimmerDemo() {
  const [step, setStep] = React.useState(0)
  const running = step < steps.length

  React.useEffect(() => {
    if (!running) return
    const t = setTimeout(() => setStep((s) => s + 1), 1600)
    return () => clearTimeout(t)
  }, [step, running])

  return (
    <div className="w-full max-w-xs space-y-4">
      <ul className="space-y-2.5 text-sm">
        {steps.map((label, i) => (
          <li key={label} className="flex items-center gap-2.5">
            <span className="flex size-4 items-center justify-center">
              {i < step ? (
                <Check className="size-3.5 text-success" />
              ) : i === step ? (
                <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
              ) : (
                <span className="size-1.5 rounded-full bg-border" />
              )}
            </span>
            {i === step ? (
              <TextShimmer duration={1.4}>{label}</TextShimmer>
            ) : (
              <span className={i < step ? "text-foreground" : "text-muted-foreground/60"}>{label}</span>
            )}
          </li>
        ))}
      </ul>
      <Button size="sm" variant="outline" disabled={running} onClick={() => setStep(0)}>
        {running ? "Working…" : "Run again"}
      </Button>
    </div>
  )
}
