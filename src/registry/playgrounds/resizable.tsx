"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Playground } from "@/components/site/playground"

export default function ResizablePlayground() {
  return (
    <Playground
      controls={{
        direction: { type: "select", options: ["horizontal", "vertical"], default: "horizontal" },
        panels: { type: "number", default: 3, min: 2, max: 4 },
        withHandle: { type: "boolean", default: true },
        minSize: { type: "number", default: 15, min: 0, max: 30 },
      }}
      render={({ direction, panels, withHandle, minSize }) => (
        <ResizablePanelGroup
          key={`${direction}-${panels}`}
          direction={direction}
          className="h-64 w-full max-w-lg overflow-hidden rounded-xl border bg-card"
        >
          {Array.from({ length: panels }, (_, i) => [
            i > 0 && <ResizableHandle key={`h${i}`} withHandle={withHandle} />,
            <ResizablePanel key={`p${i}`} minSize={minSize}>
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Panel {i + 1}</div>
            </ResizablePanel>,
          ]).flat()}
        </ResizablePanelGroup>
      )}
      code={({ direction, panels, withHandle, minSize }) => `<ResizablePanelGroup direction="${direction}">
${Array.from({ length: panels }, (_, i) => `${i > 0 ? `  <ResizableHandle${withHandle ? " withHandle" : ""} />\n` : ""}  <ResizablePanel${minSize ? ` minSize={${minSize}}` : ""}>Panel ${i + 1}</ResizablePanel>`).join("\n")}
</ResizablePanelGroup>`}
    />
  )
}
