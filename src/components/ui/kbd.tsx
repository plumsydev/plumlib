import * as React from "react"
import { cn } from "@/lib/utils"

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "pointer-events-none inline-flex h-5 min-w-5 w-fit select-none items-center justify-center gap-1 rounded-[5px] border border-b-2 bg-muted px-1",
        "font-sans text-[11px] font-medium text-muted-foreground",
        "transition-[transform,border-width,background-color,color] duration-100",
        // data-pressed pr animer une touche qd on l'enfonce pour de vrai
        "data-[pressed=true]:translate-y-px data-[pressed=true]:border-b data-[pressed=true]:bg-accent data-[pressed=true]:text-foreground",
        "[&_svg:not([class*='size-'])]:size-3",
        "in-data-[slot=tooltip-content]:border-background/20 in-data-[slot=tooltip-content]:bg-background/10 in-data-[slot=tooltip-content]:text-background",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"kbd">) {
  return <kbd data-slot="kbd-group" className={cn("inline-flex items-center gap-1", className)} {...props} />
}

export { Kbd, KbdGroup }
