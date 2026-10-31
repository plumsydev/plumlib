"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

type BorderBeamProps = {
  /** longueur du faisceau en px */
  size?: number
  /** durée d'un tour, en secondes */
  duration?: number
  delay?: number
  borderWidth?: number
  colorFrom?: string
  colorTo?: string
  reverse?: boolean
  className?: string
}

/** à poser ds un parent relative + rounded, le faisceau suit son contour */
function BorderBeam({
  size = 80,
  duration = 6,
  delay = 0,
  borderWidth = 1,
  colorFrom = "var(--foreground)",
  colorTo = "transparent",
  reverse = false,
  className,
}: BorderBeamProps) {
  const reduce = useReducedMotion()
  if (reduce) return null

  return (
    // le masque ne laisse voir que l'anneau de la bordure
    <div
      aria-hidden
      data-slot="border-beam"
      className="pointer-events-none absolute inset-0 rounded-[inherit]"
      style={{
        padding: borderWidth,
        maskImage: "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
        maskClip: "content-box, border-box",
        maskComposite: "exclude",
        WebkitMaskImage: "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
        WebkitMaskClip: "content-box, border-box",
        WebkitMaskComposite: "xor",
      }}
    >
      <motion.div
        className={cn("absolute aspect-square", className)}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          background: `linear-gradient(to left, ${colorFrom}, ${colorTo})`,
        }}
        initial={{ offsetDistance: reverse ? "100%" : "0%" }}
        animate={{ offsetDistance: reverse ? ["100%", "0%"] : ["0%", "100%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration, delay: -delay }}
      />
    </div>
  )
}

export { BorderBeam, type BorderBeamProps }
