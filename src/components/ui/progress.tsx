"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, useSpring, useTransform } from "motion/react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"

const indicatorVariants = cva("h-full w-full rounded-full", {
  variants: {
    variant: {
      default: "bg-primary",
      brand: "bg-brand",
      success: "bg-success",
      warning: "bg-warning",
      destructive: "bg-destructive",
    },
  },
  defaultVariants: { variant: "default" },
})

type ProgressProps = Omit<React.ComponentProps<typeof ProgressPrimitive.Root>, "value"> &
  VariantProps<typeof indicatorVariants> & {
    /** null ou undefined => mode indéterminé */
    value?: number | null
    size?: "sm" | "default" | "lg"
  }

function Progress({ className, value, max = 100, variant, size = "default", ...props }: ProgressProps) {
  const indeterminate = value == null
  const pct = indeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      max={max}
      className={cn(
        "relative w-full overflow-hidden rounded-full bg-primary/10",
        size === "sm" && "h-1",
        size === "default" && "h-2",
        size === "lg" && "h-3",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator data-slot="progress-indicator" asChild>
        {indeterminate ? (
          // la barre qui fait des allers retours qd on sait pas combien de temps ça va prendre
          <motion.div
            className={cn(indicatorVariants({ variant }), "w-2/5")}
            initial={{ x: "-100%" }}
            animate={{ x: "250%" }}
            transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1], repeat: Infinity }}
          />
        ) : (
          <motion.div
            className={indicatorVariants({ variant })}
            initial={false}
            animate={{ x: `${pct - 100}%` }}
            transition={spring.smooth}
          />
        )}
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  )
}

type ProgressRingProps = Omit<React.ComponentProps<"svg">, "children"> & {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  showValue?: boolean
}

function ProgressRing({ value, max = 100, size = 48, strokeWidth = 4, showValue = false, className, ...props }: ProgressRingProps) {
  const r = (size - strokeWidth) / 2
  const c = 2 * Math.PI * r
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const progress = useSpring(pct, spring.smooth)
  const offset = useTransform(progress, (p) => c - (p / 100) * c)
  const label = useTransform(progress, (p) => `${Math.round(p)}%`)

  React.useEffect(() => {
    progress.set(pct)
  }, [pct, progress])

  return (
    <div
      data-slot="progress-ring"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={cn("-rotate-90 text-primary", className)} {...props}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeOpacity={0.12} strokeWidth={strokeWidth} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={c}
          style={{ strokeDashoffset: offset }}
        />
      </svg>
      {showValue && <motion.span className="absolute text-xs font-medium tabular-nums">{label}</motion.span>}
    </div>
  )
}

export { Progress, ProgressRing }
