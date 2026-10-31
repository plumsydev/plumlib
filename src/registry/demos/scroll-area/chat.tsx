"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const lines = [
  "Build #482 started on main",
  "Installing dependencies…",
  "Lockfile is up to date",
  "Compiling 1,204 modules",
  "Optimizing images",
  "Generating static pages (52/52)",
  "Uploading build output",
  "Assigning domains",
  "Deployment ready in 38s",
]

export default function ScrollAreaChat() {
  const [log, setLog] = React.useState(lines.slice(0, 4))
  const [atBottom, setAtBottom] = React.useState(true)
  const root = React.useRef<HTMLDivElement>(null)

  const viewport = () => root.current?.querySelector<HTMLElement>("[data-slot=scroll-area-viewport]")
  const toBottom = () => viewport()?.scrollTo({ top: 1e6, behavior: "smooth" })

  // une nouvelle ligne de log régulièrement, on suit seulement si on était déjà en bas
  React.useEffect(() => {
    const id = setInterval(() => setLog((l) => [...l, lines[l.length % lines.length]]), 1300)
    return () => clearInterval(id)
  }, [])

  React.useEffect(() => {
    if (atBottom) toBottom()
  }, [log, atBottom])

  React.useEffect(() => {
    const vp = viewport()
    if (!vp) return
    const onScroll = () => setAtBottom(vp.scrollHeight - vp.scrollTop - vp.clientHeight < 24)
    vp.addEventListener("scroll", onScroll)
    return () => vp.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div ref={root} className="relative w-full max-w-sm">
      <ScrollArea fade className="h-56 rounded-xl border bg-card">
        <div className="space-y-1 p-3 font-mono text-xs">
          {log.map((l, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
              <span className="w-6 shrink-0 text-right text-muted-foreground/60 tabular-nums">{i + 1}</span>
              <span className={l.includes("ready") ? "text-success" : undefined}>{l}</span>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
      <AnimatePresence>
        {!atBottom && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2"
          >
            <Button size="xs" variant="outline" className="rounded-full shadow-md" onClick={toBottom}>
              <ArrowDown /> New lines
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
