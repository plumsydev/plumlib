"use client"

import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn("grid gap-3", className)} {...props} />
}

function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "peer relative grid aspect-square size-4 shrink-0 cursor-pointer place-items-center rounded-full border border-input bg-background shadow-xs dark:bg-input/20",
        "transition-[border-color,box-shadow,transform] duration-200 ease-out-quart outline-none",
        "hover:border-foreground/30 active:scale-90 data-[state=checked]:border-primary",
        "focus-visible:ring-[3px] focus-visible:ring-ring",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator" asChild>
        {/* le point qui pop en ressort, petit plaisir coupable */}
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={spring.bouncy}
          className="size-2 rounded-full bg-primary"
        />
      </RadioGroupPrimitive.Indicator>
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
        "transition-[border-color,background-color,box-shadow,transform] duration-200 ease-out-quart outline-none",
        "hover:border-foreground/20 active:scale-[0.99]",
        "data-[state=checked]:border-primary data-[state=checked]:bg-accent/40",
        "focus-visible:ring-[3px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border border-input transition-colors duration-200 group-data-[state=checked]/radio:border-primary">
        <RadioGroupPrimitive.Indicator asChild>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={spring.bouncy}
            className="size-2 rounded-full bg-primary"
          />
        </RadioGroupPrimitive.Indicator>
      </span>
      <span className="flex flex-1 flex-col gap-1">{children}</span>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem, RadioGroupCard }
