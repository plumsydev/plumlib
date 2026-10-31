"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Plus, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const all = ["frontend", "design-system", "a11y", "performance", "motion", "docs", "bug", "good first issue"]

export default function BadgeRemovable() {
  const [labels, setLabels] = React.useState(["frontend", "motion", "a11y"])
  const available = all.filter((l) => !labels.includes(l))

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex min-h-8 flex-wrap gap-1.5">
        <AnimatePresence mode="popLayout" initial={false}>
          {labels.map((l) => (
            <motion.span
              key={l}
              layout
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Badge variant="secondary" className="gap-1 pr-1">
                {l}
                <button
                  type="button"
                  aria-label={`Remove ${l}`}
                  onClick={() => setLabels((ls) => ls.filter((x) => x !== l))}
                  className="cursor-pointer rounded-full p-0.5 transition-colors hover:bg-foreground/10"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      <div className="border-t pt-3">
        <div className="mb-2 text-xs text-muted-foreground">Add a label</div>
        <div className="flex flex-wrap gap-1.5">
          {available.map((l) => (
            <Badge key={l} variant="outline" asChild>
              <button type="button" className="cursor-pointer" onClick={() => setLabels((ls) => [...ls, l])}>
                <Plus /> {l}
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
