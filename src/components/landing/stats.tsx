"use client"

import * as React from "react"
import { useInView } from "motion/react"
import { AnimatedNumber } from "@/components/ui/animated-number"
import { Reveal } from "./reveal"

export function Stats({ components, demos }: { components: number; demos: number }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { value: components, label: "components", note: "inputs, overlays, data, motion" },
    { value: demos, label: "live examples", note: "every one interactive" },
    { value: 1, label: "CSS file", note: "tokens, dark mode, easings" },
    { value: 0, label: "lock-in", note: "the code lives in your repo" },
  ]

  return (
    <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6 sm:pt-32">
      <div ref={ref} className="grid grid-cols-2 overflow-hidden rounded-2xl border lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.06}
            className="border-b p-6 odd:border-r last:border-b-0 sm:p-8 lg:border-r lg:border-b-0 lg:last:border-r-0 [&:nth-child(3)]:border-b-0"
          >
            <AnimatedNumber value={inView ? s.value : 0} className="text-4xl font-semibold tracking-tight sm:text-5xl" />
            <div className="mt-2 text-sm font-medium">{s.label}</div>
            <div className="text-xs text-muted-foreground">{s.note}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
