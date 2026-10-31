"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Playground, jsxProps } from "@/components/site/playground"

export default function HoverCardPlayground() {
  return (
    <Playground
      controls={{
        side: { type: "select", options: ["top", "right", "bottom", "left"], default: "bottom" },
        openDelay: { type: "number", default: 250, min: 0, max: 1000, step: 50 },
        closeDelay: { type: "number", default: 150, min: 0, max: 1000, step: 50 },
        showArrow: { type: "boolean", default: false },
      }}
      render={({ side, openDelay, closeDelay, showArrow }) => (
        <HoverCard openDelay={openDelay} closeDelay={closeDelay}>
          <HoverCardTrigger asChild>
            <a href="#" className="text-sm font-medium underline decoration-foreground/30 underline-offset-4">@plumsy</a>
          </HoverCardTrigger>
          <HoverCardContent side={side} showArrow={showArrow} className="w-64">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-brand/15 text-brand">P</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">Plumsy</div>
                <div className="text-xs text-muted-foreground">Building Plum UI</div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      )}
      code={({ side, openDelay, closeDelay, showArrow }) => `<HoverCard${jsxProps({ openDelay, closeDelay }, { openDelay: 250, closeDelay: 150 })}>
  <HoverCardTrigger asChild>
    <a href="#">@plumsy</a>
  </HoverCardTrigger>
  <HoverCardContent${jsxProps({ side, showArrow }, { side: "bottom" })}>
    …
  </HoverCardContent>
</HoverCard>`}
    />
  )
}
