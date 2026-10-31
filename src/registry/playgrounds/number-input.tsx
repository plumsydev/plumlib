"use client"

import { NumberInput } from "@/components/ui/number-input"
import { Playground, jsxProps } from "@/components/site/playground"

const formats = {
  none: undefined,
  currency: { style: "currency", currency: "USD" },
  percent: { style: "percent" },
} as const

export default function NumberInputPlayground() {
  return (
    <Playground
      controls={{
        size: { type: "select", options: ["sm", "default", "lg"], default: "default" },
        format: { type: "select", options: ["none", "currency", "percent"], default: "none" },
        step: { type: "number", default: 1, min: 1, max: 10 },
        max: { type: "number", default: 20, min: 5, max: 100, step: 5 },
        hideControls: { type: "boolean", default: false },
        disabled: { type: "boolean", default: false },
      }}
      render={({ format, step, max, ...p }) => (
        <NumberInput
          key={`${format}-${step}`}
          {...p}
          step={format === "percent" ? step / 100 : step}
          max={format === "percent" ? max / 100 : max}
          min={0}
          defaultValue={format === "percent" ? 0.1 : 4}
          format={formats[format]}
          containerClassName="w-44"
        />
      )}
      code={({ format, step, max, ...p }) => `<NumberInput
  defaultValue={${format === "percent" ? 0.1 : 4}}
  min={0}
  max={${format === "percent" ? max / 100 : max}}${step !== 1 || format === "percent" ? `\n  step={${format === "percent" ? step / 100 : step}}` : ""}${
        format !== "none" ? `\n  format={${JSON.stringify(formats[format]).replace(/"(\w+)":/g, "$1: ")}}` : ""
      }${jsxProps(p, { size: "default" }).replace(/ (\w)/g, "\n  $1")}
/>`}
    />
  )
}
