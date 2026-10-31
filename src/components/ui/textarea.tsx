import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({
  className,
  autoResize = false,
  ...props
}: React.ComponentProps<"textarea"> & { autoResize?: boolean }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground shadow-xs md:text-sm dark:bg-input/20",
        "placeholder:text-muted-foreground selection:bg-brand/25",
        "transition-[color,box-shadow,border-color,height] duration-200 ease-out-quart outline-none",
        "hover:border-foreground/20 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        // field-sizing fait le taf tt seul ds les navigateurs récents, pas de js mskn
        autoResize ? "field-sizing-content resize-none" : "resize-y",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
