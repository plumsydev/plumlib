"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Stepper, StepperIndicator, StepperItem, StepperSeparator, StepperTrigger } from "@/components/ui/stepper"

export default function StepperCompact() {
  const [step, setStep] = React.useState(2)
  const total = 6
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-5">
      <Stepper value={step} onValueChange={setStep} className="w-full [--stepper-indicator:1.5rem]">
        {Array.from({ length: total }, (_, i) => (
          <StepperItem key={i} step={i + 1} last={i === total - 1}>
            <StepperTrigger aria-label={`Step ${i + 1}`}>
              <StepperIndicator className="text-[11px]" />
            </StepperTrigger>
            <StepperSeparator />
          </StepperItem>
        ))}
      </Stepper>
      <p className="text-sm text-muted-foreground">
        Question {Math.min(step, total)} of {total}
      </p>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setStep((s) => Math.max(1, s - 1))}>
          Previous
        </Button>
        <Button size="sm" onClick={() => setStep((s) => Math.min(total + 1, s + 1))}>
          {step >= total ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  )
}
