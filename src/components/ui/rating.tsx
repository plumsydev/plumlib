"use client"

import * as React from "react"
import { motion, useAnimationControls } from "motion/react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const ratingVariants = cva("inline-flex items-center", {
  variants: {
    size: {
      sm: "gap-0.5 [--star:1rem]",
      default: "gap-1 [--star:1.25rem]",
      lg: "gap-1.5 [--star:1.75rem]",
    },
  },
  defaultVariants: { size: "default" },
})

type RatingProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> &
  VariantProps<typeof ratingVariants> & {
    value?: number
    defaultValue?: number
    onValueChange?: (value: number) => void
    max?: number
    /** autorise les demi étoiles */
    allowHalf?: boolean
    readOnly?: boolean
    disabled?: boolean
    /** remplace l'étoile par ton icone, reçoit la classe à appliquer */
    icon?: (className: string) => React.ReactNode
    /** texte lu par les lecteurs d'écran */
    label?: string
  }

function StarShape({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 2.8l2.75 5.6 6.15.9-4.45 4.35 1.05 6.13L12 16.9l-5.5 2.88 1.05-6.13L3.1 9.3l6.15-.9L12 2.8Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Star({
  fill,
  index,
  popKey,
  icon,
}: {
  fill: number
  index: number
  popKey: number
  icon: (className: string) => React.ReactNode
}) {
  const controls = useAnimationControls()
  React.useEffect(() => {
    // la dernière étoile cliquée fait pop, les autres suivent en cascade légère
    if (popKey > 0) controls.start({ scale: [1, 1.3, 1], rotate: [0, -10, 0], transition: { duration: 0.45, delay: index * 0.03, ease: [0.34, 1.56, 0.64, 1] } })
  }, [popKey, controls, index])

  return (
    <motion.span animate={controls} className="relative block size-(--star)">
      {icon("absolute inset-0 size-full text-muted-foreground/25")}
      <span
        className="absolute inset-0 overflow-hidden transition-[clip-path] duration-300 ease-out-expo"
        style={{ clipPath: `inset(0 ${100 - fill * 100}% 0 0)` }}
      >
        {icon("absolute inset-0 size-full text-warning drop-shadow-[0_1px_2px_color-mix(in_oklch,var(--warning)_40%,transparent)]")}
      </span>
    </motion.span>
  )
}

function Rating({
  value: valueProp,
  defaultValue = 0,
  onValueChange,
  max = 5,
  allowHalf = false,
  readOnly = false,
  disabled = false,
  size,
  icon = (c) => <StarShape className={c} />,
  label = "Rating",
  className,
  ...props
}: RatingProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const value = valueProp ?? inner
  const [hover, setHover] = React.useState<number | null>(null)
  const [pop, setPop] = React.useState<{ key: number; upTo: number }>({ key: 0, upTo: 0 })
  const interactive = !readOnly && !disabled
  const shown = hover ?? value
  const step = allowHalf ? 0.5 : 1

  const set = (v: number) => {
    // recliquer la meme valeur remet à zéro, comme sur la plupart des apps
    const next = v === value ? 0 : v
    if (valueProp === undefined) setInner(next)
    onValueChange?.(next)
    setPop((p) => ({ key: p.key + 1, upTo: next }))
  }

  const valueFromPointer = (e: React.PointerEvent | React.MouseEvent, i: number) => {
    if (!allowHalf) return i + 1
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    return e.clientX - rect.left < rect.width / 2 ? i + 0.5 : i + 1
  }

  return (
    <div
      role="slider"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={`${value} out of ${max}`}
      aria-readonly={readOnly || undefined}
      aria-disabled={disabled || undefined}
      tabIndex={interactive ? 0 : undefined}
      data-slot="rating"
      onKeyDown={(e) => {
        if (!interactive) return
        const keys: Record<string, number> = {
          ArrowRight: Math.min(max, value + step),
          ArrowUp: Math.min(max, value + step),
          ArrowLeft: Math.max(0, value - step),
          ArrowDown: Math.max(0, value - step),
          Home: 0,
          End: max,
        }
        if (e.key in keys) {
          e.preventDefault()
          const next = keys[e.key]
          if (valueProp === undefined) setInner(next)
          onValueChange?.(next)
        }
      }}
      onPointerLeave={() => setHover(null)}
      className={cn(
        ratingVariants({ size }),
        "rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring",
        disabled && "opacity-50",
        className
      )}
      {...props}
    >
      {Array.from({ length: max }, (_, i) => {
        const fill = Math.max(0, Math.min(1, shown - i))
        return (
          <span
            key={i}
            onPointerMove={interactive ? (e) => setHover(valueFromPointer(e, i)) : undefined}
            onClick={interactive ? (e) => set(valueFromPointer(e, i)) : undefined}
            className={cn(
              "block",
              interactive && "cursor-pointer transition-[scale] duration-200 ease-out-quart hover:scale-115 active:scale-90"
            )}
          >
            <Star fill={fill} index={i} popKey={i < pop.upTo ? pop.key : 0} icon={icon} />
          </span>
        )
      })}
    </div>
  )
}

export { Rating, ratingVariants, type RatingProps }
