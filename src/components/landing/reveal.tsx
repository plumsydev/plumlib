"use client"

import { motion } from "motion/react"
import { easeOutExpo } from "@/lib/motion"

// apparait qd ça rentre ds l'écran, une seule fois sinon ça fatigue
export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: easeOutExpo }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description?: string }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <p className="mb-3 font-mono text-xs tracking-wider text-muted-foreground uppercase">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-[2.6rem] sm:leading-[1.1]">{title}</h2>
      {description && <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">{description}</p>}
    </Reveal>
  )
}
