"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"

type ComponentPreviewProps = {
  children: React.ReactNode
  code: React.ReactNode
  className?: string
}

const tabs = ["Preview", "Code"] as const

export function ComponentPreview({ children, code, className }: ComponentPreviewProps) {
  const [tab, setTab] = React.useState<(typeof tabs)[number]>("Preview")
  // changer la key remonte la démo, pratique pr revoir les anims d'entrée
  const [replay, setReplay] = React.useState(0)
  const id = React.useId()

  return (
    <div className={cn("group/preview relative", className)}>
      <div className="mb-3 flex items-center justify-between">
        <div className="relative flex items-center gap-1 rounded-lg bg-muted p-0.5" role="tablist">
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className="relative cursor-pointer rounded-md px-3 py-1 text-[13px] font-medium text-muted-foreground transition-colors aria-selected:text-foreground"
            >
              {tab === t && (
                <motion.span
                  layoutId={`${id}-tab`}
                  transition={spring.snappy}
                  className="absolute inset-0 rounded-md bg-background shadow-sm dark:bg-accent"
                />
              )}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>
        {tab === "Preview" && (
          <button
            type="button"
            onClick={() => setReplay((r) => r + 1)}
            aria-label="Replay"
            className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground opacity-0 transition-[opacity,color,background-color] group-hover/preview:opacity-100 hover:bg-accent hover:text-foreground focus-visible:opacity-100 active:[&_svg]:-rotate-180 [&_svg]:size-3.5 [&_svg]:transition-transform [&_svg]:duration-500 [&_svg]:ease-out-expo"
          >
            <RotateCcw />
          </button>
        )}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {tab === "Preview" ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 4, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -4, filter: "blur(4px)" }}
            transition={{ duration: 0.2 }}
            className="relative flex min-h-[22rem] items-center justify-center overflow-hidden rounded-xl border bg-background p-6 sm:p-10"
          >
            <div className="bg-dots pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            <div key={replay} className="relative flex w-full items-center justify-center">
              {children}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="code"
            initial={{ opacity: 0, y: 4, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -4, filter: "blur(4px)" }}
            transition={{ duration: 0.2 }}
            className="[&_[data-code-block]]:max-h-[32rem] [&_[data-code-block]]:overflow-auto"
          >
            {code}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
