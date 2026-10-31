"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Rating } from "@/components/ui/rating"
import { spring } from "@/lib/motion"

const labels = ["No rating", "Terrible", "Meh", "Okay", "Great", "Outstanding"]

export default function RatingDemo() {
  const [value, setValue] = React.useState(4)
  return (
    <div className="flex flex-col items-center gap-3">
      <Rating value={value} onValueChange={setValue} size="lg" label="Rate your experience" />
      <div className="relative h-5 text-sm text-muted-foreground">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ opacity: 0, y: 6, filter: "blur(2px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(2px)" }}
            transition={spring.snappy}
            className="block"
          >
            {labels[value]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}
