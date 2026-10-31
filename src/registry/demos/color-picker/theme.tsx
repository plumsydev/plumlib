"use client"

import * as React from "react"
import { ColorPicker } from "@/components/ui/color-picker"

const tokens = [
  { key: "primary", label: "Primary", value: "#4f46e5" },
  { key: "accent", label: "Accent", value: "#f59e0b" },
  { key: "surface", label: "Surface", value: "#f8fafc" },
] as const

export default function ColorPickerTheme() {
  const [colors, setColors] = React.useState<Record<string, string>>(
    Object.fromEntries(tokens.map((t) => [t.key, t.value]))
  )

  return (
    <div className="grid w-full max-w-xl gap-5 sm:grid-cols-[auto_1fr]">
      <div className="space-y-2">
        {tokens.map((t) => (
          <div key={t.key} className="flex items-center justify-between gap-4">
            <span className="text-sm">{t.label}</span>
            <ColorPicker
              value={colors[t.key]}
              onValueChange={(v) => setColors((c) => ({ ...c, [t.key]: v }))}
              swatches={[]}
              className="h-8 text-xs"
            />
          </div>
        ))}
      </div>
      <div className="rounded-xl border p-4 transition-colors duration-300" style={{ background: colors.surface }}>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-900">Inbox</span>
          <span className="rounded-full px-2 py-0.5 text-[11px] font-medium text-white transition-colors duration-300" style={{ background: colors.accent }}>
            3 new
          </span>
        </div>
        <div className="space-y-2">
          {["Design review at 3pm", "Invoice #2041 paid"].map((m) => (
            <div key={m} className="rounded-md bg-white px-3 py-2 text-xs text-slate-700 shadow-xs">
              {m}
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-3 h-8 w-full rounded-md text-sm font-medium text-white transition-colors duration-300"
          style={{ background: colors.primary }}
        >
          Compose
        </button>
      </div>
    </div>
  )
}
