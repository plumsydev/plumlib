"use client"

import * as React from "react"
import { ColorPicker, ColorPickerPanel } from "@/components/ui/color-picker"
import { Playground } from "@/components/site/playground"

export default function ColorPickerPlayground() {
  const [color, setColor] = React.useState("#8b5cf6")
  return (
    <Playground
      controls={{
        mode: { type: "select", options: ["popover", "inline"], default: "popover" },
        swatches: { type: "boolean", default: true },
        disabled: { type: "boolean", default: false },
      }}
      render={({ mode, swatches, disabled }) =>
        mode === "inline" ? (
          <div className="w-64 rounded-xl border bg-popover p-3 shadow-lg">
            <ColorPickerPanel value={color} onValueChange={setColor} swatches={swatches ? undefined : []} />
          </div>
        ) : (
          <ColorPicker value={color} onValueChange={setColor} swatches={swatches ? undefined : []} disabled={disabled} />
        )
      }
      code={({ mode, swatches, disabled }) =>
        mode === "inline"
          ? `const [color, setColor] = React.useState("${color}")

<ColorPickerPanel value={color} onValueChange={setColor}${swatches ? "" : " swatches={[]}"} />`
          : `<ColorPicker defaultValue="${color}"${swatches ? "" : " swatches={[]}"}${disabled ? " disabled" : ""} />`
      }
    />
  )
}
