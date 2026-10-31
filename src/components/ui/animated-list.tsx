"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

function AnimatedList({ className, children, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul data-slot="animated-list" className={cn("flex flex-col gap-2", className)} {...props}>
      <AnimatePresence initial={false} mode="popLayout">
        {children}
      </AnimatePresence>
    </ul>
  )
}

function AnimatedListItem({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof motion.li>, "children"> & { children?: React.ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <motion.li
      layout={!reduce}
      data-slot="animated-list-item"
      // les nouveaux tombent d'en haut, les autres glissent pr leur faire de la place
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -24, scale: 0.94, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, filter: "blur(4px)", transition: { duration: 0.18 } }}
      transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.8 }}
      className={cn("origin-top", className)}
      {...props}
    >
      {children}
    </motion.li>
  )
}

export { AnimatedList, AnimatedListItem }
