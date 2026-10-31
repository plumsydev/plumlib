"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function FieldValidation() {
  const [email, setEmail] = React.useState("")
  const [touched, setTouched] = React.useState(false)
  const error = !email ? "Email is required." : !/^\S+@\S+\.\S+$/.test(email) ? "Enter a valid email address." : null

  return (
    <form
      className="flex w-full max-w-xs flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        setTouched(true)
      }}
    >
      <Field invalid={touched && !!error}>
        <FieldLabel>Work email</FieldLabel>
        <FieldControl>
          <Input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
          />
        </FieldControl>
        <FieldDescription>We’ll send a magic link here.</FieldDescription>
        <FieldError>{error}</FieldError>
      </Field>
      <Button type="submit">Continue</Button>
    </form>
  )
}
