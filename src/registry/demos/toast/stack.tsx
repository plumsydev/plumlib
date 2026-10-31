"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

const messages = [
  ["Maya commented on ENG-412", "Looks great, ship it once CI is green."],
  ["Build #1289 passed", "All 342 tests passed in 48s."],
  ["Cycle 42 started", "18 issues scheduled across 3 teams."],
  ["Invoice paid", "€240.00 for the Pro plan."],
] as const

let i = 0

export default function ToastStack() {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <Button
        variant="outline"
        onClick={() => {
          const [title, description] = messages[i++ % messages.length]
          toast(title, { description })
        }}
      >
        Add notification
      </Button>
      <p className="text-xs text-muted-foreground">Click a few times, then hover the stack. Swipe to dismiss.</p>
    </div>
  )
}
