"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Plus } from "lucide-react"
import { TagInput } from "@/components/ui/tag-input"
import { Label } from "@/components/ui/label"
import { spring } from "@/lib/motion"

const suggestions = ["bug", "feature", "performance", "accessibility", "docs", "design", "backend", "urgent"]

export default function TagInputSuggestions() {
  const [labels, setLabels] = React.useState(["bug"])
  const remaining = suggestions.filter((s) => !labels.includes(s))

  return (
    <div className="w-full max-w-sm space-y-2.5">
      <Label>Labels</Label>
      <TagInput value={labels} onValueChange={setLabels} placeholder="Type or pick below…" />
      <div className="flex flex-wrap gap-1.5">
        <AnimatePresence initial={false} mode="popLayout">
          {remaining.map((s) => (
            <motion.button
              key={s}
              layout
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={spring.snappy}
              onClick={() => setLabels((l) => [...l, s])}
              className="inline-flex h-6 cursor-pointer items-center gap-1 rounded-full border border-dashed px-2 text-xs text-muted-foreground transition-colors hover:border-solid hover:bg-accent hover:text-foreground"
            >
              <Plus className="size-3" /> {s}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
