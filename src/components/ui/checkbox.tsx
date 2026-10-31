"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"

type CheckedState = boolean | "indeterminate"

function Checkbox({
  className,
  checked: checkedProp,
  defaultChecked,
  onCheckedChange,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  // on garde l'état en local pr piloter l'anim meme en non controlé
  const [inner, setInner] = React.useState<CheckedState>(defaultChecked ?? false)
  const checked = checkedProp ?? inner

  const handleChange = (value: CheckedState) => {
    if (checkedProp === undefined) setInner(value)
    onCheckedChange?.(value)
  }

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      checked={checked}
      onCheckedChange={handleChange}
      className={cn(
        "peer relative grid size-4 shrink-0 cursor-pointer place-items-center rounded-[5px] border border-input bg-background shadow-xs dark:bg-input/20",
        "transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out-quart outline-none",
        "hover:border-foreground/30 active:scale-90",
        "focus-visible:ring-[3px] focus-visible:ring-ring",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator forceMount data-slot="checkbox-indicator" className="pointer-events-none">
        <svg viewBox="0 0 16 16" fill="none" className="size-3.5" aria-hidden>
          <AnimatePresence initial={false} mode="popLayout">
            {checked === true && (
              <motion.path
                key="check"
                d="M3.5 8.5L6.5 11.5L12.5 4.5"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ pathLength: 0, opacity: 0, transition: { duration: 0.1 } }}
                transition={{ pathLength: { duration: 0.28, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.05 } }}
              />
            )}
            {checked === "indeterminate" && (
              <motion.path
                key="dash"
                d="M4 8H12"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ pathLength: 0, opacity: 0, transition: { duration: 0.1 } }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </AnimatePresence>
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
