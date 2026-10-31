"use client"

import * as React from "react"
import { motion } from "motion/react"
import { ChevronDown } from "lucide-react"
import { spring } from "@/lib/motion"

export function CodeCollapse({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="relative">
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 280 }}
        transition={spring.smooth}
        className="overflow-hidden"
      >
        {children}
      </motion.div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 flex h-24 items-end justify-center bg-gradient-to-t from-muted via-muted/80 to-transparent pb-3 transition-opacity duration-300 data-[open=true]:static data-[open=true]:h-auto data-[open=true]:bg-none data-[open=true]:pt-1 dark:from-card dark:via-card/80"
        data-open={open}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="pointer-events-auto inline-flex cursor-pointer items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-medium shadow-sm transition-colors hover:bg-accent"
        >
          {open ? "Collapse" : "Expand code"}
          <ChevronDown className="size-3.5 transition-transform duration-300 ease-out-expo" style={{ rotate: open ? "180deg" : "0deg" }} />
        </button>
      </div>
    </div>
  )
}
