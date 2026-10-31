"use client"

import { Search } from "lucide-react"
import { Input, InputAddon, InputGroup } from "@/components/ui/input"
import { Playground, jsxProps } from "@/components/site/playground"

export default function InputPlayground() {
  return (
    <Playground
      controls={{
        size: { type: "select", options: ["sm", "default", "lg"], default: "default" },
        type: { type: "select", options: ["text", "email", "password", "number"], default: "text" },
        placeholder: { type: "text", default: "you@company.com" },
        icon: { type: "boolean", default: false },
        invalid: { type: "boolean", default: false },
        disabled: { type: "boolean", default: false },
      }}
      render={({ icon, invalid, ...p }) => (
        <div className="w-full max-w-xs">
          {icon ? (
            <InputGroup>
              <InputAddon>
                <Search />
              </InputAddon>
              <Input {...p} aria-invalid={invalid || undefined} />
            </InputGroup>
          ) : (
            <Input {...p} aria-invalid={invalid || undefined} />
          )}
        </div>
      )}
      code={({ icon, invalid, ...p }) => {
        const input = `<Input${jsxProps({ ...p, "aria-invalid": invalid }, { size: "default", type: "text" })} />`
        return icon
          ? `<InputGroup>
  <InputAddon>
    <Search />
  </InputAddon>
  ${input}
</InputGroup>`
          : input
      }}
    />
  )
}
