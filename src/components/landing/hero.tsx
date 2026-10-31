"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/ui/copy-button"
import { easeOutExpo } from "@/lib/motion"

const words = ["Components", "that", "move", "with", "intent."]

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 14, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.8, delay, ease: easeOutExpo },
})

export function Hero({ count }: { count: number }) {
  const command = "npx shadcn@latest add @plum/button"

  return (
    <section className="relative overflow-hidden">
      {/* grille qui s'efface vers les bords, discret mais ça pose l'ambiance */}
      <div className="bg-grid pointer-events-none absolute inset-0 -top-14 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute top-0 left-1/2 h-[480px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[120px] dark:bg-brand/15" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-28">
        <motion.div {...rise(0)}>
          <Link
            href="/docs/components/toast"
            className="group inline-flex items-center gap-2 rounded-full border bg-background/60 py-1 pr-2.5 pl-1 text-[13px] shadow-xs backdrop-blur transition-colors hover:bg-accent"
          >
            <span className="rounded-full bg-foreground px-2 py-0.5 text-xs font-medium text-background">New</span>
            <span className="text-muted-foreground">{count} components, motion included</span>
            <ChevronRight className="size-3.5 text-muted-foreground transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <h1 className="mt-7 max-w-4xl text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.035em] text-balance sm:text-6xl md:text-7xl">
          {words.map((word, i) => (
            <motion.span key={i} className="inline-block whitespace-pre" {...rise(0.08 + i * 0.07)}>
              {i === words.length - 1 ? (
                <span className="bg-gradient-to-b from-foreground to-foreground/55 bg-clip-text text-transparent">{word}</span>
              ) : (
                `${word} `
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p {...rise(0.5)} className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          Accessible React components with motion designed into every interaction. Copy them into your app, then own
          every line. Built on Radix, Tailwind&nbsp;CSS and Motion.
        </motion.p>

        <motion.div {...rise(0.6)} className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" asChild className="group">
            <Link href="/docs/installation">
              Get started
              <ArrowRight className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <div className="flex h-10 items-center gap-2 rounded-md border bg-background/60 pr-1 pl-3.5 font-mono text-[13px] shadow-xs backdrop-blur">
            <span className="text-muted-foreground select-none">$</span>
            <span>{command}</span>
            <CopyButton value={command} variant="ghost" size="icon-sm" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
