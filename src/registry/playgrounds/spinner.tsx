"use client"

import { Spinner } from "@/components/ui/spinner"
import { Playground, jsxProps } from "@/components/site/playground"

const colors = { current: "", brand: "text-brand", muted: "text-muted-foreground", success: "text-success" }

export default function SpinnerPlayground() {
  return (
    <Playground
      controls={{
        variant: { type: "select", options: ["ring", "dots", "bars"], default: "ring" },
        size: { type: "select", options: ["sm", "default", "lg"], default: "lg" },
        color: { type: "select", options: ["current", "brand", "muted", "success"], default: "current" },
        label: { type: "text", default: "" },
      }}
      render={({ variant, size, color, label }) => (
        <div className={`flex items-center gap-2 text-sm ${colors[color]}`}>
          <Spinner variant={variant} size={size} />
          {label}
        </div>
      )}
      code={({ variant, size, color }) =>
        `<Spinner${jsxProps({ variant, size }, { variant: "ring", size: "default" })}${colors[color] ? ` className="${colors[color]}"` : ""} />`
      }
    />
  )
}
