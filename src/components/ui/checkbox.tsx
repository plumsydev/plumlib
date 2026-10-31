"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"

type CheckedState = boolean | "indeterminate"

// courbe équilibrée pr le tracé, l'expo finit trop vite et ça pope au lieu de dessiner
const draw = [0.65, 0, 0.35, 1] as const

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
  const on = checked === true || checked === "indeterminate"

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
        "transition-[border-color,box-shadow,scale] duration-200 ease-out-quart outline-none",
        "hover:border-foreground/35 active:scale-[0.85]",
        "focus-visible:ring-[3px] focus-visible:ring-ring",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        "data-[state=checked]:border-primary data-[state=indeterminate]:border-primary",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {/* le remplissage pousse depuis le centre, ensuite le check se dessine dessus */}
      <motion.span
        aria-hidden
        initial={false}
        animate={on ? { scale: 1, opacity: 1 } : { scale: 0.35, opacity: 0 }}
        transition={on ? spring.snappy : { duration: 0.18, ease: "easeIn" }}
        className="pointer-events-none absolute -inset-px rounded-[5px] bg-primary"
      />
      <CheckboxPrimitive.Indicator forceMount data-slot="checkbox-indicator" className="pointer-events-none relative">
        <svg viewBox="0 0 16 16" fill="none" className="size-3.5 text-primary-foreground" aria-hidden>
          <AnimatePresence initial={false}>
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
                exit={{ pathLength: 0, opacity: 0, transition: { duration: 0.14, ease: "easeIn" } }}
                transition={{
                  pathLength: { duration: 0.42, ease: draw, delay: 0.07 },
                  opacity: { duration: 0.01, delay: 0.07 },
                }}
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
                exit={{ pathLength: 0, opacity: 0, transition: { duration: 0.14, ease: "easeIn" } }}
                transition={{
                  pathLength: { duration: 0.32, ease: draw, delay: 0.05 },
                  opacity: { duration: 0.01, delay: 0.05 },
                }}
              />
            )}
          </AnimatePresence>
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
