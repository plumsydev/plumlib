"use client"

import { PasswordInput } from "@/components/ui/password-input"
import { Playground, jsxProps } from "@/components/site/playground"

export default function PasswordInputPlayground() {
  return (
    <Playground
      controls={{
        size: { type: "select", options: ["sm", "default", "lg"], default: "default" },
        placeholder: { type: "text", default: "Password" },
        showStrength: { type: "boolean", default: true },
        requirements: { type: "boolean", default: false },
        disabled: { type: "boolean", default: false },
      }}
      render={(p) => <PasswordInput {...p} defaultValue="Plum2026" containerClassName="w-full max-w-xs" />}
      code={(p) => `<PasswordInput${jsxProps(p, { size: "default" })} />`}
    />
  )
}
