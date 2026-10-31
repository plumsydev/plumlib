"use client"

import { CalendarDays } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

export default function HoverCardDemo() {
  return (
    <p className="text-sm text-muted-foreground">
      Reviewed by{" "}
      <HoverCard>
        <HoverCardTrigger asChild>
          <a href="#" className="font-medium text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground">
            @maya
          </a>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-200 to-zinc-400 text-sm font-semibold text-zinc-800 dark:from-zinc-600 dark:to-zinc-800 dark:text-zinc-100">
              MK
            </div>
            <div className="grid gap-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-semibold">Maya Kessler</span>
                <span className="text-xs text-muted-foreground">@maya</span>
              </div>
              <p className="text-sm">Design engineer. Obsessed with easing curves and good defaults.</p>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarDays className="size-3.5" /> Joined March 2023
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>{" "}
      two hours ago.
    </p>
  )
}
