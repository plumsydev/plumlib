"use client"

import * as React from "react"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

export default function InputOTPResend() {
  const [value, setValue] = React.useState("")
  const [seconds, setSeconds] = React.useState(30)

  React.useEffect(() => {
    if (seconds <= 0) return
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [seconds])

  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-4 rounded-xl border bg-card p-6 text-center">
      <div>
        <h3 className="font-semibold">Check your email</h3>
        <p className="text-sm text-muted-foreground">We sent a code to lea@acme.com</p>
      </div>
      <InputOTP
        maxLength={6}
        value={value}
        onChange={setValue}
        onComplete={(code) => {
          toast.success("Email confirmed", { description: `Code ${code} accepted.` })
          setTimeout(() => setValue(""), 800)
        }}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Button
        variant="link"
        size="sm"
        disabled={seconds > 0}
        onClick={() => {
          setSeconds(30)
          toast("New code sent", { description: "It may take a few seconds to arrive." })
        }}
        className="tabular-nums"
      >
        {seconds > 0 ? `Resend code in ${seconds}s` : "Resend code"}
      </Button>
    </div>
  )
}
