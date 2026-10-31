"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Playground, jsxProps } from "@/components/site/playground"

export default function TooltipPlayground() {
  return (
    <Playground
      controls={{
        side: { type: "select", options: ["top", "right", "bottom", "left"], default: "top" },
        delayDuration: { type: "number", default: 150, min: 0, max: 1000, step: 50 },
        showArrow: { type: "boolean", default: true },
        label: { type: "text", default: "Copy to clipboard" },
        shortcut: { type: "text", default: "⌘C" },
      }}
      render={({ side, delayDuration, showArrow, label, shortcut }) => (
        <Tooltip delayDuration={delayDuration}>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent side={side} showArrow={showArrow}>
            {label}
            {shortcut && <kbd>{shortcut}</kbd>}
          </TooltipContent>
        </Tooltip>
      )}
      code={({ side, delayDuration, showArrow, label, shortcut }) => `<Tooltip${jsxProps({ delayDuration }, { delayDuration: 150 })}>
  <TooltipTrigger asChild>
    <Button variant="outline">Hover me</Button>
  </TooltipTrigger>
  <TooltipContent${jsxProps({ side, showArrow }, { side: "top" })}>
    ${label}${shortcut ? `\n    <kbd>${shortcut}</kbd>` : ""}
  </TooltipContent>
</Tooltip>`}
    />
  )
}
