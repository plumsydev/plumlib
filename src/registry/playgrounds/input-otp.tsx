"use client"

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Playground } from "@/components/site/playground"

export default function InputOTPPlayground() {
  return (
    <Playground
      controls={{
        length: { type: "number", default: 6, min: 4, max: 8 },
        separator: { type: "boolean", default: true },
        disabled: { type: "boolean", default: false },
      }}
      render={({ length, separator, disabled }) => {
        const half = Math.ceil(length / 2)
        const slots = (from: number, to: number) => Array.from({ length: to - from }, (_, i) => <InputOTPSlot key={from + i} index={from + i} />)
        return (
          <InputOTP key={length} maxLength={length} disabled={disabled}>
            {separator ? (
              <>
                <InputOTPGroup>{slots(0, half)}</InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>{slots(half, length)}</InputOTPGroup>
              </>
            ) : (
              <InputOTPGroup>{slots(0, length)}</InputOTPGroup>
            )}
          </InputOTP>
        )
      }}
      code={({ length, separator, disabled }) => {
        const half = Math.ceil(length / 2)
        const slots = (from: number, to: number) =>
          Array.from({ length: to - from }, (_, i) => `    <InputOTPSlot index={${from + i}} />`).join("\n")
        return `<InputOTP maxLength={${length}}${disabled ? " disabled" : ""}>
${
  separator
    ? `  <InputOTPGroup>
${slots(0, half)}
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
${slots(half, length)}
  </InputOTPGroup>`
    : `  <InputOTPGroup>
${slots(0, length)}
  </InputOTPGroup>`
}
</InputOTP>`
      }}
    />
  )
}
