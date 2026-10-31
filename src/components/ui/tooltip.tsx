"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

function TooltipProvider({ delayDuration = 150, skipDelayDuration = 300, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      {...props}
    />
  )
}

// chaque tooltip a son provider pr marcher sans setup, un provider global au dessus prend le relais
function Tooltip(props: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger(props: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 6,
  showArrow = false,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> & { showArrow?: boolean }) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "pl-pop origin-(--radix-tooltip-content-transform-origin) z-50 w-fit max-w-xs text-balance rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground shadow-md",
          "[&_kbd]:ml-1.5 [&_kbd]:rounded-sm [&_kbd]:bg-primary-foreground/15 [&_kbd]:px-1 [&_kbd]:py-px [&_kbd]:font-mono [&_kbd]:text-[0.625rem]",
          className
        )}
        {...props}
      >
        {children}
        {showArrow && <TooltipPrimitive.Arrow className="fill-primary" width={10} height={5} />}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
