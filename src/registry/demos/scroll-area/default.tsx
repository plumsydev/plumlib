"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const releases = Array.from({ length: 40 }, (_, i) => `v2.${40 - i}.0`)

export default function ScrollAreaDemo() {
  return (
    <ScrollArea fade className="h-72 w-48 rounded-lg border bg-card">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium">Releases</h4>
        {releases.map((r, i) => (
          <div key={r}>
            <div className="flex items-center justify-between font-mono text-sm">
              {r}
              {i === 0 && <span className="text-xs text-brand">latest</span>}
            </div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
