"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Playground, jsxProps } from "@/components/site/playground"

const tags = Array.from({ length: 40 }, (_, i) => `v1.${40 - i}.0`)

export default function ScrollAreaPlayground() {
  return (
    <Playground
      controls={{
        orientation: { type: "select", options: ["vertical", "horizontal"], default: "vertical" },
        fade: { type: "boolean", default: true },
        height: { type: "number", default: 220, min: 120, max: 300, step: 10 },
      }}
      render={({ orientation, fade, height }) =>
        orientation === "vertical" ? (
          <ScrollArea fade={fade} className="w-48 rounded-lg border" style={{ height }}>
            <div className="p-3">
              <div className="mb-2 text-xs font-medium text-muted-foreground">Releases</div>
              {tags.map((t) => (
                <div key={t} className="border-b py-1.5 font-mono text-xs last:border-0">
                  {t}
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <ScrollArea orientation="horizontal" fade={fade} className="w-full max-w-sm rounded-lg border">
            <div className="flex gap-2 p-3">
              {tags.slice(0, 16).map((t) => (
                <span key={t} className="shrink-0 rounded-md border bg-muted/40 px-2.5 py-1 font-mono text-xs">
                  {t}
                </span>
              ))}
            </div>
          </ScrollArea>
        )
      }
      code={({ orientation, fade, height }) => `<ScrollArea${jsxProps({ orientation, fade }, { orientation: "vertical" })} className="${orientation === "vertical" ? `h-[${height}px] w-48` : "w-full"} rounded-lg border">
  …
</ScrollArea>`}
    />
  )
}
