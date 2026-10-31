"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"

type ToastType = "default" | "success" | "error" | "info" | "warning" | "loading"
type ToastId = string | number

type ToastOptions = {
  id?: ToastId
  description?: React.ReactNode
  action?: { label: string; onClick: () => void }
  cancel?: { label: string; onClick?: () => void }
  /** remplace l'icone du type */
  icon?: React.ReactNode
  closeButton?: boolean
  /** cible un <Toaster id="..."> précis qd y en a plusieurs */
  toasterId?: string
  /** ms avant fermeture, Infinity pr la garder */
  duration?: number
  dismissible?: boolean
  onDismiss?: () => void
}

type ToastData = ToastOptions & { id: ToastId; type: ToastType; title: React.ReactNode }

type PromiseMessages<T> = {
  loading: React.ReactNode
  success: React.ReactNode | ((data: T) => React.ReactNode)
  error: React.ReactNode | ((error: unknown) => React.ReactNode)
  description?: React.ReactNode
}

// le store global, minuscule mais ça suffit largement
let toasts: ToastData[] = []
let counter = 0
const listeners = new Set<() => void>()
const emptyToasts: ToastData[] = []

function emit() {
  listeners.forEach((l) => l())
}

function upsert(data: ToastData) {
  const exists = toasts.some((t) => t.id === data.id)
  toasts = exists ? toasts.map((t) => (t.id === data.id ? { ...t, ...data } : t)) : [data, ...toasts]
  emit()
  return data.id
}

function dismiss(id?: ToastId) {
  const leaving = id === undefined ? toasts : toasts.filter((t) => t.id === id)
  leaving.forEach((t) => t.onDismiss?.())
  toasts = id === undefined ? [] : toasts.filter((t) => t.id !== id)
  emit()
}

function create(type: ToastType) {
  return (title: React.ReactNode, options: ToastOptions = {}) =>
    upsert({ ...options, id: options.id ?? ++counter, type, title })
}

const toast = Object.assign(create("default"), {
  success: create("success"),
  error: create("error"),
  info: create("info"),
  warning: create("warning"),
  loading: create("loading"),
  dismiss,
  promise<T>(promise: Promise<T> | (() => Promise<T>), messages: PromiseMessages<T>, options: ToastOptions = {}) {
    const id = upsert({ ...options, id: options.id ?? ++counter, type: "loading", title: messages.loading, description: messages.description })
    const p = typeof promise === "function" ? promise() : promise
    p.then(
      (data) => {
        const title = typeof messages.success === "function" ? messages.success(data) : messages.success
        upsert({ ...options, id, type: "success", title, description: undefined })
      },
      (error) => {
        const title = typeof messages.error === "function" ? messages.error(error) : messages.error
        upsert({ ...options, id, type: "error", title, description: undefined })
      }
    )
    return p
  },
})

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function useToasts() {
  return React.useSyncExternalStore(
    subscribe,
    () => toasts,
    () => emptyToasts
  )
}

type Position = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"

const positionClasses: Record<Position, string> = {
  "top-left": "top-4 left-4 sm:top-6 sm:left-6",
  "top-center": "top-4 left-1/2 -translate-x-1/2 sm:top-6",
  "top-right": "top-4 right-4 sm:top-6 sm:right-6",
  "bottom-left": "bottom-4 left-4 sm:bottom-6 sm:left-6",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6",
  "bottom-right": "bottom-4 right-4 sm:bottom-6 sm:right-6",
}

const GAP = 10
const PEEK = 12

function Toaster({
  position = "bottom-right",
  visibleToasts = 3,
  duration = 4000,
  closeButton = false,
  richColors = false,
  expand = false,
  id,
  className,
}: {
  /** n'affiche que les toasts envoyés avec ce toasterId */
  id?: string
  position?: Position
  visibleToasts?: number
  duration?: number
  closeButton?: boolean
  /** fond teinté selon le type */
  richColors?: boolean
  /** toujours étalé, pas de pile */
  expand?: boolean
  className?: string
}) {
  const all = useToasts()
  const items = React.useMemo(() => all.filter((t) => t.toasterId === id), [all, id])
  const [hovered, setExpanded] = React.useState(false)
  const expanded = expand || hovered
  const [heights, setHeights] = React.useState<Record<ToastId, number>>({})
  const isTop = position.startsWith("top")
  const dir = isTop ? 1 : -1

  const setHeight = React.useCallback((id: ToastId, h: number) => {
    setHeights((prev) => (prev[id] === h ? prev : { ...prev, [id]: h }))
  }, [])

  // plus de toast => on replie sinon le prochain arrive déjà étalé c'est moche
  React.useEffect(() => {
    if (items.length === 0) setExpanded(false)
  }, [items.length])

  const frontHeight = items[0] ? heights[items[0].id] ?? 0 : 0
  const shown = items.slice(0, visibleToasts)
  const totalExpanded = shown.reduce((acc, t) => acc + (heights[t.id] ?? 0), 0) + GAP * Math.max(shown.length - 1, 0)
  const collapsedHeight = frontHeight + PEEK * Math.max(shown.length - 1, 0)

  return (
    <section aria-label="Notifications" aria-live="polite" className="pointer-events-none">
      <motion.ol
        data-slot="toaster"
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onFocus={() => setExpanded(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setExpanded(false)
        }}
        animate={{ height: items.length ? (expanded ? totalExpanded : collapsedHeight) : 0 }}
        transition={spring.smooth}
        className={cn(
          "fixed z-[100] w-[calc(100%-2rem)] sm:w-[22rem]",
          items.length && "pointer-events-auto",
          positionClasses[position],
          className
        )}
      >
        <AnimatePresence initial={false}>
          {items.map((t, index) => {
            const offset =
              items.slice(0, index).reduce((acc, prev) => acc + (heights[prev.id] ?? 0), 0) + GAP * index
            return (
              <ToastItem
                key={t.id}
                toast={t}
                index={index}
                visible={index < visibleToasts}
                expanded={expanded}
                isTop={isTop}
                y={(expanded ? offset : index * PEEK) * dir}
                frontHeight={frontHeight}
                defaultDuration={duration}
                closeButton={t.closeButton ?? closeButton}
                richColors={richColors}
                onHeight={setHeight}
              />
            )
          })}
        </AnimatePresence>
      </motion.ol>
    </section>
  )
}

const icons: Record<Exclude<ToastType, "default">, React.ReactNode> = {
  success: <CheckCircle2 className="size-4 text-success" />,
  error: <XCircle className="size-4 text-destructive" />,
  info: <Info className="size-4 text-info" />,
  warning: <AlertTriangle className="size-4 text-warning" />,
  loading: (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 animate-spin text-muted-foreground" aria-hidden>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path d="M14.5 8A6.5 6.5 0 0 0 8 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
}

// fonds opaques sinon les cartes empilées se voient à travers
const richClasses: Record<ToastType, string> = {
  default: "",
  loading: "",
  success: "border-success/30 bg-[color-mix(in_oklch,var(--success)_10%,var(--popover))] [&_[data-title]]:text-success",
  error: "border-destructive/30 bg-[color-mix(in_oklch,var(--destructive)_10%,var(--popover))] [&_[data-title]]:text-destructive",
  info: "border-info/30 bg-[color-mix(in_oklch,var(--info)_10%,var(--popover))] [&_[data-title]]:text-info",
  warning: "border-warning/35 bg-[color-mix(in_oklch,var(--warning)_12%,var(--popover))] [&_[data-title]]:text-warning",
}

function ToastItem({
  toast: t,
  index,
  visible,
  expanded,
  isTop,
  y,
  frontHeight,
  defaultDuration,
  closeButton,
  richColors,
  onHeight,
}: {
  toast: ToastData
  index: number
  visible: boolean
  expanded: boolean
  isTop: boolean
  y: number
  frontHeight: number
  defaultDuration: number
  closeButton: boolean
  richColors: boolean
  onHeight: (id: ToastId, h: number) => void
}) {
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [height, setHeight] = React.useState(0)
  const [swipe, setSwipe] = React.useState(0)
  const isFront = index === 0
  const duration = t.type === "loading" ? Infinity : t.duration ?? defaultDuration
  const dismissible = t.dismissible ?? t.type !== "loading"

  React.useLayoutEffect(() => {
    const el = contentRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const h = el.offsetHeight
      setHeight(h)
      onHeight(t.id, h)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [t.id, onHeight])

  // timer qui se met en pause qd on survole, sinon tu lis pas la moitié
  const remaining = React.useRef(duration)
  React.useEffect(() => {
    remaining.current = duration
  }, [duration, t.type, t.title])

  React.useEffect(() => {
    if (expanded || !Number.isFinite(remaining.current)) return
    const start = Date.now()
    const timer = setTimeout(() => dismiss(t.id), remaining.current)
    return () => {
      clearTimeout(timer)
      remaining.current -= Date.now() - start
    }
  }, [expanded, t.id, t.type, t.title, duration])

  const collapsedBack = !expanded && !isFront

  return (
    <motion.li
      data-slot="toast"
      data-type={t.type}
      data-front={isFront}
      role="status"
      initial={{ opacity: 0, y: isTop ? -48 : 48, scale: 0.96 }}
      animate={{
        opacity: visible ? 1 : 0,
        y,
        scale: expanded ? 1 : 1 - index * 0.05,
        height: collapsedBack ? frontHeight : height || "auto",
      }}
      exit={
        swipe
          ? { opacity: 0, x: swipe * 360, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }
          : { opacity: 0, scale: 0.92, y: y + (isTop ? -16 : 16), transition: { duration: 0.2 } }
      }
      transition={spring.smooth}
      drag={dismissible ? "x" : false}
      dragSnapToOrigin
      dragElastic={0.6}
      onDragEnd={(_, info) => {
        // swipe assez loin ou assez vite => ciao
        if (Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 600) {
          setSwipe(Math.sign(info.offset.x) || 1)
          requestAnimationFrame(() => dismiss(t.id))
        }
      }}
      style={{ zIndex: 100 - index, transformOrigin: isTop ? "bottom center" : "top center" }}
      className={cn(
        "group/toast absolute inset-x-0 cursor-grab touch-pan-y overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-lg active:cursor-grabbing",
        richColors && richClasses[t.type],
        isTop ? "top-0" : "bottom-0",
        !visible && "pointer-events-none"
      )}
    >
      <div
        ref={contentRef}
        className={cn(
          "flex items-start gap-3 p-4 transition-opacity duration-200",
          // les cartes du fond gardent juste leur silhouette
          collapsedBack && "opacity-0",
          isTop ? "" : "absolute inset-x-0 bottom-0"
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {(t.icon || t.type !== "default") && (
            <motion.span
              key={t.icon ? "custom" : t.type}
              initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
              transition={spring.bouncy}
              className="mt-0.5 flex shrink-0"
            >
              {t.icon ?? icons[t.type as Exclude<ToastType, "default">]}
            </motion.span>
          )}
        </AnimatePresence>
        <div className="min-w-0 flex-1">
          <div data-title className="text-sm leading-5 font-medium">{t.title}</div>
          {t.description && <div className="mt-0.5 text-[0.8125rem] leading-5 text-muted-foreground">{t.description}</div>}
        </div>
        {t.cancel && (
          <button
            type="button"
            onClick={() => {
              t.cancel?.onClick?.()
              dismiss(t.id)
            }}
            className="h-7 shrink-0 cursor-pointer rounded-md px-2.5 text-xs font-medium text-muted-foreground transition-[background-color,color,transform,translate,scale,rotate] hover:bg-accent hover:text-foreground active:scale-95"
          >
            {t.cancel.label}
          </button>
        )}
        {t.action && (
          <button
            type="button"
            onClick={() => {
              t.action?.onClick()
              dismiss(t.id)
            }}
            className="h-7 shrink-0 cursor-pointer rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground transition-[background-color,transform,translate,scale,rotate] hover:bg-primary/88 active:scale-95"
          >
            {t.action.label}
          </button>
        )}
        {closeButton && dismissible && (
          <button
            type="button"
            aria-label="Close notification"
            onClick={() => dismiss(t.id)}
            className="-mr-1 -mt-1 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground opacity-0 transition-[opacity,background-color] hover:bg-accent hover:text-foreground focus-visible:opacity-100 group-hover/toast:opacity-100"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
    </motion.li>
  )
}

export { toast, Toaster, type ToastOptions, type ToastType }
