"use client"

import { ChevronRight } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function CollapsibleDetails() {
  return (
    <div className="w-full max-w-sm rounded-xl border bg-card p-4 text-sm shadow-xs">
      <div className="flex items-center justify-between">
        <span className="font-medium">Build failed</span>
        <span className="text-muted-foreground tabular-nums">12.4s</span>
      </div>
      <Collapsible className="mt-3">
        <CollapsibleTrigger className="group flex cursor-pointer items-center gap-1 rounded-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring">
          <ChevronRight className="size-4 transition-transform duration-300 ease-out-expo group-data-[state=open]:rotate-90" />
          Show logs
        </CollapsibleTrigger>
        <CollapsibleContent>
          <pre className="mt-3 overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
{`> next build
  ▲ Next.js 16
  Creating an optimized production build
  Failed to compile.
  ./app/page.tsx:12:3
  Type error: Property 'title' is missing.`}
          </pre>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
