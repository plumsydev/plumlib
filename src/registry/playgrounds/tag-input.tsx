"use client"

import { TagInput } from "@/components/ui/tag-input"
import { Playground, jsxProps } from "@/components/site/playground"

export default function TagInputPlayground() {
  return (
    <Playground
      controls={{
        placeholder: { type: "text", default: "Add a tag…" },
        max: { type: "number", default: 6, min: 1, max: 10 },
        disabled: { type: "boolean", default: false },
      }}
      render={({ max, ...p }) => (
        <div className="w-full max-w-sm">
          <TagInput key={max} defaultValue={["react", "motion"]} max={max} {...p} />
        </div>
      )}
      code={({ max, ...p }) => `<TagInput
  defaultValue={["react", "motion"]}
  max={${max}}${jsxProps(p).replace(/ (\w)/g, "\n  $1")}
/>`}
    />
  )
}
