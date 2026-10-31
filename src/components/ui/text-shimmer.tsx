"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

type TextShimmerProps = {
  children: string
  as?: "span" | "p" | "div" | "h1" | "h2" | "h3"
  /** durée d'un passage, en secondes */
  duration?: number
  /** largeur du reflet, multipliée par le nb de caractères */
  spread?: number
  className?: string
}

const tags = { span: motion.span, p: motion.p, div: motion.div, h1: motion.h1, h2: motion.h2, h3: motion.h3 }

function TextShimmer({ children, as = "span", duration = 2, spread = 2, className }: TextShimmerProps) {
  const reduce = useReducedMotion()
  const Tag = tags[as]
  const width = React.useMemo(() => children.length * spread, [children, spread])

  return (
    <Tag
      data-slot="text-shimmer"
      className={cn(
        "relative inline-block bg-clip-text text-transparent [--base:var(--muted-foreground)] [--shine:var(--foreground)]",
        "[background-repeat:no-repeat,padding-box] [background-size:250%_100%,auto]",
        className
      )}
      style={
        {
          "--spread": `${width}px`,
          backgroundImage:
            "linear-gradient(90deg, transparent calc(50% - var(--spread)), var(--shine), transparent calc(50% + var(--spread))), linear-gradient(var(--base), var(--base))",
        } as React.CSSProperties
      }
      initial={{ backgroundPosition: "100% center" }}
      animate={reduce ? undefined : { backgroundPosition: "0% center" }}
      transition={{ repeat: Infinity, duration, ease: "linear" }}
    >
      {children}
    </Tag>
  )
}

export { TextShimmer, type TextShimmerProps }
