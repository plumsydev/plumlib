import type { Transition } from "motion/react"

// les ressorts partagés, comme ça tt bouge pareil ds la lib
export const spring = {
  snappy: { type: "spring", stiffness: 520, damping: 34, mass: 0.7 },
  smooth: { type: "spring", stiffness: 300, damping: 30 },
  bouncy: { type: "spring", stiffness: 420, damping: 18 },
  gentle: { type: "spring", stiffness: 180, damping: 26 },
} satisfies Record<string, Transition>

export const easeOutExpo = [0.16, 1, 0.3, 1] as const
