"use client"

import { Spotlight, SpotlightGroup } from "@/components/ui/spotlight"
import { Playground, jsxProps } from "@/components/site/playground"

export default function SpotlightPlayground() {
  return (
    <Playground
      controls={{
        size: { type: "number", default: 360, min: 120, max: 700, step: 20 },
        border: { type: "boolean", default: true },
        fill: { type: "boolean", default: true },
        group: { type: "boolean", default: true },
      }}
      render={({ group, ...p }) => {
        const cards = ["Analytics", "Deploys", "Logs"].map((t) => (
          <Spotlight key={t} {...p} className="rounded-xl border bg-card p-5">
            <div className="text-sm font-medium">{t}</div>
            <div className="mt-1 text-xs text-muted-foreground">Move your cursor around</div>
          </Spotlight>
        ))
        return group ? (
          <SpotlightGroup className="grid w-full grid-cols-3 gap-3">{cards}</SpotlightGroup>
        ) : (
          <div className="grid w-full grid-cols-3 gap-3">{cards}</div>
        )
      }}
      code={({ group, ...p }) => {
        const card = `<Spotlight${jsxProps(p, { size: 360, border: true, fill: true })}${p.border ? "" : " border={false}"}${p.fill ? "" : " fill={false}"} className="rounded-xl border p-5">…</Spotlight>`
        return `import { Spotlight${group ? ", SpotlightGroup" : ""} } from "@/components/ui/spotlight"

${group ? `<SpotlightGroup className="grid grid-cols-3 gap-3">\n  ${card}\n  ${card}\n</SpotlightGroup>` : card}`
      }}
    />
  )
}
