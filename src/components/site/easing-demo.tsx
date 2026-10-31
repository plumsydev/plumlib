"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { spring } from "@/lib/motion"

const tracks = [
  { name: "linear", note: "Robotic. Avoid for UI.", css: "linear", duration: 0.7 },
  { name: "ease-out-expo", note: "Enters fast, settles softly. Overlays, menus.", css: "cubic-bezier(0.16, 1, 0.3, 1)", duration: 0.7 },
  { name: "ease-spring", note: "CSS linear() spring. Playful accents.", css: "var(--ease-spring)", duration: 0.9 },
  { name: "spring.snappy", note: "Motion spring. Indicators, toggles.", css: null, duration: 0 },
]

export function EasingDemo() {
  const [on, setOn] = React.useState(false)

  return (
    <div className="my-6 overflow-hidden rounded-xl border">
      <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-2.5">
        <span className="text-sm font-medium">Easing curves</span>
        <Button size="xs" variant="outline" onClick={() => setOn((o) => !o)}>
          <Play /> Play
        </Button>
      </div>
      <div className="divide-y">
        {tracks.map((t) => (
          <div key={t.name} className="grid items-center gap-x-4 gap-y-2 px-4 py-3.5 sm:grid-cols-[10rem_1fr]">
            <div>
              <code className="font-mono text-[13px] font-medium">{t.name}</code>
              <p className="text-xs text-muted-foreground">{t.note}</p>
            </div>
            <div className="@container relative h-8 rounded-md bg-muted/50">
              {t.css ? (
                <div
                  className="absolute top-1 left-1 size-6 rounded-[5px] bg-foreground"
                  style={{
                    translate: on ? "calc(var(--track) - 2rem)" : "0",
                    transition: `translate ${t.duration}s ${t.css}`,
                    ["--track" as string]: "100cqw",
                  }}
                />
              ) : (
                <motion.div
                  className="absolute top-1 left-1 size-6 rounded-[5px] bg-brand"
                  animate={{ left: on ? "calc(100% - 1.75rem)" : "0.25rem" }}
                  transition={spring.snappy}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
