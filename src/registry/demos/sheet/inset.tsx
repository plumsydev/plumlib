"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Bell, Check, GitPullRequest, MessageSquare, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetBody, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { spring } from "@/lib/motion"

const initial = [
  { id: 1, icon: Rocket, title: "Production deploy ready", meta: "acme-web · 2m" },
  { id: 2, icon: GitPullRequest, title: "Léa requested your review", meta: "feat: billing page · 14m" },
  { id: 3, icon: MessageSquare, title: "Alex commented on #482", meta: "“Looks good, ship it” · 1h" },
  { id: 4, icon: Rocket, title: "Preview deploy failed", meta: "fix/cache-headers · 3h" },
]

export default function SheetInset() {
  const [items, setItems] = React.useState(initial)

  return (
    <Sheet onOpenChange={(o) => o && items.length === 0 && setItems(initial)}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Bell /> Inbox
          {items.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-brand text-[10px] font-semibold text-brand-foreground tabular-nums">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent inset>
        <SheetHeader>
          <SheetTitle>Inbox</SheetTitle>
          <SheetDescription>{items.length ? `${items.length} unread` : "You are all caught up."}</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <ul className="space-y-1">
            <AnimatePresence initial={false}>
              {items.map((n) => (
                <motion.li
                  key={n.id}
                  layout
                  exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
                  transition={spring.smooth}
                  className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-accent"
                >
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border bg-background">
                    <n.icon className="size-4 text-muted-foreground" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{n.title}</div>
                    <div className="truncate text-xs text-muted-foreground">{n.meta}</div>
                  </div>
                  <Button
                    size="icon-xs"
                    variant="ghost"
                    aria-label="Mark as read"
                    className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                    onClick={() => setItems((all) => all.filter((x) => x.id !== n.id))}
                  >
                    <Check />
                  </Button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          {items.length === 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={spring.bouncy} className="flex flex-col items-center gap-2 py-16 text-sm text-muted-foreground">
              <span className="flex size-10 items-center justify-center rounded-full bg-success/12 text-success">
                <Check className="size-5" />
              </span>
              Inbox zero
            </motion.div>
          )}
        </SheetBody>
        <SheetFooter>
          <Button variant="outline" disabled={!items.length} onClick={() => setItems([])}>
            Mark all as read
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
