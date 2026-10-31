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
import { Playground } from "@/components/site/playground"

const labels = ["Cart", "Shipping", "Payment", "Review", "Done"]

function Demo({ orientation, steps, value, titles, descriptions }: { orientation: "horizontal" | "vertical"; steps: number; value: number; titles: boolean; descriptions: boolean }) {
  const [step, setStep] = React.useState(value)
  React.useEffect(() => setStep(value), [value])
  return (
    <Stepper orientation={orientation} value={step} onValueChange={setStep} className={orientation === "horizontal" ? "w-full max-w-lg" : "w-full max-w-60"}>
      {labels.slice(0, steps).map((l, i) => (
        <StepperItem key={l} step={i + 1} last={i === steps - 1}>
          <StepperTrigger>
            <StepperIndicator />
            {(titles || descriptions) && (
              <span>
                {titles && <StepperTitle>{l}</StepperTitle>}
                {descriptions && <StepperDescription>Step {i + 1}</StepperDescription>}
              </span>
            )}
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
      ))}
    </Stepper>
  )
}

export default function StepperPlayground() {
  return (
    <Playground
      controls={{
        orientation: { type: "select", options: ["horizontal", "vertical"], default: "horizontal" },
        steps: { type: "number", default: 4, min: 2, max: 5 },
        value: { type: "number", default: 2, min: 1, max: 6, label: "active step" },
        titles: { type: "boolean", default: true },
        descriptions: { type: "boolean", default: false },
      }}
      render={(v) => <Demo {...v} />}
      code={({ orientation, value, titles, descriptions }) => `<Stepper value={${value}}${orientation === "vertical" ? ' orientation="vertical"' : ""} onValueChange={setStep}>
  <StepperItem step={1}>
    <StepperTrigger>
      <StepperIndicator />${titles ? "\n      <StepperTitle>Cart</StepperTitle>" : ""}${descriptions ? "\n      <StepperDescription>Step 1</StepperDescription>" : ""}
    </StepperTrigger>
    <StepperSeparator />
  </StepperItem>
  …
  <StepperItem step={4} last>…</StepperItem>
</Stepper>`}
    />
  )
}
