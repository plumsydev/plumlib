"use client"

import { GitFork, Star } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

export default function HoverCardRepository() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a href="#" className="rounded-md border bg-background px-2.5 py-1 font-mono text-sm shadow-xs transition-colors hover:bg-accent">
          acme/design-system
        </a>
      </HoverCardTrigger>
      <HoverCardContent side="top" className="w-72">
        <div className="grid gap-2">
          <div className="font-mono text-sm font-medium">acme/design-system</div>
          <p className="text-sm text-muted-foreground">Tokens, components and docs for every Acme surface.</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-info" /> TypeScript
            </span>
            <span className="flex items-center gap-1">
              <Star className="size-3.5" /> 2.4k
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="size-3.5" /> 186
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
