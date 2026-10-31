"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Playground } from "@/components/site/playground"

export default function CheckboxPlayground() {
  return (
    <Playground
      controls={{
        state: { type: "select", options: ["unchecked", "checked", "indeterminate"], default: "checked" },
        label: { type: "text", default: "Accept terms and conditions" },
        invalid: { type: "boolean", default: false },
        disabled: { type: "boolean", default: false },
      }}
      render={({ state, label, invalid, disabled }) => <Controlled state={state} label={label} invalid={invalid} disabled={disabled} />}
      code={({ state, label, invalid, disabled }) => `<div className="flex items-center gap-2.5">
  <Checkbox id="terms"${state === "checked" ? " defaultChecked" : state === "indeterminate" ? ' checked="indeterminate"' : ""}${
        invalid ? " aria-invalid" : ""
      }${disabled ? " disabled" : ""} />
  <Label htmlFor="terms">${label}</Label>
</div>`}
    />
  )
}

// on resynchronise qd le contrôle change mais on laisse cliquer la case
function Controlled({ state, label, invalid, disabled }: { state: string; label: string; invalid: boolean; disabled: boolean }) {
  const toChecked = (s: string) => (s === "indeterminate" ? "indeterminate" : s === "checked")
  const [checked, setChecked] = React.useState<boolean | "indeterminate">(toChecked(state))
  React.useEffect(() => setChecked(toChecked(state)), [state])
  return (
    <div className="flex items-center gap-2.5">
      <Checkbox id="pg-cb" checked={checked} onCheckedChange={setChecked} aria-invalid={invalid || undefined} disabled={disabled} />
      <Label htmlFor="pg-cb">{label}</Label>
    </div>
  )
}
