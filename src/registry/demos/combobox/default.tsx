"use client"

import * as React from "react"
import { Combobox } from "@/components/ui/combobox"
import { Label } from "@/components/ui/label"

const frameworks = [
  { value: "next", label: "Next.js", description: "React, full stack" },
  { value: "remix", label: "React Router", description: "Formerly Remix" },
  { value: "astro", label: "Astro", description: "Content-first" },
  { value: "nuxt", label: "Nuxt", description: "Vue, full stack" },
  { value: "sveltekit", label: "SvelteKit", description: "Svelte, full stack" },
  { value: "solid", label: "SolidStart", description: "Fine-grained reactivity" },
  { value: "vite", label: "Vite", description: "Bring your own router" },
]

export default function ComboboxDemo() {
  const [value, setValue] = React.useState("next")
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Framework</Label>
      <Combobox options={frameworks} value={value} onValueChange={setValue} placeholder="Select a framework" searchPlaceholder="Search frameworks…" />
    </div>
  )
}
