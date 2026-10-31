"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Playground, jsxProps } from "@/components/site/playground"

export default function ButtonPlayground() {
  return (
    <Playground
      controls={{
        variant: { type: "select", options: ["default", "brand", "secondary", "outline", "ghost", "destructive", "link"], default: "default" },
        size: { type: "select", options: ["xs", "sm", "default", "lg", "xl"], default: "default" },
        children: { type: "text", default: "Continue", label: "label" },
        icon: { type: "boolean", default: true },
        loading: { type: "boolean", default: false },
        disabled: { type: "boolean", default: false },
      }}
      render={({ children, icon, ...p }) => (
        <Button {...p}>
          {children}
          {icon && <ArrowRight />}
        </Button>
      )}
      code={({ children, icon, ...p }) =>
        `${icon ? `import { ArrowRight } from "lucide-react"\n` : ""}import { Button } from "@/components/ui/button"

<Button${jsxProps(p, { variant: "default", size: "default" })}>
  ${children}${icon ? "\n  <ArrowRight />" : ""}
</Button>`
      }
    />
  )
}
