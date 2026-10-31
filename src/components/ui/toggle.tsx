"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toggleVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
    "transition-[background-color,color,box-shadow,transform] duration-200 ease-out-quart outline-none",
    "hover:bg-muted hover:text-foreground active:scale-[0.95] active:duration-75",
    "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
    "focus-visible:ring-[3px] focus-visible:ring-ring",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "[&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:ease-spring data-[state=on]:[&_svg]:scale-110",
  ],
  {
    variants: {
      variant: {
        default: "bg-transparent text-muted-foreground",
        outline:
          "border border-input bg-background text-muted-foreground shadow-xs hover:bg-accent data-[state=on]:border-foreground/20 dark:bg-input/20",
      },
      size: {
        sm: "h-8 min-w-8 px-1.5",
        default: "h-9 min-w-9 px-2",
        lg: "h-10 min-w-10 px-2.5",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return <TogglePrimitive.Root data-slot="toggle" className={cn(toggleVariants({ variant, size }), className)} {...props} />
}

export { Toggle, toggleVariants }
