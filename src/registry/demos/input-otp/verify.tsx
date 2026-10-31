"use client"

import * as React from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { cn } from "@/lib/utils"

export default function InputOTPVerify() {
  const [value, setValue] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "checking" | "ok" | "error">("idle")

  // faux serveur, le bon code c'est 424242 chut
  const verify = (code: string) => {
    setStatus("checking")
    setTimeout(() => setStatus(code === "424242" ? "ok" : "error"), 700)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <InputOTP
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS}
        value={value}
        onChange={(v) => {
          setValue(v)
          setStatus("idle")
        }}
        onComplete={verify}
      >
        <InputOTPGroup>
          {Array.from({ length: 6 }, (_, i) => (
            <InputOTPSlot key={i} index={i} aria-invalid={status === "error" || undefined} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <p
        className={cn(
          "text-sm text-muted-foreground transition-colors",
          status === "ok" && "text-success",
          status === "error" && "text-destructive"
        )}
      >
        {status === "checking" ? "Verifying…" : status === "ok" ? "Verified. Welcome back." : status === "error" ? "That code didn’t match. Try 424242." : "Enter the code we sent to your phone."}
      </p>
    </div>
  )
}
