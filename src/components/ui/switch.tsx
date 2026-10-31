"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const switchVariants = cva(
  [
    "peer group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-xs",
    "transition-[background-color,box-shadow] duration-300 ease-out-quart outline-none",
    "data-[state=unchecked]:bg-input data-[state=checked]:bg-primary dark:data-[state=unchecked]:bg-input/80",
    "focus-visible:ring-[3px] focus-visible:ring-ring",
    "aria-invalid:ring-[3px] aria-invalid:ring-destructive/20",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "h-4 w-7 [--thumb:0.75rem]",
        default: "h-5 w-9 [--thumb:1rem]",
        lg: "h-6 w-11 [--thumb:1.25rem]",
      },
    },
    defaultVariants: { size: "default" },
  }
)

function Switch({
  className,
  size,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & VariantProps<typeof switchVariants>) {
  return (
    <SwitchPrimitive.Root data-slot="switch" className={cn(switchVariants({ size }), className)} {...props}>
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // le thumb s'étire qd on appuie, effet chewing-gum façon ios
          "pointer-events-none block h-(--thumb) w-(--thumb) rounded-full bg-background shadow-sm ring-0 dark:data-[state=unchecked]:bg-foreground/90",
          "transition-[translate,width,margin] duration-400 ease-spring",
          "data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-(--thumb)",
          "group-active/switch:w-[calc(var(--thumb)*1.3)] group-active/switch:data-[state=checked]:-ml-[calc(var(--thumb)*0.3)]",
          "dark:data-[state=checked]:bg-primary-foreground"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch, switchVariants }
