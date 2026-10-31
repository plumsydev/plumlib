"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Playground, jsxProps } from "@/components/site/playground"

export default function PopoverPlayground() {
  return (
    <Playground
      controls={{
        side: { type: "select", options: ["top", "right", "bottom", "left"], default: "bottom" },
        align: { type: "select", options: ["start", "center", "end"], default: "center" },
        sideOffset: { type: "number", default: 6, min: 0, max: 24 },
        showArrow: { type: "boolean", default: false },
      }}
      render={(p) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent {...p} className="w-64">
            <div className="text-sm font-medium">Dimensions</div>
            <p className="mt-1 text-sm text-muted-foreground">Set the size of the selected layer.</p>
          </PopoverContent>
        </Popover>
      )}
      code={(p) => `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent${jsxProps(p, { side: "bottom", align: "center", sideOffset: 6 })}>
    …
  </PopoverContent>
</Popover>`}
    />
  )
}
