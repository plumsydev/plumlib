"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper"

const steps = [
  { title: "Account", hint: "Pick a workspace name, you can change it later." },
  { title: "Repository", hint: "We will import the default branch and detect the framework." },
  { title: "Domain", hint: "Point a custom domain or keep the free subdomain." },
  { title: "Deploy", hint: "Everything is ready. Your first build takes about a minute." },
]

export default function StepperDemo() {
  const [step, setStep] = React.useState(1)
  const [dir, setDir] = React.useState(1)

  const go = (to: number) => {
    setDir(to > step ? 1 : -1)
    setStep(to)
  }

  return (
    <div className="w-full max-w-lg space-y-6">
      <Stepper value={step} onValueChange={go}>
        {steps.map((s, i) => (
          <StepperItem key={s.title} step={i + 1} last={i === steps.length - 1}>
            <StepperTrigger>
              <StepperIndicator />
              <StepperTitle>{s.title}</StepperTitle>
            </StepperTrigger>
            <StepperSeparator />
          </StepperItem>
        ))}
      </Stepper>

      <div className="relative overflow-hidden rounded-xl border bg-card p-5">
        {/* le contenu glisse dans le sens où on avance, petit détail qui oriente */}
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: dir * 24, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: dir * -24, filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-3"
          >
            <div>
              <h3 className="font-medium">
                Step {step} · {steps[step - 1].title}
              </h3>
              <p className="text-sm text-muted-foreground">{steps[step - 1].hint}</p>
            </div>
            {step < 4 && (
              <div className="space-y-1.5">
                <Label>{["Workspace name", "Git URL", "Domain"][step - 1]}</Label>
                <Input placeholder={["acme", "github.com/acme/web", "acme.com"][step - 1]} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={() => go(step - 1)} disabled={step === 1}>
          Back
        </Button>
        <Button onClick={() => go(Math.min(5, step + 1))} disabled={step === 5}>
          {step >= 4 ? (step === 5 ? "Deployed" : "Deploy") : "Continue"}
        </Button>
      </div>
    </div>
  )
}
