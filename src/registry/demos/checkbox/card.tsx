"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function CheckboxCard() {
  return (
    <Label className="flex w-full max-w-sm cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors duration-200 hover:bg-accent/40 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent/40">
      <Checkbox defaultChecked className="mt-0.5" />
      <div className="grid gap-1.5 font-normal">
        <p className="text-sm font-medium leading-none">Two-factor authentication</p>
        <p className="text-sm text-muted-foreground">Ask for a code from your authenticator app on every sign in.</p>
      </div>
    </Label>
  )
}
