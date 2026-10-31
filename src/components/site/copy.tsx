"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

export function CopyIconButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = React.useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy code"}
      className={cn(
        "inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:scale-95 [&_svg]:size-3.5",
        className
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={copied ? "check" : "copy"}
          initial={{ scale: 0.4, opacity: 0, filter: "blur(2px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          exit={{ scale: 0.4, opacity: 0, filter: "blur(2px)" }}
          transition={{ type: "spring", stiffness: 600, damping: 30 }}
          className="inline-flex"
        >
          {copied ? <Check className="text-success" /> : <Copy />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
