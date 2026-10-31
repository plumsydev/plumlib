"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowLeft, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldControl, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/toast"
import { spring } from "@/lib/motion"

type Step = "email" | "code" | "done"

export default function AuthBlock() {
  const [step, setStep] = React.useState<Step>("email")
  const [email, setEmail] = React.useState("")
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [code, setCode] = React.useState("")
  const [direction, setDirection] = React.useState(1)

  const go = (next: Step, dir = 1) => {
    setDirection(dir)
    setStep(next)
  }

  const sendCode = (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address.")
    setError("")
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      go("code")
      toast("Code sent", { description: `Check ${email} — psst, it's 424242.` })
    }, 900)
  }

  const verify = (value: string) => {
    if (value !== "424242") {
      toast.error("That code doesn't match", { description: "Try 424242." })
      setCode("")
      return
    }
    go("done")
  }

  // la carte change de hauteur en douceur entre les étapes
  return (
    <motion.div layout transition={spring.smooth} className="w-full max-w-sm overflow-hidden rounded-2xl border bg-card p-7 shadow-lg">
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          initial={{ opacity: 0, x: direction * 40, filter: "blur(4px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: direction * -40, filter: "blur(4px)" }}
          transition={spring.smooth}
        >
          {step === "email" && (
            <form onSubmit={sendCode} className="space-y-5" noValidate>
              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold tracking-tight">Sign in to Acme</h3>
                <p className="text-sm text-muted-foreground">We&apos;ll email you a one-time code.</p>
              </div>
              <Field invalid={!!error}>
                <FieldLabel>Email</FieldLabel>
                <FieldControl>
                  <Input type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
                </FieldControl>
                <FieldError>{error}</FieldError>
              </Field>
              <Button type="submit" className="w-full" loading={loading}>
                {!loading && <Mail />} Continue with email
              </Button>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <Separator className="flex-1" /> or <Separator className="flex-1" />
              </div>
              <Button type="button" variant="outline" className="w-full" onClick={() => toast.info("SSO isn't set up for this demo")}>
                Continue with SSO
              </Button>
            </form>
          )}

          {step === "code" && (
            <div className="space-y-5">
              <button
                onClick={() => go("email", -1)}
                className="-ml-1 inline-flex cursor-pointer items-center gap-1 rounded-md px-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-3.5" /> Back
              </button>
              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold tracking-tight">Check your inbox</h3>
                <p className="text-sm text-muted-foreground">
                  Enter the 6-digit code sent to <span className="font-medium text-foreground">{email}</span>.
                </p>
              </div>
              <InputOTP maxLength={6} value={code} onChange={setCode} onComplete={verify} containerClassName="w-full" autoFocus>
                <InputOTPGroup className="w-full">
                  {Array.from({ length: 6 }, (_, i) => (
                    <InputOTPSlot key={i} index={i} className="h-11 w-auto min-w-0 flex-1" />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <p className="text-xs text-muted-foreground">
                Didn&apos;t get it?{" "}
                <button onClick={() => toast("New code sent")} className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline">
                  Resend
                </button>
              </p>
            </div>
          )}

          {step === "done" && (
            <div className="flex flex-col items-center py-4 text-center">
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={spring.bouncy}
                className="mb-4 flex size-12 items-center justify-center rounded-full bg-success/12 text-success"
              >
                <svg viewBox="0 0 24 24" fill="none" className="size-6">
                  <motion.path
                    d="M5 12.5l4.5 4.5L19 7.5"
                    stroke="currentColor"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
                  />
                </svg>
              </motion.div>
              <h3 className="text-lg font-semibold tracking-tight">You&apos;re in</h3>
              <p className="mt-1 text-sm text-muted-foreground">Welcome back to Acme.</p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setEmail("")
                  setCode("")
                  go("email", -1)
                }}
              >
                Start over
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
