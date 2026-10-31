"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

type SpinnerProps = React.ComponentProps<"span"> & {
  variant?: "ring" | "dots" | "bars"
  size?: "sm" | "default" | "lg"
}

const sizes = { sm: "size-3.5", default: "size-4", lg: "size-6" }

function Spinner({ variant = "ring", size = "default", className, ...props }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      data-slot="spinner"
      className={cn("inline-flex shrink-0 items-center justify-center text-current", sizes[size], className)}
      {...props}
    >
      {variant === "ring" && <Ring />}
      {variant === "dots" && <Dots />}
      {variant === "bars" && <Bars />}
    </span>
  )
}

function Ring() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-full animate-spin" aria-hidden>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
      <path d="M14.5 8A6.5 6.5 0 0 0 8 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function Dots() {
  return (
    <span className="flex size-full items-center justify-between" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="aspect-square w-[22%] rounded-full bg-current"
          animate={{ y: ["0%", "-60%", "0%"], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: i * 0.14 }}
        />
      ))}
    </span>
  )
}

function Bars() {
  // le classique spinner à la apple, 8 barres qui s'éteignent chacune leur tour
  return (
    <span className="relative size-full" aria-hidden>
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute top-0 left-[calc(50%-6%)] h-[30%] w-[12%] origin-[50%_166%] rounded-full bg-current"
          style={{ rotate: i * 45 }}
          animate={{ opacity: [1, 0.15] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear", delay: (i - 8) * 0.1 }}
        />
      ))}
    </span>
  )
}

export { Spinner, type SpinnerProps }
