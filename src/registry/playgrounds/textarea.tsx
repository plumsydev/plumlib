"use client"

import { Textarea } from "@/components/ui/textarea"
import { Playground, jsxProps } from "@/components/site/playground"

export default function TextareaPlayground() {
  return (
    <Playground
      controls={{
        placeholder: { type: "text", default: "Leave a comment…" },
        rows: { type: "number", default: 3, min: 2, max: 8 },
        autoResize: { type: "boolean", default: true },
        invalid: { type: "boolean", default: false },
        disabled: { type: "boolean", default: false },
      }}
      render={({ invalid, ...p }) => (
        <div className="w-full max-w-sm">
          <Textarea {...p} aria-invalid={invalid || undefined} />
        </div>
      )}
      code={({ invalid, ...p }) => `<Textarea${jsxProps({ ...p, "aria-invalid": invalid }, { rows: 0 })} />`}
    />
  )
}
