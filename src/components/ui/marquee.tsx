"use client"

import * as React from "react"
import { useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

type MarqueeProps = React.ComponentProps<"div"> & {
  /** vitesse en px par seconde */
  speed?: number
  reverse?: boolean
  vertical?: boolean
  /** ralentit en douceur jusqu'à l'arrêt au survol */
  pauseOnHover?: boolean
  /** fondu sur les bords */
  fade?: boolean
  /** nb de copies du contenu, augmente si le contenu est plus court que le conteneur */
  repeat?: number
}

function Marquee({
  speed = 40,
  reverse = false,
  vertical = false,
  pauseOnHover = true,
  fade = true,
  repeat = 4,
  className,
  children,
  ...props
}: MarqueeProps) {
  const root = React.useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const animations = React.useRef<Animation[]>([])
  const rateFrame = React.useRef(0)

  React.useEffect(() => {
    const el = root.current
    if (!el || reduce) return

    const build = () => {
      animations.current.forEach((a) => a.cancel())
      const groups = Array.from(el.querySelectorAll<HTMLElement>("[data-marquee-group]"))
      const first = groups[0]
      if (!first) return
      const gap = parseFloat(getComputedStyle(el)[vertical ? "rowGap" : "columnGap"]) || 0
      const size = vertical ? first.offsetHeight : first.offsetWidth
      const axis = vertical ? "translateY" : "translateX"
      // waapi tourne sur le compositor, zéro rerender react et ça reste à 60fps
      const keyframes = [{ transform: `${axis}(0)` }, { transform: `${axis}(calc(-100% - ${gap}px))` }]
      animations.current = groups.map((g) =>
        g.animate(keyframes, {
          duration: ((size + gap) / speed) * 1000,
          iterations: Infinity,
          direction: reverse ? "reverse" : "normal",
        })
      )
    }

    build()
    const ro = new ResizeObserver(build)
    ro.observe(el)
    return () => {
      ro.disconnect()
      animations.current.forEach((a) => a.cancel())
      animations.current = []
    }
  }, [speed, reverse, vertical, reduce, repeat])

  // on tween le playbackRate au lieu de pause sec, ça freine comme un vrai tapis
  const easeRate = (target: number) => {
    cancelAnimationFrame(rateFrame.current)
    const step = () => {
      let settled = true
      animations.current.forEach((a) => {
        const next = a.playbackRate + (target - a.playbackRate) * 0.12
        a.playbackRate = Math.abs(next - target) < 0.01 ? target : next
        if (a.playbackRate !== target) settled = false
      })
      if (!settled) rateFrame.current = requestAnimationFrame(step)
    }
    rateFrame.current = requestAnimationFrame(step)
  }

  React.useEffect(() => () => cancelAnimationFrame(rateFrame.current), [])

  const mask = vertical
    ? "linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)"
    : "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)"

  return (
    <div
      ref={root}
      data-slot="marquee"
      onPointerEnter={() => pauseOnHover && easeRate(0)}
      onPointerLeave={() => pauseOnHover && easeRate(1)}
      className={cn(
        "flex gap-(--gap) [--gap:1rem]",
        vertical ? "flex-col overflow-hidden" : "flex-row overflow-hidden",
        reduce && (vertical ? "overflow-y-auto" : "overflow-x-auto"),
        className
      )}
      style={fade ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
      {...props}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          data-marquee-group
          aria-hidden={i > 0 || undefined}
          className={cn("flex shrink-0 gap-(--gap) will-change-transform", vertical ? "flex-col" : "flex-row")}
        >
          {children}
        </div>
      ))}
    </div>
  )
}

export { Marquee, type MarqueeProps }
