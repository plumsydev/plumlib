"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"

type State = "empty" | "loading" | "ready"

export default function EmptyStates() {
  const [state, setState] = React.useState<State>("empty")

  const create = () => {
    setState("loading")
    setTimeout(() => setState("ready"), 1400)
  }

  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={state}
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
          transition={{ duration: 0.3 }}
        >
          {state === "empty" && (
            <Empty className="border">
              <EmptyHeader>
                <EmptyMedia variant="stack">
                  <Rocket />
                </EmptyMedia>
                <EmptyTitle>No deployments yet</EmptyTitle>
                <EmptyDescription>Push to your main branch or deploy manually to see it here.</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button size="sm" onClick={create}>
                  Deploy now
                </Button>
              </EmptyContent>
            </Empty>
          )}
          {state === "loading" && (
            <div className="space-y-3 rounded-xl border p-5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="size-8 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3 w-2/3" />
                    <Skeleton className="h-2.5 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {state === "ready" && (
            <div className="space-y-3 rounded-xl border p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">acme-web · production</span>
                <span className="text-success">Ready</span>
              </div>
              <p className="text-sm text-muted-foreground">Deployed in 38s to 18 regions.</p>
              <Button size="sm" variant="outline" onClick={() => setState("empty")}>
                Reset demo
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
