"use client"

import * as React from "react"
import { GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"

type Direction = "horizontal" | "vertical"

type PanelConfig = { defaultSize?: number; minSize: number; maxSize: number }

type GroupContextValue = {
  direction: Direction
  sizes: number[]
  dragging: number | null
  startDrag: (handle: number, e: React.PointerEvent) => void
  nudge: (handle: number, delta: number) => void
  reset: (handle: number) => void
}

const GroupContext = React.createContext<GroupContextValue | null>(null)

function useGroup() {
  const ctx = React.useContext(GroupContext)
  if (!ctx) throw new Error("les panneaux doivent etre dans <ResizablePanelGroup>")
  return ctx
}

type ResizablePanelProps = React.ComponentProps<"div"> & {
  /** taille de départ en % */
  defaultSize?: number
  minSize?: number
  maxSize?: number
  /** injecté par le groupe, pas besoin de le passer */
  index?: number
}

type ResizableHandleProps = React.ComponentProps<"div"> & {
  withHandle?: boolean
  index?: number
}

const isPanel = (el: React.ReactNode): el is React.ReactElement<ResizablePanelProps> =>
  React.isValidElement(el) && el.type === ResizablePanel
const isHandle = (el: React.ReactNode): el is React.ReactElement<ResizableHandleProps> =>
  React.isValidElement(el) && el.type === ResizableHandle

function initialSizes(configs: PanelConfig[]) {
  const fixed = configs.reduce((sum, c) => sum + (c.defaultSize ?? 0), 0)
  const free = configs.filter((c) => c.defaultSize === undefined).length
  return configs.map((c) => c.defaultSize ?? Math.max(0, (100 - fixed) / Math.max(free, 1)))
}

type ResizablePanelGroupProps = React.ComponentProps<"div"> & {
  direction?: Direction
  onLayout?: (sizes: number[]) => void
}

function ResizablePanelGroup({ direction = "horizontal", onLayout, className, children, ...props }: ResizablePanelGroupProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  // on lit les panneaux ds l'ordre des enfants pr savoir qui est voisin de qui
  const configs = React.useMemo(() => {
    const out: PanelConfig[] = []
    React.Children.forEach(children, (child) => {
      if (isPanel(child)) {
        const { defaultSize, minSize = 0, maxSize = 100 } = child.props
        out.push({ defaultSize, minSize, maxSize })
      }
    })
    return out
  }, [children])

  const defaults = React.useMemo(() => initialSizes(configs), [configs])
  const [sizes, setSizes] = React.useState(defaults)
  const [dragging, setDragging] = React.useState<number | null>(null)
  const sizesRef = React.useRef(sizes)
  sizesRef.current = sizes

  React.useEffect(() => {
    if (sizesRef.current.length !== defaults.length) setSizes(defaults)
  }, [defaults])

  const update = React.useCallback(
    (next: number[]) => {
      sizesRef.current = next
      setSizes(next)
      onLayout?.(next)
    },
    [onLayout]
  )

  // déplace la frontiere entre le panneau i et i+1, en respectant les min max des deux
  const resize = React.useCallback(
    (i: number, base: number[], delta: number) => {
      const a = configs[i]
      const b = configs[i + 1]
      if (!a || !b) return base
      const total = base[i] + base[i + 1]
      let left = base[i] + delta
      left = Math.max(a.minSize, total - b.maxSize, Math.min(a.maxSize, total - b.minSize, left))
      const next = [...base]
      next[i] = left
      next[i + 1] = total - left
      return next
    },
    [configs]
  )

  const startDrag = React.useCallback(
    (i: number, e: React.PointerEvent) => {
      const el = ref.current
      if (!el) return
      e.preventDefault()
      const rect = el.getBoundingClientRect()
      const length = direction === "horizontal" ? rect.width : rect.height
      const start = direction === "horizontal" ? e.clientX : e.clientY
      const base = sizesRef.current
      setDragging(i)
      document.body.style.cursor = direction === "horizontal" ? "col-resize" : "row-resize"
      document.body.style.userSelect = "none"

      const move = (ev: PointerEvent) => {
        const pos = direction === "horizontal" ? ev.clientX : ev.clientY
        update(resize(i, base, ((pos - start) / length) * 100))
      }
      const up = () => {
        setDragging(null)
        document.body.style.cursor = ""
        document.body.style.userSelect = ""
        window.removeEventListener("pointermove", move)
        window.removeEventListener("pointerup", up)
      }
      window.addEventListener("pointermove", move)
      window.addEventListener("pointerup", up)
    },
    [direction, resize, update]
  )

  const nudge = React.useCallback((i: number, delta: number) => update(resize(i, sizesRef.current, delta)), [resize, update])

  const reset = React.useCallback(
    (i: number) => {
      const next = [...sizesRef.current]
      next[i] = defaults[i]
      next[i + 1] = defaults[i + 1]
      // on redistribue l'écart si les autres panneaux ont bougé entre temps
      const diff = 100 - next.reduce((s, v) => s + v, 0)
      next[i + 1] += diff
      update(next)
    },
    [defaults, update]
  )

  let panelIndex = 0
  const enhanced = React.Children.map(children, (child) => {
    if (isPanel(child)) return React.cloneElement(child, { index: panelIndex++ })
    if (isHandle(child)) return React.cloneElement(child, { index: panelIndex - 1 })
    return child
  })

  return (
    <GroupContext.Provider value={{ direction, sizes, dragging, startDrag, nudge, reset }}>
      <div
        ref={ref}
        data-slot="resizable-panel-group"
        data-direction={direction}
        data-dragging={dragging !== null || undefined}
        className={cn("flex size-full", direction === "vertical" && "flex-col", className)}
        {...props}
      >
        {enhanced}
      </div>
    </GroupContext.Provider>
  )
}

function ResizablePanel({ index = 0, defaultSize, minSize, maxSize, className, style, ...props }: ResizablePanelProps) {
  const { sizes, dragging } = useGroup()
  const size = sizes[index] ?? defaultSize ?? 50
  return (
    <div
      data-slot="resizable-panel"
      data-size={Math.round(size)}
      style={{ flex: `${size} 1 0px`, ...style }}
      className={cn(
        "min-h-0 min-w-0 overflow-hidden",
        // transition qd on reset au double clic, coupée pdt le drag sinon ça traine derrière la souris
        dragging === null && "transition-[flex-grow] duration-500 ease-out-expo",
        className
      )}
      {...props}
    />
  )
}

function ResizableHandle({ index = 0, withHandle = false, className, ...props }: ResizableHandleProps) {
  const { direction, sizes, dragging, startDrag, nudge, reset } = useGroup()
  const horizontal = direction === "horizontal"
  const active = dragging === index

  return (
    <div
      role="separator"
      tabIndex={0}
      aria-orientation={horizontal ? "vertical" : "horizontal"}
      aria-valuenow={Math.round(sizes[index] ?? 0)}
      aria-valuemin={0}
      aria-valuemax={100}
      data-slot="resizable-handle"
      data-active={active || undefined}
      onPointerDown={(e) => startDrag(index, e)}
      onDoubleClick={() => reset(index)}
      onKeyDown={(e) => {
        const step = e.shiftKey ? 10 : 2
        const back = horizontal ? "ArrowLeft" : "ArrowUp"
        const fwd = horizontal ? "ArrowRight" : "ArrowDown"
        if (e.key === back) nudge(index, -step)
        else if (e.key === fwd) nudge(index, step)
        else if (e.key === "Home") nudge(index, -100)
        else if (e.key === "End") nudge(index, 100)
        else if (e.key === "Enter") reset(index)
        else return
        e.preventDefault()
      }}
      className={cn(
        "group/handle relative flex shrink-0 items-center justify-center bg-border outline-none",
        "transition-colors duration-200 hover:bg-foreground/25 data-[active]:bg-brand focus-visible:bg-brand",
        // zone de prise plus large que le trait, sinon faut viser au pixel près
        horizontal
          ? "w-px cursor-col-resize after:absolute after:inset-y-0 after:-left-1.5 after:w-3"
          : "h-px cursor-row-resize after:absolute after:inset-x-0 after:-top-1.5 after:h-3",
        className
      )}
      {...props}
    >
      {withHandle && (
        <span
          className={cn(
            "z-10 flex items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm",
            "transition-[transform,translate,scale,rotate,color,border-color] duration-300 ease-out-expo group-hover/handle:scale-110 group-hover/handle:text-foreground group-data-[active]/handle:scale-110 group-data-[active]/handle:border-brand group-data-[active]/handle:text-brand",
            horizontal ? "h-6 w-3.5" : "h-3.5 w-6 [&_svg]:rotate-90"
          )}
        >
          <GripVertical className="size-3" />
        </span>
      )}
    </div>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
