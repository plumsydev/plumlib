"use client"

import { Combobox } from "@/components/ui/combobox"
import { Playground, jsxProps } from "@/components/site/playground"

const options = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "React Router" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt" },
  { value: "sveltekit", label: "SvelteKit" },
]

export default function ComboboxPlayground() {
  return (
    <Playground
      controls={{
        multiple: { type: "boolean", default: false },
        size: { type: "select", options: ["sm", "default", "lg"], default: "default" },
        placeholder: { type: "text", default: "Select a framework" },
        disabled: { type: "boolean", default: false },
      }}
      render={({ multiple, ...p }) => (
        <div className="w-full max-w-xs">
          {multiple ? (
            <Combobox key="m" multiple options={options} {...p} />
          ) : (
            <Combobox key="s" options={options} {...p} />
          )}
        </div>
      )}
      code={(p) => `const options = [
  { value: "next", label: "Next.js" },
  { value: "astro", label: "Astro" },
  // …
]

<Combobox options={options}${jsxProps(p, { size: "default" })} />`}
    />
  )
}
