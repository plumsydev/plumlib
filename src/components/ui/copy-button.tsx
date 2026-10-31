"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, Copy, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"
import { Button, type ButtonProps } from "@/components/ui/button"

type CopyState = "idle" | "copied" | "error"

type CopyButtonProps = Omit<ButtonProps, "value" | "loading"> & {
  value: string | (() => string)
  /** durée avant de revenir à l'icône copy, en ms */
  timeout?: number
  onCopied?: (value: string) => void
  label?: string
}

function CopyButton({
  value,
  timeout = 1600,
  onCopied,
  label,
  variant = "ghost",
  size = label ? "sm" : "icon-sm",
  className,
  onClick,
  ...props
}: CopyButtonProps) {
  const [state, setState] = React.useState<CopyState>("idle")
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  React.useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    const text = typeof value === "function" ? value() : value
    try {
      await navigator.clipboard.writeText(text)
      setState("copied")
      onCopied?.(text)
    } catch {
      // clipboard refusé, genre http ou iframe chelou
      setState("error")
    }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setState("idle"), timeout)
  }

  const Icon = state === "copied" ? Check : state === "error" ? X : Copy

  return (
    <Button
      data-slot="copy-button"
      data-state={state}
      variant={variant}
      size={size}
      aria-label={label ? undefined : state === "copied" ? "Copied" : "Copy to clipboard"}
      onClick={copy}
      className={cn("data-[state=copied]:text-success data-[state=error]:text-destructive", className)}
      {...props}
    >
      <span className="relative grid size-4 place-items-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={state}
            initial={{ opacity: 0, scale: 0.4, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.4, filter: "blur(4px)" }}
            transition={spring.snappy}
            className="grid place-items-center"
          >
            <Icon className="size-4" />
          </motion.span>
        </AnimatePresence>
      </span>
      {label && (
        <span className="relative">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={state}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={spring.snappy}
              className="inline-block"
            >
              {state === "copied" ? "Copied" : state === "error" ? "Failed" : label}
            </motion.span>
          </AnimatePresence>
        </span>
      )}
    </Button>
  )
}

export { CopyButton, type CopyButtonProps }
