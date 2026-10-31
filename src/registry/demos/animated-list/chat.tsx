"use client"

import * as React from "react"
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list"
import { cn } from "@/lib/utils"

const script = [
  { from: "them", text: "Did the deploy go out?" },
  { from: "me", text: "Yep, 2 minutes ago" },
  { from: "them", text: "The new dock is so smooth" },
  { from: "me", text: "Springs everywhere" },
  { from: "them", text: "Ship the rest tomorrow?" },
  { from: "me", text: "Already queued" },
]

export default function AnimatedListChat() {
  const [count, setCount] = React.useState(1)

  React.useEffect(() => {
    // la conversation boucle, chaque message pousse les autres vers le haut
    const t = setTimeout(() => setCount((c) => (c >= script.length ? 1 : c + 1)), count >= script.length ? 2600 : 1300)
    return () => clearTimeout(t)
  }, [count])

  const visible = script.slice(0, count).map((m, i) => ({ ...m, id: i })).reverse()

  return (
    <div className="flex h-72 w-full max-w-xs flex-col justify-end overflow-hidden rounded-2xl border bg-card p-3">
      <AnimatedList className="flex-col-reverse gap-1.5">
        {visible.map((m) => (
          <AnimatedListItem key={m.id} initial={{ opacity: 0, y: 16, scale: 0.92 }} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
            <span
              className={cn(
                "max-w-[80%] rounded-2xl px-3 py-1.5 text-sm",
                m.from === "me" ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md bg-muted"
              )}
            >
              {m.text}
            </span>
          </AnimatedListItem>
        ))}
      </AnimatedList>
    </div>
  )
}
