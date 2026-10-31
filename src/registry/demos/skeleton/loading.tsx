"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { easeOutExpo } from "@/lib/motion"

const rows = [
  { name: "acme-web", meta: "Production · 2m ago" },
  { name: "acme-docs", meta: "Preview · 1h ago" },
  { name: "acme-api", meta: "Production · yesterday" },
]

export default function SkeletonLoading() {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 1600)
    return () => clearTimeout(t)
  }, [loading])

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <div className="w-full divide-y rounded-xl border bg-card shadow-xs">
        {rows.map((r, i) => (
          <div key={r.name} className="relative flex h-16 items-center gap-3 px-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {loading ? (
                <motion.div key="s" exit={{ opacity: 0 }} className="flex flex-1 items-center gap-3">
                  <Skeleton className="size-8 rounded-md" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3.5 w-24" />
                    <Skeleton className="h-3 w-36" />
                  </div>
                </motion.div>
              ) : (
                // les vraies données arrivent en cascade, une ligne apres l'autre
                <motion.div
                  key="c"
                  initial={{ opacity: 0, y: 4, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, ease: easeOutExpo, delay: i * 0.06 }}
                  className="flex flex-1 items-center gap-3"
                >
                  <div className="flex size-8 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
                    {r.name[5].toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.meta}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <Button size="sm" variant="outline" onClick={() => setLoading(true)} disabled={loading}>
        Reload
      </Button>
    </div>
  )
}
