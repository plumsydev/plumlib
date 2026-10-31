"use client"

import { PasswordInput } from "@/components/ui/password-input"
import { Label } from "@/components/ui/label"

export default function PasswordInputDemo() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="pw">Password</Label>
      <PasswordInput id="pw" placeholder="Enter your password" defaultValue="hunter2-but-better" />
    </div>
  )
}
