"use client"

import { Tilt } from "@/components/ui/tilt"
import { Playground, jsxProps } from "@/components/site/playground"

export default function TiltPlayground() {
  return (
    <Playground
      controls={{
        max: { type: "number", default: 10, min: 0, max: 30 },
        scale: { type: "number", default: 1.02, min: 1, max: 1.15, step: 0.01 },
        perspective: { type: "number", default: 900, min: 300, max: 2000, step: 50 },
        glare: { type: "boolean", default: true },
      }}
      render={(p) => (
        <Tilt {...p} className="rounded-2xl">
          <div className="flex h-44 w-72 flex-col justify-end rounded-2xl border bg-gradient-to-br from-zinc-900 to-zinc-700 p-5 text-zinc-100 shadow-xl">
            <div className="text-xs text-zinc-400">Annual report</div>
            <div className="text-lg font-semibold tracking-tight">2026 in review</div>
          </div>
        </Tilt>
      )}
      code={(p) => `import { Tilt } from "@/components/ui/tilt"

<Tilt${jsxProps(p, { max: 10, scale: 1.02, perspective: 900, glare: true })}${p.glare ? "" : " glare={false}"} className="rounded-2xl">
  <Card>…</Card>
</Tilt>`}
    />
  )
}
