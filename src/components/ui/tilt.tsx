"use client"

import * as React from "react"
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

type TiltProps = Omit<React.ComponentProps<typeof motion.div>, "children"> & {
  children?: React.ReactNode
  /** inclinaison max en degrés */
  max?: number
  /** zoom au survol */
  scale?: number
  /** reflet lumineux qui suit le curseur */
  glare?: boolean
  perspective?: number
}

const springConfig = { stiffness: 260, damping: 22, mass: 0.6 }

function Tilt({ max = 10, scale = 1.02, glare = true, perspective = 900, className, children, style, ...props }: TiltProps) {
  const reduce = useReducedMotion()
  // px et py vont de 0 à 1 sur la carte, 0.5 = centre
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const hover = useMotionValue(0)

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), springConfig)
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), springConfig)
  const s = useSpring(useTransform(hover, [0, 1], [1, scale]), springConfig)
  const glareOpacity = useSpring(hover, { stiffness: 200, damping: 30 })
  const gx = useTransform(px, (v) => `${v * 100}%`)
  const gy = useTransform(py, (v) => `${v * 100}%`)
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgb(255 255 255 / 0.16), transparent 55%)`

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }

  const reset = () => {
    px.set(0.5)
    py.set(0.5)
    hover.set(0)
  }

  return (
    <div data-slot="tilt-root" style={{ perspective }} className="inline-block">
      <motion.div
        data-slot="tilt"
        onPointerMove={onMove}
        onPointerEnter={() => !reduce && hover.set(1)}
        onPointerLeave={reset}
        onPointerCancel={reset}
        style={{ rotateX, rotateY, scale: s, transformStyle: "preserve-3d", ...style }}
        className={cn("relative touch-pan-y will-change-transform", className)}
        {...props}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ background: glareBg, opacity: glareOpacity }}
          />
        )}
      </motion.div>
    </div>
  )
}

export { Tilt, type TiltProps }
