"use client"

import * as React from "react"
import { Sparkles } from "lucide-react"
import { TextShimmer } from "@/components/ui/text-shimmer"
import { cn } from "@/lib/utils"

export default function TextShimmerButton() {
  const [busy, setBusy] = React.useState(false)

  return (
    <button
      type="button"
      onClick={() => {
        setBusy(true)
        setTimeout(() => setBusy(false), 2600)
      }}
      className={cn(
        "inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border bg-background px-4 text-sm font-medium shadow-xs transition-[background-color,transform,translate,scale,rotate] duration-200 hover:bg-accent active:scale-[0.97]",
        busy && "pointer-events-none"
      )}
    >
      <Sparkles className={cn("size-4 transition-transform duration-500", busy && "rotate-180")} />
      {busy ? <TextShimmer duration={1.2}>Summarizing thread…</TextShimmer> : "Summarize with AI"}
    </button>
  )
}
