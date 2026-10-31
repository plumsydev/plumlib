"use client"

import * as React from "react"
import { Reorder, useDragControls, type DragControls } from "motion/react"
import { GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"

type SortableContextValue<T = unknown> = {
  values: T[]
  move: (from: number, to: number) => void
  axis: "x" | "y"
  lifted: T | null
  setLifted: (value: T | null) => void
  announce: (msg: string) => void
}

const SortableContext = React.createContext<SortableContextValue | null>(null)
const ItemContext = React.createContext<{ value: unknown; controls: DragControls; handle: boolean } | null>(null)

function useSortable() {
  const ctx = React.useContext(SortableContext)
  if (!ctx) throw new Error("useSortable doit etre utilisé dans <Sortable>")
  return ctx
}

type SortableProps<T> = Omit<React.ComponentProps<"ul">, "onChange"> & {
  values: T[]
  onValuesChange: (values: T[]) => void
  axis?: "x" | "y"
}

function Sortable<T>({ values, onValuesChange, axis = "y", className, children, ...props }: SortableProps<T>) {
  const [lifted, setLifted] = React.useState<T | null>(null)
  const [message, setMessage] = React.useState("")

  const move = React.useCallback(
    (from: number, to: number) => {
      if (to < 0 || to >= values.length || from === to) return
      const next = [...values]
      const [item] = next.splice(from, 1)
      next.splice(to, 0, item)
      onValuesChange(next)
    },
    [values, onValuesChange]
  )

  return (
    <SortableContext.Provider
      value={{ values, move, axis, lifted, setLifted: setLifted as (v: unknown) => void, announce: setMessage } as SortableContextValue}
    >
      <Reorder.Group
        as="ul"
        axis={axis}
        values={values}
        onReorder={onValuesChange}
        data-slot="sortable"
        className={cn("relative flex", axis === "y" ? "flex-col" : "flex-row", className)}
        {...(props as object)}
      >
        {children}
      </Reorder.Group>
      {/* annonce les déplacements au clavier pr les lecteurs d'écran */}
      <span aria-live="assertive" className="sr-only">
        {message}
      </span>
    </SortableContext.Provider>
  )
}

type SortableItemProps<T> = Omit<React.ComponentProps<typeof Reorder.Item>, "value"> & {
  value: T
  /** si true on ne peut attraper l'item que par sa poignée */
  handle?: boolean
}

function SortableItem<T>({ value, handle = true, className, children, ...props }: SortableItemProps<T>) {
  const controls = useDragControls()
  const { lifted } = useSortable()
  const isLifted = lifted === value

  return (
    <ItemContext.Provider value={{ value, controls, handle }}>
      <Reorder.Item
        value={value}
        dragListener={!handle}
        dragControls={controls}
        data-slot="sortable-item"
        data-lifted={isLifted || undefined}
        // l'item attrapé se soulève un peu, comme une vraie carte
        whileDrag={{ scale: 1.03, boxShadow: "0 12px 32px -8px rgb(0 0 0 / 0.25)", zIndex: 10 }}
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
        className={cn(
          "relative list-none rounded-lg bg-card transition-[box-shadow,outline-color] data-[lifted]:outline-2 data-[lifted]:outline-brand",
          !handle && "cursor-grab active:cursor-grabbing",
          className
        )}
        {...props}
      >
        {children}
      </Reorder.Item>
    </ItemContext.Provider>
  )
}

function SortableHandle({ className, children, ...props }: React.ComponentProps<"button">) {
  const item = React.useContext(ItemContext)
  const { values, move, axis, lifted, setLifted, announce } = useSortable()
  if (!item) throw new Error("SortableHandle doit etre dans un SortableItem")
  const index = values.indexOf(item.value)
  const isLifted = lifted === item.value
  const back = axis === "y" ? "ArrowUp" : "ArrowLeft"
  const fwd = axis === "y" ? "ArrowDown" : "ArrowRight"

  return (
    <button
      type="button"
      data-slot="sortable-handle"
      aria-label="Reorder"
      aria-pressed={isLifted}
      aria-roledescription="sortable handle"
      onPointerDown={(e) => {
        e.preventDefault()
        item.controls.start(e)
      }}
      onKeyDown={(e) => {
        // espace pr soulever, fleches pr bouger, espace pr poser, échap pr lacher
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault()
          setLifted(isLifted ? null : item.value)
          announce(isLifted ? `Dropped at position ${index + 1}` : `Picked up item ${index + 1}. Use arrow keys to move.`)
        } else if (isLifted && (e.key === back || e.key === fwd)) {
          e.preventDefault()
          const to = index + (e.key === fwd ? 1 : -1)
          move(index, to)
          if (to >= 0 && to < values.length) announce(`Moved to position ${to + 1} of ${values.length}`)
        } else if (e.key === "Escape" && isLifted) {
          setLifted(null)
          announce("Reorder cancelled")
        }
      }}
      onBlur={() => isLifted && setLifted(null)}
      className={cn(
        "flex shrink-0 cursor-grab touch-none items-center justify-center rounded-md p-1 text-muted-foreground outline-none",
        "transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring active:cursor-grabbing",
        "aria-pressed:bg-brand/10 aria-pressed:text-brand [&_svg]:size-4",
        className
      )}
      {...props}
    >
      {children ?? <GripVertical />}
    </button>
  )
}

export { Sortable, SortableItem, SortableHandle, useSortable }
