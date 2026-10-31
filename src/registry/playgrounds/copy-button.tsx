"use client"

import { CopyButton } from "@/components/ui/copy-button"
import { Playground, jsxProps } from "@/components/site/playground"

export default function CopyButtonPlayground() {
  return (
    <Playground
      controls={{
        value: { type: "text", default: "npx plumui add copy-button" },
        label: { type: "text", default: "Copy" },
        variant: { type: "select", options: ["ghost", "outline", "secondary", "default"], default: "outline" },
        timeout: { type: "number", default: 1600, min: 500, max: 4000, step: 100 },
      }}
      render={(p) => <CopyButton {...p} label={p.label || undefined} />}
      code={(p) => `<CopyButton${jsxProps(p, { variant: "ghost", timeout: 1600 })} />`}
    />
  )
}
