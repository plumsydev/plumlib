"use client"

import { Bold, Star } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { Playground, jsxProps } from "@/components/site/playground"

export default function TogglePlayground() {
  return (
    <Playground
      controls={{
        variant: { type: "select", options: ["default", "outline"], default: "outline" },
        size: { type: "select", options: ["sm", "default", "lg"], default: "default" },
        content: { type: "select", options: ["icon", "icon + text"], default: "icon + text" },
        disabled: { type: "boolean", default: false },
      }}
      render={({ content, ...p }) =>
        content === "icon" ? (
          <Toggle {...p} aria-label="Bold">
            <Bold />
          </Toggle>
        ) : (
          <Toggle {...p}>
            <Star /> Star
          </Toggle>
        )
      }
      code={({ content, ...p }) =>
        content === "icon"
          ? `<Toggle${jsxProps(p, { variant: "default", size: "default" })} aria-label="Bold">
  <Bold />
</Toggle>`
          : `<Toggle${jsxProps(p, { variant: "default", size: "default" })}>
  <Star /> Star
</Toggle>`
      }
    />
  )
}
