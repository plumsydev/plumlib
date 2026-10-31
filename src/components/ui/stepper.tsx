"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"

type Orientation = "horizontal" | "vertical"
type StepState = "completed" | "active" | "inactive"

type StepperContextValue = {
  value: number
  setValue: (step: number) => void
  orientation: Orientation
}

const StepperContext = React.createContext<StepperContextValue | null>(null)
const ItemContext = React.createContext<{ step: number; state: StepState; disabled: boolean; last: boolean }>({
  step: 0,
  state: "inactive",
  disabled: false,
  last: false,
})

function useStepper() {
  const ctx = React.useContext(StepperContext)
  if (!ctx) throw new Error("useStepper doit etre utilisé dans <Stepper>")
  return ctx
}

type StepperProps = Omit<React.ComponentProps<"div">, "defaultValue"> & {
  value?: number
  defaultValue?: number
  onValueChange?: (step: number) => void
  orientation?: Orientation
}

function Stepper({
  value: valueProp,
  defaultValue = 1,
  onValueChange,
  orientation = "horizontal",
  className,
  ...props
}: StepperProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const value = valueProp ?? inner
  const setValue = React.useCallback(
    (step: number) => {
      if (valueProp === undefined) setInner(step)
      onValueChange?.(step)
    },
    [valueProp, onValueChange]
  )

  return (
    <StepperContext.Provider value={{ value, setValue, orientation }}>
      <div
        data-slot="stepper"
        data-orientation={orientation}
        className={cn(
          // la taille des pastilles passe par une var, comme ça les connecteurs restent alignés
          "group/stepper flex w-full [--stepper-indicator:2rem]",
          orientation === "horizontal" ? "flex-row items-start" : "flex-col",
          className
        )}
        {...props}
      />
    </StepperContext.Provider>
  )
}

type StepperItemProps = React.ComponentProps<"div"> & {
  step: number
  completed?: boolean
  disabled?: boolean
  /** retire le connecteur après cette étape */
  last?: boolean
}

function StepperItem({ step, completed, disabled = false, last = false, className, ...props }: StepperItemProps) {
  const { value, orientation } = useStepper()
  const state: StepState = completed || step < value ? "completed" : step === value ? "active" : "inactive"
  return (
    <ItemContext.Provider value={{ step, state, disabled, last }}>
      <div
        data-slot="stepper-item"
        data-state={state}
        data-disabled={disabled || undefined}
        className={cn(
          "group/step relative flex",
          orientation === "horizontal" ? "flex-1 flex-col items-center" : "flex-col",
          className
        )}
        {...props}
      />
    </ItemContext.Provider>
  )
}

function StepperTrigger({ className, onClick, ...props }: React.ComponentProps<"button">) {
  const { setValue, orientation } = useStepper()
  const { step, state, disabled } = React.useContext(ItemContext)
  return (
    <button
      type="button"
      data-slot="stepper-trigger"
      aria-current={state === "active" ? "step" : undefined}
      disabled={disabled}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) setValue(step)
      }}
      className={cn(
        "group/trigger flex cursor-pointer items-center gap-3 rounded-lg text-left outline-none transition-opacity",
        "focus-visible:ring-[3px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        orientation === "horizontal" ? "flex-col gap-2 px-1 text-center" : "w-full",
        className
      )}
      {...props}
    />
  )
}

function StepperIndicator({ className, children, ...props }: React.ComponentProps<"span">) {
  const { step, state } = React.useContext(ItemContext)
  return (
    <span
      data-slot="stepper-indicator"
      data-state={state}
      className={cn(
        "relative flex size-(--stepper-indicator) shrink-0 items-center justify-center rounded-full border text-sm font-medium tabular-nums",
        "transition-[background-color,border-color,color,box-shadow] duration-300 ease-out-quart",
        "data-[state=inactive]:bg-background data-[state=inactive]:text-muted-foreground group-hover/trigger:data-[state=inactive]:border-foreground/30",
        "data-[state=active]:border-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:ring-4 data-[state=active]:ring-foreground/8",
        "data-[state=completed]:border-primary data-[state=completed]:bg-primary data-[state=completed]:text-primary-foreground",
        className
      )}
      {...props}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {state === "completed" ? (
          <motion.svg
            key="check"
            viewBox="0 0 16 16"
            fill="none"
            className="size-4"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={spring.bouncy}
            aria-hidden
          >
            {/* le check se dessine pour de vrai, assez lentement pr qu'on le voie */}
            <motion.path
              d="M3.5 8.5 6.5 11.5 12.5 4.5"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.65, 0, 0.35, 1] }}
            />
          </motion.svg>
        ) : (
          <motion.span
            key="num"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={spring.snappy}
          >
            {children ?? step}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

function StepperTitle({ className, ...props }: React.ComponentProps<"span">) {
  const { state } = React.useContext(ItemContext)
  return (
    <span
      data-slot="stepper-title"
      className={cn(
        "block text-sm font-medium transition-colors duration-300",
        state === "inactive" && "text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function StepperDescription({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="stepper-description" className={cn("block text-xs text-muted-foreground", className)} {...props} />
}

function StepperSeparator({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useStepper()
  const { state, last } = React.useContext(ItemContext)
  if (last) return null
  const filled = state === "completed"
  const horizontal = orientation === "horizontal"
  return (
    <div
      data-slot="stepper-separator"
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-full bg-border",
        // en horizontal le trait va du centre de cette pastille à celui de la suivante
        horizontal
          ? "absolute top-[calc(var(--stepper-indicator)/2-1px)] right-[calc(-50%+var(--stepper-indicator)/2+0.5rem)] left-[calc(50%+var(--stepper-indicator)/2+0.5rem)] h-0.5"
          : "my-2 ml-[calc(var(--stepper-indicator)/2-1px)] min-h-8 w-0.5 flex-1",
        className
      )}
      {...props}
    >
      {/* le connecteur se remplit dans le sens de la progression */}
      <motion.span
        className={cn("absolute inset-0 rounded-full bg-primary", horizontal ? "origin-left" : "origin-top")}
        initial={false}
        animate={horizontal ? { scaleX: filled ? 1 : 0 } : { scaleY: filled ? 1 : 0 }}
        transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1], delay: filled ? 0 : 0.05 }}
      />
    </div>
  )
}

export {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
  useStepper,
}
