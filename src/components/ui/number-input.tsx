"use client"

import * as React from "react"
import { motion, useAnimationControls } from "motion/react"
import { Minus, Plus } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { AnimatedNumber } from "@/components/ui/animated-number"

const numberInputVariants = cva(
  [
    "group/number relative inline-flex items-stretch overflow-hidden rounded-md border border-input bg-background shadow-xs dark:bg-input/20",
    "transition-[border-color,box-shadow] duration-200 ease-out-quart",
    "hover:border-foreground/20 has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-[3px] has-[input:focus-visible]:ring-ring",
    "has-[input[aria-invalid=true]]:border-destructive has-[input[aria-invalid=true]]:ring-destructive/20",
    "has-[input:disabled]:pointer-events-none has-[input:disabled]:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "h-8 text-sm [--btn:2rem]",
        default: "h-9 text-sm [--btn:2.25rem]",
        lg: "h-11 text-base [--btn:2.75rem]",
      },
    },
    defaultVariants: { size: "default" },
  }
)

type NumberInputProps = Omit<React.ComponentProps<"input">, "value" | "defaultValue" | "onChange" | "size" | "type" | "min" | "max" | "step"> &
  VariantProps<typeof numberInputVariants> & {
    value?: number
    defaultValue?: number
    onValueChange?: (value: number) => void
    min?: number
    max?: number
    step?: number
    /** options Intl.NumberFormat pr l'affichage, ex { style: "currency", currency: "EUR" } */
    format?: Intl.NumberFormatOptions
    locales?: Intl.LocalesArgument
    /** masque les boutons +/- */
    hideControls?: boolean
    containerClassName?: string
  }

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

// arrondi au pas pr éviter les 0.30000000000000004 qui font tache
function roundToStep(v: number, step: number) {
  const decimals = (String(step).split(".")[1] ?? "").length
  return Number(v.toFixed(decimals))
}

function NumberInput({
  value: valueProp,
  defaultValue = 0,
  onValueChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  format,
  locales = "en-US",
  hideControls = false,
  size,
  className,
  containerClassName,
  disabled,
  onKeyDown,
  onFocus,
  onBlur,
  ...props
}: NumberInputProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const value = valueProp ?? inner
  const [focused, setFocused] = React.useState(false)
  const [draft, setDraft] = React.useState(String(value))
  const shake = useAnimationControls()
  const valueRef = React.useRef(value)
  valueRef.current = value

  const commit = React.useCallback(
    (next: number) => {
      const bounded = clamp(roundToStep(next, step), min, max)
      // petit tremblement qd on tape contre une borne, ça dit non sans être relou
      if (bounded !== next) shake.start({ x: [0, -4, 4, -3, 3, 0], transition: { duration: 0.35 } })
      if (bounded === valueRef.current) return
      valueRef.current = bounded
      if (valueProp === undefined) setInner(bounded)
      onValueChange?.(bounded)
    },
    [step, min, max, valueProp, onValueChange, shake]
  )

  React.useEffect(() => {
    if (!focused) setDraft(String(value))
  }, [value, focused])

  // hold-to-repeat qui accélère, comme un vrai stepper physique
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  const stop = React.useCallback(() => clearTimeout(timer.current), [])
  React.useEffect(() => stop, [stop])

  const startRepeat = (dir: 1 | -1) => {
    commit(valueRef.current + dir * step)
    let delay = 380
    const tick = () => {
      commit(valueRef.current + dir * step)
      delay = Math.max(40, delay * 0.8)
      timer.current = setTimeout(tick, delay)
    }
    timer.current = setTimeout(tick, delay)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e)
    if (e.defaultPrevented) return
    const big = e.shiftKey ? 10 : 1
    const map: Record<string, () => void> = {
      ArrowUp: () => commit(value + step * big),
      ArrowDown: () => commit(value - step * big),
      PageUp: () => commit(value + step * 10),
      PageDown: () => commit(value - step * 10),
      Home: () => Number.isFinite(min) && commit(min),
      End: () => Number.isFinite(max) && commit(max),
      Enter: () => {
        const parsed = Number(draft.replace(/[^\d.-]/g, ""))
        if (!Number.isNaN(parsed)) commit(parsed)
        setDraft(String(valueRef.current))
      },
    }
    if (map[e.key]) {
      e.preventDefault()
      map[e.key]()
      if (e.key !== "Enter") setDraft(String(valueRef.current))
    }
  }

  const stepper = (dir: 1 | -1) => {
    const atBound = dir === 1 ? value >= max : value <= min
    return (
      <button
        type="button"
        tabIndex={-1}
        aria-label={dir === 1 ? "Increment" : "Decrement"}
        disabled={disabled || atBound}
        onPointerDown={(e) => {
          if (e.button !== 0) return
          e.preventDefault()
          startRepeat(dir)
        }}
        onPointerUp={stop}
        onPointerLeave={stop}
        onPointerCancel={stop}
        className={cn(
          "flex w-(--btn) shrink-0 cursor-pointer items-center justify-center text-muted-foreground",
          "transition-[background-color,color] duration-150 hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40",
          "active:bg-accent/70 [&_svg]:size-3.5 [&_svg]:transition-[scale] [&_svg]:duration-150 active:[&_svg]:scale-75",
          dir === -1 ? "border-r" : "border-l"
        )}
      >
        {dir === 1 ? <Plus /> : <Minus />}
      </button>
    )
  }

  return (
    <motion.div
      animate={shake}
      data-slot="number-input"
      className={cn(numberInputVariants({ size }), containerClassName)}
    >
      {!hideControls && stepper(-1)}
      <div className="relative min-w-0 flex-1">
        <input
          inputMode="decimal"
          role="spinbutton"
          aria-valuenow={value}
          aria-valuemin={Number.isFinite(min) ? min : undefined}
          aria-valuemax={Number.isFinite(max) ? max : undefined}
          disabled={disabled}
          value={focused ? draft : String(value)}
          onChange={(e) => setDraft(e.target.value)}
          onFocus={(e) => {
            setFocused(true)
            setDraft(String(value))
            onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            const parsed = Number(draft.replace(/[^\d.-]/g, ""))
            if (draft.trim() !== "" && !Number.isNaN(parsed)) commit(parsed)
            onBlur?.(e)
          }}
          onKeyDown={handleKeyDown}
          className={cn(
            "h-full w-full min-w-0 bg-transparent px-3 text-center tabular-nums outline-none",
            // hors focus on cache le texte natif et on montre les chiffres qui roulent par dessus
            !focused && "text-transparent caret-transparent selection:bg-transparent",
            className
          )}
          {...props}
        />
        {!focused && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center px-3 font-medium">
            <AnimatedNumber value={value} format={format} locales={locales} />
          </span>
        )}
      </div>
      {!hideControls && stepper(1)}
    </motion.div>
  )
}

export { NumberInput, numberInputVariants, type NumberInputProps }
