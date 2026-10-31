"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

const HasProvider = React.createContext(false)

function TooltipProvider({
  delayDuration = 150,
  skipDelayDuration = 300,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      {...props}
    >
      <HasProvider.Provider value>{children}</HasProvider.Provider>
    </TooltipPrimitive.Provider>
  )
}

// marche sans setup, mais si y a un provider au dessus on le garde
// sinon on perd le skip delay qd on glisse d'un tooltip à l'autre
function Tooltip(props: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  const root = <TooltipPrimitive.Root data-slot="tooltip" {...props} />
  return React.useContext(HasProvider) ? root : <TooltipProvider>{root}</TooltipProvider>
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
