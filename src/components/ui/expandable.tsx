"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, MotionConfig, motion, type HTMLMotionProps, type Transition } from "motion/react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type ExpandableContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  id: string
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

const ExpandableContext = React.createContext<ExpandableContextValue | null>(null)

function useExpandable() {
  const ctx = React.useContext(ExpandableContext)
  if (!ctx) throw new Error("Expandable parts must be used inside <Expandable>")
  return ctx
}

const morph: Transition = { type: "spring", bounce: 0.12, duration: 0.5 }

function Expandable({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  transition = morph,
}: {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  transition?: Transition
}) {
  const [inner, setInner] = React.useState(defaultOpen)
  const open = openProp ?? inner
  const id = React.useId()
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  const setOpen = React.useCallback(
    (value: boolean) => {
      if (openProp === undefined) setInner(value)
      onOpenChange?.(value)
    },
    [openProp, onOpenChange]
  )

  return (
    <ExpandableContext.Provider value={{ open, setOpen, id, triggerRef }}>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </ExpandableContext.Provider>
  )
}

function ExpandableTrigger({ className, children, style, ...props }: HTMLMotionProps<"button">) {
  const { setOpen, id, triggerRef, open } = useExpandable()
  return (
    <motion.button
      ref={triggerRef}
      type="button"
      data-slot="expandable-trigger"
      layoutId={`${id}-card`}
      aria-haspopup="dialog"
      aria-expanded={open}
      onClick={() => setOpen(true)}
      // le radius en style inline pr que motion le corrige pendant le morph, sinon les coins se déforment
      style={{ borderRadius: 16, ...style }}
      className={cn(
        "group/expandable relative flex cursor-pointer flex-col overflow-hidden border bg-card text-left text-card-foreground shadow-xs",
        "outline-none transition-shadow hover:shadow-lg focus-visible:ring-[3px] focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}

function ExpandableContent({ className, children, style, ...props }: HTMLMotionProps<"div">) {
  const { open, setOpen, id, triggerRef } = useExpandable()
  const ref = React.useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
      // piège à focus du pauvre mais efficace : tab boucle ds la carte
      if (e.key === "Tab" && ref.current) {
        const focusables = ref.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (!first) return
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKey)
    const t = setTimeout(() => ref.current?.focus(), 30)
    const trigger = triggerRef.current
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener("keydown", onKey)
      clearTimeout(t)
      trigger?.focus({ preventScroll: true })
    }
  }, [open, setOpen, triggerRef])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            data-slot="expandable-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-overlay backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-title`}
            tabIndex={-1}
            data-slot="expandable-content"
            layoutId={`${id}-card`}
            style={{ borderRadius: 24, ...style }}
            className={cn(
              "relative flex max-h-[calc(100dvh-2rem)] w-full max-w-lg flex-col overflow-hidden border bg-popover text-popover-foreground shadow-xl outline-none",
              className
            )}
            {...props}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}

// éléments partagés : même layoutId des 2 cotés => ils morphent entre la carte et la vue détaillée
function ExpandableImage({ className, alt, ...props }: HTMLMotionProps<"img"> & { alt: string }) {
  const { id } = useExpandable()
  return <motion.img data-slot="expandable-image" layoutId={`${id}-image`} alt={alt} className={cn("w-full object-cover", className)} {...props} />
}

function ExpandableMedia({ className, ...props }: HTMLMotionProps<"div">) {
  const { id } = useExpandable()
  return <motion.div data-slot="expandable-media" layoutId={`${id}-media`} className={cn("relative w-full overflow-hidden", className)} {...props} />
}

function ExpandableTitle({ className, ...props }: HTMLMotionProps<"div">) {
  const { id, open } = useExpandable()
  return (
    <motion.div
      data-slot="expandable-title"
      layoutId={`${id}-title-el`}
      // position seulement, sinon le texte s'étire pendant le morph
      layout="position"
      // l'id ne va que sur la version ouverte, celle que le dialog référence
      id={open ? `${id}-title` : undefined}
      className={cn("font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

function ExpandableSubtitle({ className, ...props }: HTMLMotionProps<"div">) {
  const { id } = useExpandable()
  return <motion.div data-slot="expandable-subtitle" layoutId={`${id}-subtitle`} layout="position" className={cn("text-sm text-muted-foreground", className)} {...props} />
}

// contenu qui n'existe que ds la vue ouverte, il arrive après le morph
function ExpandableDescription({ className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      data-slot="expandable-description"
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { delay: 0.15, duration: 0.35 } }}
      exit={{ opacity: 0, y: 6, transition: { duration: 0.1 } }}
      className={cn("text-sm leading-6 text-muted-foreground", className)}
      {...props}
    />
  )
}

function ExpandableClose({ className, ...props }: HTMLMotionProps<"button">) {
  const { setOpen } = useExpandable()
  return (
    <motion.button
      type="button"
      data-slot="expandable-close"
      aria-label="Close"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
      exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.1 } }}
      onClick={() => setOpen(false)}
      className={cn(
        "absolute top-3 right-3 z-10 inline-flex size-8 cursor-pointer items-center justify-center rounded-full bg-background/70 text-foreground shadow-sm backdrop-blur",
        "transition-colors outline-none hover:bg-background focus-visible:ring-[3px] focus-visible:ring-ring [&_svg]:size-4",
        className
      )}
      {...props}
    >
      <X />
    </motion.button>
  )
}

export {
  Expandable,
  ExpandableClose,
  ExpandableContent,
  ExpandableDescription,
  ExpandableImage,
  ExpandableMedia,
  ExpandableSubtitle,
  ExpandableTitle,
  ExpandableTrigger,
  useExpandable,
}
