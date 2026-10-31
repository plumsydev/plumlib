"use client"

import { Textarea } from "@/components/ui/textarea"

export default function TextareaAutoResize() {
  return (
    <Textarea
      autoResize
      rows={1}
      className="min-h-9 max-w-sm"
      placeholder="Start typing — I grow with your content"
    />
  )
}
