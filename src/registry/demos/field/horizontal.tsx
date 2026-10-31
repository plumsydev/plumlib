"use client"

import { Field, FieldContent, FieldControl, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export default function FieldHorizontal() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel>Email notifications</FieldLabel>
          <FieldDescription>Get a digest of activity every morning.</FieldDescription>
        </FieldContent>
        <FieldControl>
          <Switch defaultChecked />
        </FieldControl>
      </Field>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel>Marketing</FieldLabel>
          <FieldDescription>Product updates and launches.</FieldDescription>
        </FieldContent>
        <FieldControl>
          <Switch />
        </FieldControl>
      </Field>
    </FieldGroup>
  )
}
