"use client"

import * as React from "react"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"

const toggleGroupVariants = cva("group/toggle-group relative inline-flex w-fit items-center", {
  variants: {
    variant: {
      default: "gap-0.5 rounded-lg bg-muted p-0.5",
      outline: "gap-0.5 rounded-lg border bg-background p-0.5 shadow-xs dark:bg-input/20",
      ghost: "gap-1",
    },
    size: {
      sm: "[--item-h:1.75rem] text-xs",
      default: "[--item-h:2rem] text-sm",
      lg: "[--item-h:2.25rem] text-sm",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
})

type ToggleGroupContextValue = VariantProps<typeof toggleGroupVariants> & {
  groupId: string
  type: "single" | "multiple"
  isOn: (value: string) => boolean
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null)

type ToggleGroupProps = React.ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleGroupVariants>

function ToggleGroup({ className, variant, size, children, ...props }: ToggleGroupProps) {
  const groupId = React.useId()
  // radix type ses props en union single/multiple, on aplatit pr suivre la valeur nous meme
  const p = props as {
    type: "single" | "multiple"
    value?: string | string[]
    defaultValue?: string | string[]
    onValueChange?: (v: string & string[]) => void
  }
  const [inner, setInner] = React.useState<string | string[]>(p.defaultValue ?? (p.type === "multiple" ? [] : ""))
  const current = p.value ?? inner

  const isOn = React.useCallback(
    (v: string) => (Array.isArray(current) ? current.includes(v) : current === v),
    [current]
  )

  const rootProps = {
    ...props,
    onValueChange: (v: string & string[]) => {
      if (p.value === undefined) setInner(v)
      p.onValueChange?.(v)
    },
  } as React.ComponentProps<typeof ToggleGroupPrimitive.Root>

  return (
    <ToggleGroupContext.Provider value={{ groupId, type: p.type, isOn, variant, size }}>
      <ToggleGroupPrimitive.Root
        data-slot="toggle-group"
        data-variant={variant ?? "default"}
        className={cn(toggleGroupVariants({ variant, size }), className)}
        {...rootProps}
      >
        {children}
      </ToggleGroupPrimitive.Root>
    </ToggleGroupContext.Provider>
  )
}

function ToggleGroupItem({
  className,
  children,
  value,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  const ctx = React.useContext(ToggleGroupContext)
  const on = ctx?.isOn(value) ?? false
  const variant = ctx?.variant ?? "default"

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      value={value}
      className={cn(
        "relative inline-flex h-(--item-h) min-w-(--item-h) shrink-0 cursor-pointer select-none items-center justify-center gap-1.5 rounded-md px-2.5 font-medium",
        "text-muted-foreground transition-[color,scale] duration-200 ease-out-quart outline-none",
        "hover:text-foreground active:scale-[0.96] data-[state=on]:text-foreground",
        "focus-visible:ring-[3px] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        variant === "ghost" && "hover:bg-muted",
        className
      )}
      {...props}
    >
      {ctx?.type === "single" ? (
        on && (
          // l'indicateur glisse d'un item à l'autre, le useId isole chaque groupe
          <motion.span
            layoutId={`${ctx.groupId}-indicator`}
            transition={spring.snappy}
            className={cn(
              "absolute inset-0 rounded-md",
              variant === "ghost" ? "bg-accent" : "bg-background shadow-sm ring-1 ring-border dark:bg-accent"
            )}
          />
        )
      ) : (
        <AnimatePresence initial={false}>
          {on && (
            <motion.span
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={spring.snappy}
              className={cn(
                "absolute inset-0 rounded-md",
                variant === "ghost" ? "bg-accent" : "bg-background shadow-sm ring-1 ring-border dark:bg-accent"
              )}
            />
          )}
        </AnimatePresence>
      )}
      <span className="relative z-10 inline-flex items-center gap-1.5">{children}</span>
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem, toggleGroupVariants }
