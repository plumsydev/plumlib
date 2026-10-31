"use client"

import * as React from "react"
import { Bookmark, Heart } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { AnimatedNumber } from "@/components/ui/animated-number"
import { cn } from "@/lib/utils"

export default function ToggleBookmark() {
  const [liked, setLiked] = React.useState(false)
  const [saved, setSaved] = React.useState(true)

  return (
    <div className="flex items-center gap-2">
      <Toggle
        variant="outline"
        pressed={liked}
        onPressedChange={setLiked}
        aria-label="Like"
        className="data-[state=on]:border-destructive/30 data-[state=on]:bg-destructive/10 data-[state=on]:text-destructive"
      >
        <Heart className={cn(liked && "fill-current")} />
        <AnimatedNumber value={128 + (liked ? 1 : 0)} />
      </Toggle>
      <Toggle
        variant="outline"
        pressed={saved}
        onPressedChange={setSaved}
        aria-label="Save"
        className="data-[state=on]:border-brand/30 data-[state=on]:bg-brand/10 data-[state=on]:text-brand"
      >
        <Bookmark className={cn(saved && "fill-current")} />
        {saved ? "Saved" : "Save"}
      </Toggle>
    </div>
  )
}
