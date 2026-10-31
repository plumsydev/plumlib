"use client"

import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  fade = false,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  /** fond les bords du contenu pr suggérer qu'il y a de la suite */
  fade?: boolean
  orientation?: "vertical" | "horizontal" | "both"
}) {
  return (
    <ScrollAreaPrimitive.Root data-slot="scroll-area" className={cn("relative", className)} {...props}>
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className={cn(
          "size-full rounded-[inherit] outline-none transition-[box-shadow] focus-visible:ring-[3px] focus-visible:ring-ring",
          fade && orientation !== "horizontal" && "mask-y-from-[calc(100%-1.5rem)]",
          fade && orientation === "horizontal" && "mask-x-from-[calc(100%-1.5rem)]"
        )}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {orientation !== "horizontal" && <ScrollBar orientation="vertical" />}
      {orientation !== "vertical" && <ScrollBar orientation="horizontal" />}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      // forceMount pr pouvoir fondre la barre au lieu qu'elle pop d'un coup
      forceMount
      className={cn(
        "group/scrollbar flex touch-none p-px select-none",
        "transition-[opacity,width,height] duration-300 ease-out-quart data-[state=hidden]:pointer-events-none data-[state=hidden]:opacity-0 data-[state=visible]:opacity-100",
        orientation === "vertical" && "h-full w-2 border-l border-l-transparent hover:w-2.5",
        orientation === "horizontal" && "h-2 flex-col border-t border-t-transparent hover:h-2.5",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-foreground/15 transition-colors group-hover/scrollbar:bg-foreground/30"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
