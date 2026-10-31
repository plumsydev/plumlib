"use client"

import * as React from "react"
import { AnimatePresence, motion, useInView } from "motion/react"
import { Check, FileCode2 } from "lucide-react"
import { spring } from "@/lib/motion"
import { BorderBeam } from "@/components/ui/border-beam"
import { Reveal } from "./reveal"

const command = "npx plum-ui add dialog"
const output = [
  { text: "Resolving dialog, button", delay: 300 },
  { text: "Installed radix-ui, motion", delay: 700 },
  { text: "Added 2 files", delay: 500 },
]
const files = ["components/ui/dialog.tsx", "components/ui/button.tsx"]

export function Install() {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-120px" })
  const [typed, setTyped] = React.useState(0)
  const [step, setStep] = React.useState(0)

  // on tape la commande lettre par lettre puis on balance la sortie, effet terminal old school
  React.useEffect(() => {
    if (!inView) return
    if (typed < command.length) {
      const t = setTimeout(() => setTyped((n) => n + 1), 28 + Math.random() * 40)
      return () => clearTimeout(t)
    }
    if (step < output.length + files.length) {
      const t = setTimeout(() => setStep((s) => s + 1), output[step]?.delay ?? 220)
      return () => clearTimeout(t)
    }
  }, [inView, typed, step])

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-[1fr_1.15fr]">
      <Reveal>
        <p className="mb-3 font-mono text-xs tracking-wider text-muted-foreground uppercase">Install</p>
        <h2 className="text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-[2.6rem] sm:leading-[1.1]">
          One command.
          <br />
          <span className="text-muted-foreground">Zero lock-in.</span>
        </h2>
        <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
          The plum-ui CLI drops the source into your project, rewrites imports to your aliases, installs what&apos;s
          missing with your package manager and pulls in the components it builds on.
        </p>
        <ul className="mt-6 space-y-2.5 text-sm">
          {["Works with Next.js, Vite, React Router and Astro", "Zero-dependency CLI, works with npm, pnpm, yarn and bun", "TypeScript, React 19, Tailwind v4"].map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <span className="flex size-5 items-center justify-center rounded-full bg-success/12 text-success">
                <Check className="size-3" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.1}>
        <div ref={ref} className="relative overflow-hidden rounded-2xl border bg-card shadow-xl">
          <BorderBeam size={120} duration={8} />
          <div className="flex h-10 items-center gap-1.5 border-b px-4">
            <span className="size-2.5 rounded-full bg-foreground/10" />
            <span className="size-2.5 rounded-full bg-foreground/10" />
            <span className="size-2.5 rounded-full bg-foreground/10" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">~/my-app</span>
          </div>
          <div className="min-h-64 p-5 font-mono text-[13px] leading-7">
            <div>
              <span className="text-brand">❯</span> {command.slice(0, typed)}
              {typed < command.length && <span className="ml-px inline-block h-4 w-[7px] translate-y-0.5 animate-pulse bg-foreground" />}
            </div>
            <AnimatePresence>
              {output.slice(0, step).map((line) => (
                <motion.div
                  key={line.text}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={spring.smooth}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Check className="size-3.5 text-success" /> {line.text}
                </motion.div>
              ))}
              {files.slice(0, Math.max(0, step - output.length)).map((f) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={spring.smooth}
                  className="flex items-center gap-2 pl-6"
                >
                  <FileCode2 className="size-3.5 text-muted-foreground" /> {f}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
