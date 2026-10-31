"use client"

import * as React from "react"
import { PasswordInput, getStrength } from "@/components/ui/password-input"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field, FieldControl, FieldDescription, FieldLabel } from "@/components/ui/field"
import { toast } from "@/components/ui/toast"

export default function PasswordInputSignup() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const strong = getStrength(password) >= 3
  const valid = /\S+@\S+\.\S+/.test(email) && strong

  return (
    <form
      className="grid w-full max-w-sm gap-4 rounded-xl border bg-card p-5"
      onSubmit={(e) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          toast.success("Account created", { description: `Welcome aboard, ${email.split("@")[0]}.` })
        }, 1400)
      }}
    >
      <div>
        <h3 className="font-semibold">Create your account</h3>
        <p className="text-sm text-muted-foreground">The button wakes up once the password is good enough.</p>
      </div>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <FieldControl>
          <Input type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FieldControl>
      </Field>
      <Field>
        <FieldLabel>Password</FieldLabel>
        <PasswordInput autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} showStrength />
        <FieldDescription>Use 8+ characters with a mix of letters, numbers and symbols.</FieldDescription>
      </Field>
      <Button type="submit" disabled={!valid} loading={loading}>
        Create account
      </Button>
    </form>
  )
}
