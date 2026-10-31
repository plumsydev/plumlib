"use client"

import * as React from "react"
import { TagInput } from "@/components/ui/tag-input"
import { Label } from "@/components/ui/label"

export default function TagInputDemo() {
  const [tags, setTags] = React.useState(["design-system", "react", "motion"])
  return (
    <div className="w-full max-w-sm space-y-2">
      <Label>Topics</Label>
      <TagInput value={tags} onValueChange={setTags} placeholder="Add a topic…" />
      <p className="text-xs text-muted-foreground">
        Enter or comma to add, Backspace twice to remove. Paste a comma separated list to add many at once.
      </p>
    </div>
  )
}
