"use client"

import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Playground, jsxProps } from "@/components/site/playground"

export default function BadgePlayground() {
  return (
    <Playground
      controls={{
        variant: { type: "select", options: ["default", "secondary", "outline", "brand", "success", "warning", "destructive", "info"], default: "success" },
        children: { type: "text", default: "Operational", label: "label" },
        dot: { type: "boolean", default: true },
        icon: { type: "boolean", default: false },
      }}
      render={({ variant, children, dot, icon }) => (
        <Badge variant={variant} dot={dot} className="scale-125">
          {icon && <Check />}
          {children}
        </Badge>
      )}
      code={({ variant, children, dot, icon }) =>
        `<Badge${jsxProps({ variant, dot }, { variant: "default" })}>${icon ? "\n  <Check />\n  " : ""}${children}${icon ? "\n" : ""}</Badge>`
      }
    />
  )
}
