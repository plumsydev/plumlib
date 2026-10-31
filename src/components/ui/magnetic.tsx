"use client"

import * as React from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"
import { cn } from "@/lib/utils"

type MagneticProps = Omit<React.ComponentProps<typeof motion.div>, "children"> & {
  children?: React.ReactNode
  /** 0 = rien, 1 = colle au curseur */
  strength?: number
  /** distance en px autour de l'élément où l'aimant agit */
  range?: number
  disabled?: boolean
}

function Magnetic({ strength = 0.35, range = 80, disabled = false, className, children, style, ...props }: MagneticProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  React.useEffect(() => {
    if (disabled || reduce) {
      x.set(0)
      y.set(0)
      return
    }
    let frame = 0
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      cancelAnimationFrame(frame)
      // un calcul par frame max, sinon on mitraille getBoundingClientRect
      frame = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        // distance au bord de la boite, pas au centre, sinon les gros éléments marchent mal
        const outX = Math.max(0, Math.abs(dx) - r.width / 2)
        const outY = Math.max(0, Math.abs(dy) - r.height / 2)
        const inRange = Math.hypot(outX, outY) < range
        x.set(inRange ? dx * strength : 0)
        y.set(inRange ? dy * strength : 0)
      })
    }
    const reset = () => {
      x.set(0)
      y.set(0)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerleave", reset)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", reset)
    }
  }, [strength, range, disabled, reduce, x, y])

  return (
    <motion.div
      ref={ref}
      data-slot="magnetic"
      className={cn("inline-block will-change-transform", className)}
      style={{ x: sx, y: sy, ...style }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export { Magnetic, type MagneticProps }
