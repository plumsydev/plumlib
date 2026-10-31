"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"

type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root> & {
  /** affiche la valeur au dessus du thumb pendant le drag */
  showTooltip?: boolean
  formatValue?: (value: number) => React.ReactNode
}

function Slider({
  className,
  defaultValue,
  value: valueProp,
  onValueChange,
  min = 0,
  max = 100,
  showTooltip = false,
  formatValue = (v) => v,
  onPointerDown,
  ...props
}: SliderProps) {
  const [inner, setInner] = React.useState<number[]>(defaultValue ?? [min])
  const values = valueProp ?? inner
  const [dragging, setDragging] = React.useState(false)

  // on écoute le pointerup sur la fenetre sinon on rate le relachement hors du slider
  React.useEffect(() => {
    if (!dragging) return
    const stop = () => setDragging(false)
    window.addEventListener("pointerup", stop)
    window.addEventListener("pointercancel", stop)
    return () => {
      window.removeEventListener("pointerup", stop)
      window.removeEventListener("pointercancel", stop)
    }
  }, [dragging])

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      data-dragging={dragging || undefined}
      value={valueProp}
      defaultValue={defaultValue}
      onValueChange={(v) => {
        if (valueProp === undefined) setInner(v)
        onValueChange?.(v)
      }}
      onPointerDown={(e) => {
        setDragging(true)
        onPointerDown?.(e)
      }}
      min={min}
      max={max}
      className={cn(
        "group/slider relative flex w-full touch-none select-none items-center py-1.5 data-[disabled]:opacity-50",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[orientation=vertical]:px-1.5 data-[orientation=vertical]:py-0",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative grow cursor-pointer overflow-hidden rounded-full bg-muted transition-[height,width] duration-300 ease-out-expo",
          "data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5",
          "group-data-[dragging]/slider:data-[orientation=horizontal]:h-2 group-data-[dragging]/slider:data-[orientation=vertical]:w-2"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
        />
      </SliderPrimitive.Track>
      {values.map((v, i) => (
        <SliderPrimitive.Thumb
          key={i}
          data-slot="slider-thumb"
          className={cn(
            "relative block size-4 shrink-0 cursor-grab rounded-full border border-primary/60 bg-background shadow-md",
            "transition-[scale,box-shadow] duration-300 ease-spring outline-none",
            "hover:scale-110 focus-visible:ring-[4px] focus-visible:ring-ring",
            "group-data-[dragging]/slider:scale-125 group-data-[dragging]/slider:cursor-grabbing group-data-[dragging]/slider:ring-[5px] group-data-[dragging]/slider:ring-ring/60",
            "disabled:pointer-events-none"
          )}
        >
          {showTooltip && (
            <AnimatePresence>
              {dragging && (
                <motion.span
                  initial={{ opacity: 0, y: 4, scale: 0.8, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                  exit={{ opacity: 0, y: 4, scale: 0.7, x: "-50%" }}
                  transition={spring.snappy}
                  className="pointer-events-none absolute bottom-full left-1/2 mb-2 origin-bottom whitespace-nowrap rounded-md bg-primary px-2 py-1 text-xs font-medium tabular-nums text-primary-foreground shadow-md"
                >
                  {formatValue(v)}
                </motion.span>
              )}
            </AnimatePresence>
          )}
        </SliderPrimitive.Thumb>
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider, type SliderProps }
