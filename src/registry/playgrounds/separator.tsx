"use client"

import { Separator } from "@/components/ui/separator"
import { Playground } from "@/components/site/playground"

export default function SeparatorPlayground() {
  return (
    <Playground
      controls={{
        orientation: { type: "select", options: ["horizontal", "vertical"], default: "horizontal" },
        label: { type: "text", default: "or continue with" },
      }}
      render={({ orientation, label }) =>
        orientation === "horizontal" ? (
          <div className="w-full max-w-xs space-y-4 text-sm">
            <div className="h-9 rounded-md border bg-muted/40" />
            <Separator>{label || undefined}</Separator>
            <div className="h-9 rounded-md border bg-muted/40" />
          </div>
        ) : (
          <div className="flex h-6 items-center gap-4 text-sm">
            <span>Docs</span>
            <Separator orientation="vertical" />
            <span>Components</span>
            <Separator orientation="vertical" />
            <span>Blog</span>
          </div>
        )
      }
      code={({ orientation, label }) =>
        orientation === "vertical" ? `<Separator orientation="vertical" />` : label ? `<Separator>${label}</Separator>` : `<Separator />`
      }
    />
  )
}
