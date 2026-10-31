"use client"

import { Slider } from "@/components/ui/slider"
import { Playground, jsxProps } from "@/components/site/playground"

export default function SliderPlayground() {
  return (
    <Playground
      controls={{
        thumbs: { type: "select", options: ["single", "range"], default: "single" },
        step: { type: "number", default: 1, min: 1, max: 25 },
        orientation: { type: "select", options: ["horizontal", "vertical"], default: "horizontal" },
        showTooltip: { type: "boolean", default: true },
        disabled: { type: "boolean", default: false },
      }}
      render={({ thumbs, ...p }) => (
        <div className={p.orientation === "vertical" ? "h-48" : "w-full max-w-xs"}>
          <Slider key={`${thumbs}-${p.orientation}`} defaultValue={thumbs === "range" ? [25, 75] : [50]} {...p} />
        </div>
      )}
      code={({ thumbs, ...p }) => `<Slider defaultValue={${thumbs === "range" ? "[25, 75]" : "[50]"}}${jsxProps(p, { step: 1, orientation: "horizontal" })} />`}
    />
  )
}
