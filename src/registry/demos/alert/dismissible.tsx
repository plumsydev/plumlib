"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Sparkles, X } from "lucide-react"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { spring } from "@/lib/motion"

export default function AlertDismissible() {
  const [open, setOpen] = React.useState(true)

  return (
    <div className="flex min-h-24 w-full max-w-md flex-col items-center justify-center">
      <AnimatePresence mode="popLayout" initial={false}>
        {open ? (
          <motion.div
            key="alert"
            className="w-full"
            initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
            transition={spring.smooth}
          >
            <Alert>
              <Sparkles />
              <AlertTitle>Introducing workspaces</AlertTitle>
              <AlertDescription>Group projects, share environment variables and manage access in one place.</AlertDescription>
              <AlertAction>
                <Button variant="ghost" size="icon-xs" aria-label="Dismiss" onClick={() => setOpen(false)}>
                  <X />
                </Button>
              </AlertAction>
            </Alert>
          </motion.div>
        ) : (
          <motion.div key="reset" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
              Show again
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
