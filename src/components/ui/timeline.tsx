"use client"

import * as React from "react"
import { motion, useScroll, useSpring } from "motion/react"
import { cn } from "@/lib/utils"
import { easeOutExpo } from "@/lib/motion"

type TimelineStatus = "done" | "current" | "upcoming"

const TimelineContext = React.createContext<{ animated: boolean }>({ animated: true })
const ItemContext = React.createContext<{ status: TimelineStatus }>({ status: "upcoming" })

type TimelineProps = React.ComponentProps<"ol"> & {
  /** la ligne se dessine au scroll et les items apparaissent en entrant ds l'écran */
  animated?: boolean
}

function Timeline({ className, children, animated = true, ...props }: TimelineProps) {
  const ref = React.useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] })
  // le ressort lisse le scroll à la molette qui est souvent saccadé
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })

  return (
    <TimelineContext.Provider value={{ animated }}>
      <ol ref={ref} data-slot="timeline" className={cn("relative grid gap-8", className)} {...props}>
        <span aria-hidden className="absolute top-2 bottom-2 left-[11.5px] w-px bg-border" />
        {/* sans anim on laisse les statuts parler, sinon la ligne pleine traverse les étapes à venir */}
        {animated && (
          <motion.span
            aria-hidden
            style={{ scaleY: fill }}
            className="absolute top-2 bottom-2 left-[11.5px] w-px origin-top bg-gradient-to-b from-foreground via-foreground to-brand"
          />
        )}
        {children}
      </ol>
    </TimelineContext.Provider>
  )
}

function TimelineItem({
  className,
  status = "done",
  children,
  ...props
}: React.ComponentProps<typeof motion.li> & { status?: TimelineStatus }) {
  const { animated } = React.useContext(TimelineContext)
  return (
    <ItemContext.Provider value={{ status }}>
      <motion.li
        data-slot="timeline-item"
        data-status={status}
        initial={animated ? { opacity: 0, x: -8, filter: "blur(4px)" } : false}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: easeOutExpo }}
        className={cn("relative grid grid-cols-[1.5rem_1fr] gap-x-4", className)}
        {...props}
      >
        {/* en mode statique chaque étape terminée colore son bout de ligne jusqu'à la suivante */}
        {!animated && (
          <span
            aria-hidden
            className={cn(
              "absolute top-7 -bottom-8 left-[11.5px] w-px origin-top transition-[transform,translate,scale,rotate,background-color] duration-500 ease-out-expo [li:last-child>&]:hidden",
              status === "done" ? "scale-y-100 bg-foreground" : "scale-y-0 bg-foreground"
            )}
          />
        )}
        {children as React.ReactNode}
      </motion.li>
    </ItemContext.Provider>
  )
}

function TimelineIndicator({ className, children, ...props }: React.ComponentProps<"span">) {
  const { status } = React.useContext(ItemContext)
  return (
    <span
      data-slot="timeline-indicator"
      data-status={status}
      className={cn(
        "relative z-10 mt-0.5 flex size-6 items-center justify-center rounded-full border bg-background text-muted-foreground [&_svg]:size-3",
        "data-[status=done]:border-foreground data-[status=done]:bg-foreground data-[status=done]:text-background",
        "data-[status=current]:border-brand data-[status=current]:text-brand",
        className
      )}
      {...props}
    >
      {children ??
        (status === "done" ? (
          <svg viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2.5 6.2 5 8.5l4.5-5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : status === "current" ? (
          <span className="size-2 rounded-full bg-brand" />
        ) : (
          <span className="size-1.5 rounded-full bg-muted-foreground/40" />
        ))}
      {/* l'étape en cours pulse doucement pr attirer l'oeil sans hurler */}
      {status === "current" && <span className="absolute inset-0 animate-ping rounded-full border border-brand opacity-40" />}
    </span>
  )
}

function TimelineContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="timeline-content" className={cn("min-w-0 space-y-1 pb-1", className)} {...props} />
}

function TimelineHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="timeline-header" className={cn("flex flex-wrap items-baseline justify-between gap-x-3", className)} {...props} />
}

function TimelineTitle({ className, ...props }: React.ComponentProps<"h3">) {
  const { status } = React.useContext(ItemContext)
  return (
    <h3
      data-slot="timeline-title"
      className={cn("text-sm font-medium", status === "upcoming" && "text-muted-foreground", className)}
      {...props}
    />
  )
}

function TimelineTime({ className, ...props }: React.ComponentProps<"time">) {
  return <time data-slot="timeline-time" className={cn("text-xs text-muted-foreground tabular-nums", className)} {...props} />
}

function TimelineDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="timeline-description" className={cn("text-sm leading-relaxed text-muted-foreground", className)} {...props} />
}

export {
  Timeline,
  TimelineItem,
  TimelineIndicator,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineTime,
  TimelineDescription,
  type TimelineStatus,
}
