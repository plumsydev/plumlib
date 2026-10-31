"use client"

import { PasswordInput } from "@/components/ui/password-input"
import { Label } from "@/components/ui/label"

export default function PasswordInputStrength() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="pw-new">New password</Label>
      <PasswordInput id="pw-new" autoComplete="new-password" placeholder="Make it a good one" showStrength requirements />
    </div>
  )
}
