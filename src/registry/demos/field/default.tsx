"use client"

import { Field, FieldControl, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function FieldDemo() {
  return (
    <Field className="max-w-xs">
      <FieldLabel>Username</FieldLabel>
      <FieldControl>
        <Input placeholder="plumsy" />
      </FieldControl>
      <FieldDescription>This is your public display name.</FieldDescription>
    </Field>
  )
}
