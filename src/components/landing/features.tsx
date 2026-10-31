"use client"

import * as React from "react"
import { motion } from "motion/react"
import { spring } from "@/lib/motion"
import { Reveal, SectionHeading } from "./reveal"

function OwnIllustration() {
  // petits fichiers qui tombent ds le dossier, métaphore de génie
  return (
    <div className="relative flex h-full items-end justify-center gap-1.5 pb-6">
      {["button.tsx", "dialog.tsx", "tabs.tsx"].map((f, i) => (
        <motion.div
          key={f}
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...spring.bouncy, delay: 0.2 + i * 0.12 }}
          className="rounded-md border bg-background px-2 py-1 font-mono text-[11px] text-muted-foreground shadow-sm"
        >
          {f}
        </motion.div>
      ))}
    </div>
  )
}

function MotionIllustration() {
  const [on, setOn] = React.useState(false)
  React.useEffect(() => {
    const t = setInterval(() => setOn((o) => !o), 1600)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="flex h-full items-center justify-center">
      <div className="relative flex h-9 w-40 items-center rounded-lg bg-muted p-1">
        <motion.span
          className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-md bg-background shadow-sm"
          animate={{ left: on ? "calc(50%)" : "4px" }}
          transition={spring.snappy}
        />
        <span className="relative flex-1 text-center text-xs font-medium">Monthly</span>
        <span className="relative flex-1 text-center text-xs font-medium">Yearly</span>
      </div>
    </div>
  )
}

function A11yIllustration() {
  const keys = ["Tab", "↑", "↓", "Esc"]
  return (
    <div className="flex h-full items-center justify-center gap-1.5">
      {keys.map((k, i) => (
        <motion.kbd
          key={k}
          animate={{ y: [0, 2, 0], boxShadow: ["0 2px 0 var(--border)", "0 0px 0 var(--border)", "0 2px 0 var(--border)"] }}
          transition={{ duration: 0.4, delay: i * 0.5, repeat: Infinity, repeatDelay: 2 }}
          className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border bg-background px-2 font-mono text-xs"
        >
          {k}
        </motion.kbd>
      ))}
    </div>
  )
}

function ThemeIllustration() {
  const hues = [330, 245, 155, 35]
  const [i, setI] = React.useState(0)
  React.useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % hues.length), 1400)
    return () => clearInterval(t)
  }, [hues.length])
  return (
    <div className="flex h-full items-center justify-center gap-3">
      <motion.div
        animate={{ backgroundColor: `oklch(0.6 0.19 ${hues[i]})` }}
        transition={{ duration: 0.6 }}
        className="h-9 rounded-md px-4 text-sm leading-9 font-medium text-white shadow-sm"
      >
        Upgrade
      </motion.div>
      <code className="font-mono text-xs text-muted-foreground tabular-nums">--brand: {hues[i]}°</code>
    </div>
  )
}

const features = [
  { title: "You own the code", body: "No package to fight. Every component lands in your repo as a readable file you can bend to your needs.", visual: OwnIllustration },
  { title: "Motion with intent", body: "Springs for things you touch, expo curves for things that appear. Interruptible, fast, never in the way.", visual: MotionIllustration },
  { title: "Accessible to the core", body: "Radix handles focus, keyboard and ARIA. Reduced motion is respected everywhere, CSS and JS alike.", visual: A11yIllustration },
  { title: "Themed in one line", body: "One CSS file of OKLCH tokens. Swap the brand hue and every component follows, in light and dark.", visual: ThemeIllustration },
]

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        eyebrow="Why Plum"
        title="The polish you'd add yourself, if you had the time."
        description="Every component is designed, animated and tested so you can focus on your product."
      />
      <div className="grid overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <Reveal
            key={f.title}
            delay={i * 0.08}
            className="flex flex-col border-b last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-r lg:border-b-0 lg:last:border-r-0"
          >
            <div className="h-36 border-b bg-muted/30 bg-dots">
              <f.visual />
            </div>
            <div className="p-6">
              <h3 className="font-medium">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
