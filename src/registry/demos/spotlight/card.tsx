"use client"

import { GitPullRequest } from "lucide-react"
import { Spotlight } from "@/components/ui/spotlight"

export default function SpotlightCard() {
  return (
    <Spotlight size={300} className="w-full max-w-sm rounded-2xl border bg-card p-6">
      <div className="flex size-10 items-center justify-center rounded-lg border bg-background">
        <GitPullRequest className="size-5" />
      </div>
      <h3 className="mt-5 font-medium">Preview every pull request</h3>
      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
        Each branch gets its own URL, so reviewers click a link instead of pulling code. Move your cursor across the card.
      </p>
    </Spotlight>
  )
}
