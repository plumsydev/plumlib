"use client"

import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn("grid gap-3", className)} {...props} />
}

// le point pop en ressort css, petit plaisir coupable
const dotClass = cn(
  "pointer-events-none size-2 rounded-full bg-primary",
  "transition-[scale,opacity] ease-spring data-[state=checked]:scale-100 data-[state=checked]:opacity-100 data-[state=checked]:duration-500",
  "data-[state=unchecked]:scale-0 data-[state=unchecked]:opacity-0 data-[state=unchecked]:duration-150 data-[state=unchecked]:ease-in-quart"
)

function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "peer relative grid aspect-square size-4 shrink-0 cursor-pointer place-items-center rounded-full border border-input bg-background shadow-xs dark:bg-input/20",
        "transition-[border-color,box-shadow,scale,border-width] duration-200 ease-out-quart outline-none",
        "hover:border-foreground/35 active:scale-[0.85] data-[state=checked]:border-primary",
        "focus-visible:ring-[3px] focus-visible:ring-ring",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {/* forceMount pr animer aussi la sortie, le point rétrécit au lieu de disparaitre sec */}
      <RadioGroupPrimitive.Indicator forceMount data-slot="radio-group-indicator" className={dotClass} />
    </RadioGroupPrimitive.Item>
  )
}

// variante carte cliquable, tt le bloc devient la cible
function RadioGroupCard({
  className,
  children,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-card"
      className={cn(
        "group/radio relative flex cursor-pointer items-start gap-3 rounded-lg border bg-background p-4 text-left shadow-xs dark:bg-input/10",
        "transition-[border-color,background-color,box-shadow,scale] duration-200 ease-out-quart outline-none",
        "hover:border-foreground/20 active:scale-[0.99]",
        "data-[state=checked]:border-primary data-[state=checked]:bg-accent/40",
        "focus-visible:ring-[3px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border border-input transition-colors duration-200 group-data-[state=checked]/radio:border-primary">
        <RadioGroupPrimitive.Indicator forceMount className={dotClass} />
      </span>
      <span className="flex flex-1 flex-col gap-1">{children}</span>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem, RadioGroupCard }
