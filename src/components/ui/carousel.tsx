"use client"

import * as React from "react"
import { animate, motion, useAnimationFrame, useMotionValue, type MotionValue, type PanInfo } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

type CarouselContextValue = {
  index: number
  count: number
  canPrev: boolean
  canNext: boolean
  scrollTo: (index: number) => void
  prev: () => void
  next: () => void
  x: MotionValue<number>
  progress: MotionValue<number>
  autoplay?: number
  paused: boolean
  setPaused: (paused: boolean) => void
  trackRef: React.RefObject<HTMLDivElement | null>
  max: number
  measure: () => void
  dragging: React.RefObject<boolean>
  snapFromDrag: (info: PanInfo) => void
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

function useCarousel() {
  const ctx = React.useContext(CarouselContext)
  if (!ctx) throw new Error("useCarousel doit etre utilisé dans <Carousel>")
  return ctx
}

type CarouselProps = React.ComponentProps<"div"> & {
  /** revient au début après la dernière slide (et inversement) */
  loop?: boolean
  /** délai entre deux slides en ms, en pause au survol et au focus */
  autoplay?: number
  defaultIndex?: number
  onIndexChange?: (index: number) => void
}

const snapSpring = { type: "spring", stiffness: 320, damping: 36, mass: 0.9 } as const

function Carousel({ loop = false, autoplay, defaultIndex = 0, onIndexChange, className, children, ...props }: CarouselProps) {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const progress = useMotionValue(0)
  const [snaps, setSnaps] = React.useState<number[]>([0])
  const [max, setMax] = React.useState(0)
  const [index, setIndex] = React.useState(defaultIndex)
  const [paused, setPaused] = React.useState(false)
  const dragging = React.useRef(false)
  const indexRef = React.useRef(index)
  indexRef.current = index
  const snapsRef = React.useRef(snaps)
  snapsRef.current = snaps

  const count = snaps.length

  const scrollTo = React.useCallback(
    (target: number, instant = false) => {
      const list = snapsRef.current
      const i = Math.max(0, Math.min(list.length - 1, target))
      setIndex(i)
      progress.set(0)
      if (i !== indexRef.current) onIndexChange?.(i)
      if (instant) x.set(-list[i])
      else animate(x, -list[i], snapSpring)
    },
    [onIndexChange, progress, x]
  )

  // on mesure les positions de snap à partir des slides réelles, ça marche avec n'importe quelle largeur
  const measure = React.useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const items = Array.from(track.children) as HTMLElement[]
    const limit = Math.max(0, track.scrollWidth - track.clientWidth)
    const raw = items.map((el) => Math.min(el.offsetLeft, limit))
    const filtered = raw.filter((v, i) => i === 0 || Math.abs(v - raw[i - 1]) > 1)
    const unique = filtered.length ? filtered : [0]
    setMax(limit)
    // on évite un rerender pr rien si les snaps ont pas bougé
    if (unique.length !== snapsRef.current.length || unique.some((v, i) => v !== snapsRef.current[i])) setSnaps(unique)
    snapsRef.current = unique
    const i = Math.min(indexRef.current, snapsRef.current.length - 1)
    x.set(-snapsRef.current[i])
  }, [x])

  const prev = React.useCallback(() => {
    const i = indexRef.current
    if (i > 0) scrollTo(i - 1)
    else if (loop) scrollTo(snapsRef.current.length - 1)
  }, [loop, scrollTo])

  const next = React.useCallback(() => {
    const i = indexRef.current
    if (i < snapsRef.current.length - 1) scrollTo(i + 1)
    else if (loop) scrollTo(0)
  }, [loop, scrollTo])

  // on projette la position avec la vitesse du geste puis on prend le snap le plus proche
  const snapFromDrag = React.useCallback(
    (info: PanInfo) => {
      const list = snapsRef.current
      const projected = -(x.get() + info.velocity.x * 0.22)
      let best = 0
      list.forEach((s, i) => {
        if (Math.abs(s - projected) < Math.abs(list[best] - projected)) best = i
      })
      // un petit swipe franc doit quand meme changer de slide
      if (best === indexRef.current && Math.abs(info.offset.x) > 40) {
        best += info.offset.x < 0 ? 1 : -1
      }
      scrollTo(best)
    },
    [scrollTo, x]
  )

  useAnimationFrame((_, delta) => {
    if (!autoplay || paused || dragging.current) return
    const p = progress.get() + delta / autoplay
    if (p >= 1) {
      progress.set(0)
      next()
    } else progress.set(p)
  })

  const ctx: CarouselContextValue = {
    index,
    count,
    canPrev: loop || index > 0,
    canNext: loop || index < count - 1,
    scrollTo,
    prev,
    next,
    x,
    progress,
    autoplay,
    paused,
    setPaused,
    trackRef,
    max,
    measure,
    dragging,
    snapFromDrag,
  }

  return (
    <CarouselContext.Provider value={ctx}>
      <div
        data-slot="carousel"
        role="region"
        aria-roledescription="carousel"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setPaused(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault()
            prev()
          } else if (e.key === "ArrowRight") {
            e.preventDefault()
            next()
          }
        }}
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, children, ...props }: React.ComponentProps<typeof motion.div>) {
  const { x, trackRef, max, measure, dragging, snapFromDrag } = useCarousel()
  const moved = React.useRef(0)

  React.useLayoutEffect(() => {
    measure()
    const track = trackRef.current
    if (!track) return
    const ro = new ResizeObserver(() => measure())
    ro.observe(track)
    Array.from(track.children).forEach((c) => ro.observe(c))
    return () => ro.disconnect()
  }, [measure, trackRef, children])

  return (
    <div data-slot="carousel-viewport" className="overflow-hidden rounded-[inherit]" tabIndex={0} aria-live="polite">
      <motion.div
        ref={trackRef}
        data-slot="carousel-content"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -max, right: 0 }}
        dragElastic={0.14}
        dragMomentum={false}
        onDragStart={() => {
          dragging.current = true
          moved.current = 0
        }}
        onDrag={(_, info) => (moved.current = Math.abs(info.offset.x))}
        onDragEnd={(_, info) => {
          dragging.current = false
          snapFromDrag(info)
        }}
        // si on a glissé on bloque le clic, sinon on ouvre le lien sous le doigt sans faire exprès
        onClickCapture={(e) => {
          if (moved.current > 6) {
            e.preventDefault()
            e.stopPropagation()
          }
        }}
        className={cn("relative -ml-4 flex cursor-grab touch-pan-y select-none active:cursor-grabbing", className)}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="carousel-item"
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4 [&_img]:pointer-events-none", className)}
      {...props}
    />
  )
}

function CarouselPrevious({ className, variant = "outline", size = "icon-sm", ...props }: ButtonProps) {
  const { prev, canPrev } = useCarousel()
  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      onClick={prev}
      disabled={!canPrev}
      aria-label="Previous slide"
      className={cn("rounded-full", className)}
      {...props}
    >
      <ChevronLeft />
    </Button>
  )
}

function CarouselNext({ className, variant = "outline", size = "icon-sm", ...props }: ButtonProps) {
  const { next, canNext } = useCarousel()
  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      onClick={next}
      disabled={!canNext}
      aria-label="Next slide"
      className={cn("rounded-full", className)}
      {...props}
    >
      <ChevronRight />
    </Button>
  )
}

function CarouselDots({ className, ...props }: React.ComponentProps<"div">) {
  const { count, index, scrollTo, progress, autoplay } = useCarousel()
  return (
    <div data-slot="carousel-dots" role="tablist" className={cn("flex items-center justify-center gap-1.5", className)} {...props}>
      {Array.from({ length: count }, (_, i) => {
        const active = i === index
        return (
          <motion.button
            key={i}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => scrollTo(i)}
            animate={{ width: active ? 24 : 6 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={cn(
              "relative h-1.5 cursor-pointer overflow-hidden rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring",
              active ? "bg-foreground/20" : "bg-foreground/20 hover:bg-foreground/40"
            )}
          >
            {/* avec l'autoplay la pastille active se remplit comme une story insta */}
            {active && (
              <motion.span
                className="absolute inset-0 origin-left rounded-full bg-foreground"
                style={autoplay ? { scaleX: progress } : undefined}
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots, useCarousel, type CarouselProps }
