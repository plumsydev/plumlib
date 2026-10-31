"use client"

import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Playground } from "@/components/site/playground"

export default function FieldPlayground() {
  return (
    <Playground
      controls={{
        label: { type: "text", default: "Username" },
        description: { type: "text", default: "This is your public display name." },
        error: { type: "text", default: "This username is already taken." },
        invalid: { type: "boolean", default: false },
        disabled: { type: "boolean", default: false },
        orientation: { type: "select", options: ["vertical", "horizontal"], default: "vertical" },
      }}
      render={({ label, description, error, invalid, disabled, orientation }) => (
        <Field invalid={invalid} disabled={disabled} orientation={orientation} className="w-full max-w-sm">
          <FieldLabel>{label}</FieldLabel>
          <FieldControl>
            <Input placeholder="plumsy" />
          </FieldControl>
          {description && <FieldDescription>{description}</FieldDescription>}
          <FieldError>{error}</FieldError>
        </Field>
      )}
      code={({ label, description, error, invalid, disabled, orientation }) => `<Field${invalid ? " invalid" : ""}${disabled ? " disabled" : ""}${
        orientation !== "vertical" ? ` orientation="${orientation}"` : ""
      }>
  <FieldLabel>${label}</FieldLabel>
  <FieldControl>
    <Input />
  </FieldControl>${description ? `\n  <FieldDescription>${description}</FieldDescription>` : ""}
  <FieldError>${error}</FieldError>
</Field>`}
    />
  )
}
