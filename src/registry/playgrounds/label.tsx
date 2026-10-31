"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Playground } from "@/components/site/playground"

export default function LabelPlayground() {
  return (
    <Playground
      controls={{
        text: { type: "text", default: "Email address", label: "children" },
        control: { type: "select", options: ["input", "checkbox"], default: "input" },
        required: { type: "boolean", default: false },
        disabled: { type: "boolean", default: false },
      }}
      render={({ text, control, required, disabled }) =>
        control === "input" ? (
          <div className="grid w-full max-w-xs gap-2">
            <Label htmlFor="pg-label">
              {text}
              {required && <span className="text-destructive">*</span>}
            </Label>
            <Input id="pg-label" disabled={disabled} required={required} placeholder="you@company.com" />
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <Checkbox id="pg-label-cb" disabled={disabled} />
            <Label htmlFor="pg-label-cb">{text}</Label>
          </div>
        )
      }
      code={({ text, control, required, disabled }) =>
        control === "input"
          ? `<Label htmlFor="email">${text}${required ? `<span className="text-destructive">*</span>` : ""}</Label>
<Input id="email"${disabled ? " disabled" : ""}${required ? " required" : ""} />`
          : `<Checkbox id="terms"${disabled ? " disabled" : ""} />
<Label htmlFor="terms">${text}</Label>`
      }
    />
  )
}
