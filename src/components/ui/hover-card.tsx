"use client"

import * as React from "react"
import { HoverCard as HoverCardPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

function HoverCard({ openDelay = 250, closeDelay = 150, ...props }: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" openDelay={openDelay} closeDelay={closeDelay} {...props} />
}

function HoverCardTrigger(props: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 6,
  showArrow = false,
  children,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content> & { showArrow?: boolean }) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "pl-pop origin-(--radix-hover-card-content-transform-origin) z-50 w-72 rounded-xl border bg-popover p-4 text-popover-foreground shadow-lg outline-none",
          className
        )}
        {...props}
      >
        {children}
        {showArrow && (
          <HoverCardPrimitive.Arrow asChild width={14} height={7}>
            <svg viewBox="0 0 14 7" className="-mt-px block fill-popover stroke-border" aria-hidden>
              <path d="M0 0.5 L7 6.5 L14 0.5" strokeWidth={1} />
            </svg>
          </HoverCardPrimitive.Arrow>
        )}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardContent, HoverCardTrigger }
