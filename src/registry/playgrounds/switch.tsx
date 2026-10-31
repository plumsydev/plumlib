"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Playground, jsxProps } from "@/components/site/playground"

export default function SwitchPlayground() {
  return (
    <Playground
      controls={{
        size: { type: "select", options: ["sm", "default", "lg"], default: "default" },
        label: { type: "text", default: "Airplane mode" },
        defaultChecked: { type: "boolean", default: true },
        disabled: { type: "boolean", default: false },
      }}
      render={({ label, defaultChecked, ...p }) => (
        <div className="flex items-center gap-2.5">
          <Switch key={String(defaultChecked)} id="pg-sw" defaultChecked={defaultChecked} {...p} />
          <Label htmlFor="pg-sw">{label}</Label>
        </div>
      )}
      code={({ label, ...p }) => `<div className="flex items-center gap-2.5">
  <Switch id="airplane"${jsxProps(p, { size: "default" })} />
  <Label htmlFor="airplane">${label}</Label>
</div>`}
    />
  )
}
