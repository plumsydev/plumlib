"use client"

import { Combobox } from "@/components/ui/combobox"
import { Label } from "@/components/ui/label"

const regions = [
  { value: "cdg1", label: "Paris", description: "cdg1 · France", group: "Europe" },
  { value: "fra1", label: "Frankfurt", description: "fra1 · Germany", group: "Europe" },
  { value: "lhr1", label: "London", description: "lhr1 · United Kingdom", group: "Europe" },
  { value: "iad1", label: "Washington", description: "iad1 · United States", group: "Americas" },
  { value: "sfo1", label: "San Francisco", description: "sfo1 · United States", group: "Americas" },
  { value: "gru1", label: "São Paulo", description: "gru1 · Brazil", group: "Americas" },
  { value: "hnd1", label: "Tokyo", description: "hnd1 · Japan", group: "Asia Pacific" },
  { value: "syd1", label: "Sydney", description: "syd1 · Australia", group: "Asia Pacific", disabled: true },
]

export default function ComboboxGrouped() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Function region</Label>
      <Combobox options={regions} defaultValue="cdg1" searchPlaceholder="Search regions or codes…" />
    </div>
  )
}
