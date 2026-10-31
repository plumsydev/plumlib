"use client"

import * as React from "react"
import { Bell, GitMerge, MessageSquare, Rocket, UserPlus } from "lucide-react"
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list"
import { Button } from "@/components/ui/button"

const templates = [
  { icon: GitMerge, title: "PR #284 merged", desc: "feat: dock component", time: "now" },
  { icon: MessageSquare, title: "Léa commented", desc: "“Ship it, looks great.”", time: "now" },
  { icon: Rocket, title: "Deployment ready", desc: "acme-web · production", time: "now" },
  { icon: UserPlus, title: "Sam joined Acme", desc: "Invited by Ryan", time: "now" },
  { icon: Bell, title: "Usage alert", desc: "80% of bandwidth used", time: "now" },
]

export default function AnimatedListDemo() {
  const [items, setItems] = React.useState(() => templates.slice(0, 2).map((t, i) => ({ ...t, id: i })))
  const [auto, setAuto] = React.useState(true)
  const next = React.useRef(2)

  const push = React.useCallback(() => {
    const id = next.current++
    const t = templates[id % templates.length]
    // on garde 4 notifs max, les vieilles s'en vont par le bas
    setItems((list) => [{ ...t, id }, ...list].slice(0, 4))
  }, [])

  React.useEffect(() => {
    if (!auto) return
    const t = setInterval(push, 2200)
    return () => clearInterval(t)
  }, [auto, push])

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <AnimatedList className="h-[19rem]">
        {items.map((item) => (
          <AnimatedListItem key={item.id}>
            <div className="flex items-center gap-3 rounded-xl border bg-card p-3 shadow-xs">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background">
                <item.icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{item.title}</div>
                <div className="truncate text-xs text-muted-foreground">{item.desc}</div>
              </div>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
          </AnimatedListItem>
        ))}
      </AnimatedList>
      <div className="flex gap-2">
        <Button size="sm" onClick={push}>Simulate</Button>
        <Button size="sm" variant="outline" onClick={() => setAuto((a) => !a)}>
          {auto ? "Pause" : "Auto"}
        </Button>
      </div>
    </div>
  )
}
