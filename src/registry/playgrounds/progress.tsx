"use client"

import { Progress, ProgressRing } from "@/components/ui/progress"
import { Playground, jsxProps } from "@/components/site/playground"

export default function ProgressPlayground() {
  return (
    <Playground
      controls={{
        value: { type: "number", default: 60, min: 0, max: 100 },
        indeterminate: { type: "boolean", default: false },
        variant: { type: "select", options: ["default", "brand", "success", "warning", "destructive"], default: "default" },
        size: { type: "select", options: ["sm", "default", "lg"], default: "default" },
        ring: { type: "boolean", default: false, label: "show ring" },
      }}
      render={({ value, indeterminate, variant, size, ring }) => (
        <div className="flex w-full max-w-sm flex-col items-center gap-6">
          <Progress value={indeterminate ? null : value} variant={variant} size={size} />
          {ring && <ProgressRing value={value} size={64} showValue />}
        </div>
      )}
      code={({ value, indeterminate, variant, size, ring }) =>
        `<Progress${indeterminate ? " value={null}" : ` value={${value}}`}${jsxProps({ variant, size }, { variant: "default", size: "default" })} />${
          ring ? `\n<ProgressRing value={${value}} size={64} showValue />` : ""
        }`
      }
    />
  )
}
