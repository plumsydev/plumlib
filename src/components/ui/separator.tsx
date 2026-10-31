"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  children,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  // avec un label on fait deux traits et le texte au milieu
  if (children && orientation === "horizontal") {
    return (
      <div data-slot="separator-label" className={cn("flex items-center gap-3 text-xs text-muted-foreground", className)}>
        <SeparatorPrimitive.Root decorative={decorative} className="h-px flex-1 bg-border" {...props} />
        <span className="shrink-0">{children}</span>
        <SeparatorPrimitive.Root decorative className="h-px flex-1 bg-border" />
      </div>
    )
  }

  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
