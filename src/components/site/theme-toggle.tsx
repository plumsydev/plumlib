"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { AnimatePresence, motion } from "motion/react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === "dark"

  const toggle = () => {
    const next = isDark ? "light" : "dark"
    // view transition qd le nav gère, sinon tant pis on switch sec
    if (!document.startViewTransition) return setTheme(next)
    document.startViewTransition(() => setTheme(next))
  }

  return (
    <Button variant="ghost" size="icon-sm" onClick={toggle} aria-label="Toggle theme">
      <AnimatePresence mode="popLayout" initial={false}>
        {mounted && (
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="inline-flex"
          >
            {isDark ? <Moon /> : <Sun />}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  )
}
