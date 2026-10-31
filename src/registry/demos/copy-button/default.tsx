"use client"

import { CopyButton } from "@/components/ui/copy-button"

export default function CopyButtonDemo() {
  return (
    <div className="flex items-center gap-2 rounded-lg border bg-muted/40 py-1.5 pl-3 pr-1.5 font-mono text-sm">
      <span className="text-muted-foreground">$</span>
      <span>npx plum-ui add button</span>
      <CopyButton value="npx plum-ui add button" className="ml-2" />
    </div>
  )
}
