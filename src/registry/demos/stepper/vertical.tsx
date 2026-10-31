"use client"

import * as React from "react"
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper"

const stages = [
  { title: "Install", description: "pnpm install · 12s" },
  { title: "Lint & typecheck", description: "0 errors, 2 warnings" },
  { title: "Test", description: "418 tests across 63 files" },
  { title: "Build", description: "Compiling 1,204 modules" },
  { title: "Deploy", description: "Uploading to 18 regions" },
]

export default function StepperVertical() {
  const [step, setStep] = React.useState(1)

  // la pipeline avance toute seule puis recommence, comme une vraie CI qui tourne
  React.useEffect(() => {
    const id = setInterval(() => setStep((s) => (s > stages.length ? 1 : s + 1)), 1400)
    return () => clearInterval(id)
  }, [])

  return (
    <Stepper orientation="vertical" value={step} onValueChange={setStep} className="w-full max-w-xs [--stepper-indicator:1.75rem]">
      {stages.map((s, i) => (
        <StepperItem key={s.title} step={i + 1} last={i === stages.length - 1}>
          <StepperTrigger>
            <StepperIndicator className="text-xs" />
            <span>
              <StepperTitle>{s.title}</StepperTitle>
              <StepperDescription>{s.description}</StepperDescription>
            </span>
          </StepperTrigger>
          <StepperSeparator className="min-h-5" />
        </StepperItem>
      ))}
    </Stepper>
  )
}
