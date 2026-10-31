"use client"

import { BorderBeam } from "@/components/ui/border-beam"
import { Playground, jsxProps } from "@/components/site/playground"

const colors = { foreground: "var(--foreground)", brand: "var(--brand)", success: "var(--success)", warning: "var(--warning)", info: "var(--info)" }

export default function BorderBeamPlayground() {
  return (
    <Playground
      controls={{
        color: { type: "select", options: ["foreground", "brand", "success", "warning", "info"], default: "foreground" },
        size: { type: "number", default: 80, min: 20, max: 240, step: 10 },
        duration: { type: "number", default: 6, min: 1, max: 15, step: 0.5 },
        borderWidth: { type: "number", default: 1, min: 1, max: 4 },
        reverse: { type: "boolean", default: false },
      }}
      render={({ color, ...p }) => (
        <div className="relative flex h-40 w-72 items-center justify-center rounded-2xl border bg-card text-sm text-muted-foreground">
          Your content
          <BorderBeam key={JSON.stringify(p)} colorFrom={colors[color]} {...p} />
        </div>
      )}
      code={({ color, ...p }) => `import { BorderBeam } from "@/components/ui/border-beam"

<div className="relative rounded-2xl border">
  Your content
  <BorderBeam${jsxProps({ colorFrom: color === "foreground" ? undefined : colors[color], ...p }, { size: 80, duration: 6, borderWidth: 1 })} />
</div>`}
    />
  )
}
