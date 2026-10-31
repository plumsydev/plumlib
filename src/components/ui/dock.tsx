"use client"

import * as React from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"
import { cn } from "@/lib/utils"

type DockContextValue = {
  mouseX: MotionValue<number>
  size: number
  magnification: number
  distance: number
  reduce: boolean
}

const DockContext = React.createContext<DockContextValue | null>(null)

function useDock() {
  const ctx = React.useContext(DockContext)
  if (!ctx) throw new Error("DockItem doit être dans un Dock")
  return ctx
}

type DockProps = React.ComponentProps<"div"> & {
  /** taille des icônes au repos, en px */
  size?: number
  /** taille max sous le curseur, en px */
  magnification?: number
  /** rayon d'influence du curseur, en px */
  distance?: number
}

function Dock({ size = 40, magnification = 64, distance = 140, className, children, ...props }: DockProps) {
  const mouseX = useMotionValue(Infinity)
  const reduce = !!useReducedMotion()

  return (
    <DockContext.Provider value={{ mouseX, size, magnification, distance, reduce }}>
      <div
        role="toolbar"
        data-slot="dock"
        onPointerMove={(e) => e.pointerType === "mouse" && mouseX.set(e.clientX)}
        onPointerLeave={() => mouseX.set(Infinity)}
        // hauteur figée, les icônes grandissent vers le haut sans pousser la page
        style={{ height: size + 16 }}
        className={cn(
          "mx-auto flex w-fit items-end gap-2 rounded-2xl border bg-background/70 px-2 pb-2 shadow-lg backdrop-blur-xl dark:bg-card/70",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </DockContext.Provider>
  )
}

type DockItemProps = Omit<React.ComponentProps<typeof motion.button>, "children"> & {
  label: string
  active?: boolean
  /** petite pastille de notif en haut à droite */
  badge?: React.ReactNode
  children: React.ReactNode
}

function DockItem({ label, active = false, badge, className, children, ...props }: DockItemProps) {
  const { mouseX, size, magnification, distance, reduce } = useDock()
  const ref = React.useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = React.useState(false)

  const offset = useTransform(mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect()
    return r ? x - r.left - r.width / 2 : Infinity
  })
  const target = useTransform(offset, [-distance, 0, distance], [size, reduce ? size : magnification, size])
  const width = useSpring(target, { mass: 0.1, stiffness: 170, damping: 13 })
  const iconSize = useTransform(width, (w) => w * 0.5)

  return (
    <motion.button
      ref={ref}
      type="button"
      data-slot="dock-item"
      data-active={active || undefined}
      aria-label={label}
      aria-pressed={active}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{ width, height: width }}
      whileTap={{ scale: 0.92 }}
      className={cn(
        "relative flex shrink-0 cursor-pointer items-center justify-center rounded-[28%] border bg-gradient-to-b from-background to-muted text-foreground shadow-sm outline-none",
        "focus-visible:ring-[3px] focus-visible:ring-ring dark:from-accent dark:to-muted",
        className
      )}
      {...props}
    >
      <motion.span style={{ width: iconSize, height: iconSize }} className="flex items-center justify-center [&_svg]:size-full">
        {children}
      </motion.span>

      <AnimatePresence>
        {hovered && (
          <motion.span
            role="tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.9, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 2, scale: 0.95, x: "-50%" }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="pointer-events-none absolute -top-9 left-1/2 rounded-md border bg-popover px-2 py-1 text-xs font-medium whitespace-nowrap text-popover-foreground shadow-md"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      {badge != null && (
        <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-white tabular-nums">
          {badge}
        </span>
      )}

      <AnimatePresence>
        {active && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="absolute -bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-foreground/70"
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}

function DockSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return <div role="separator" aria-orientation="vertical" data-slot="dock-separator" className={cn("mb-1 h-3/5 w-px self-center bg-border", className)} {...props} />
}

export { Dock, DockItem, DockSeparator, type DockProps, type DockItemProps }
