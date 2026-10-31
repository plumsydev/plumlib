import type { ComponentDoc } from "../types"
import Default from "../demos/input-otp/default"
import Verify from "../demos/input-otp/verify"
import Playground from "../playgrounds/input-otp"
import Resend from "../demos/input-otp/resend"

export const doc: ComponentDoc = {
  slug: "input-otp",
  name: "Input OTP",
  description: "One-time code input with paste support, a blinking caret and digits that hop into place.",
  category: "Inputs",
  primitive: { name: "input-otp", href: "https://input-otp.rodz.dev" },
  dependencies: ["input-otp", "motion"],
  demos: [
    { name: "default", component: Default },
    {
      name: "verify",
      title: "Verification flow",
      description: "Restrict to digits with `REGEXP_ONLY_DIGITS` and react to `onComplete`.",
      component: Verify,
    },
    { name: "resend", title: "Resend timer", description: "A complete email verification step.", component: Resend },
  ],
  playground: Playground,
  usage: {
    imports: `import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"`,
    code: `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    {/* … */}
  </InputOTPGroup>
</InputOTP>`,
  },
  api: [
    {
      component: "InputOTP",
      description: "Wraps `OTPInput` from input-otp.",
      props: [
        { name: "maxLength", type: "number", required: true, description: "Number of characters." },
        { name: "value / onChange", type: "string / (value: string) => void", description: "Controlled value." },
        { name: "onComplete", type: "(value: string) => void", description: "Called when every slot is filled." },
        { name: "pattern", type: "string", description: "Regex source used to filter input, e.g. REGEXP_ONLY_DIGITS." },
        { name: "containerClassName", type: "string", description: "Class for the outer container." },
      ],
    },
    { component: "InputOTPSlot", props: [{ name: "index", type: "number", required: true, description: "The slot position." }] },
  ],
}
