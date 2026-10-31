"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Playground } from "@/components/site/playground"

function Demo({ open, items }: { open: boolean; items: number }) {
  const [isOpen, setIsOpen] = React.useState(open)
  React.useEffect(() => setIsOpen(open), [open])
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full max-w-xs space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">3 environment variables</span>
        <CollapsibleTrigger asChild>
          <Button size="icon-sm" variant="ghost" aria-label="Toggle">
            <ChevronsUpDown />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-3 py-2 font-mono text-xs">DATABASE_URL</div>
      <CollapsibleContent className="space-y-2">
        {["STRIPE_SECRET", "RESEND_API_KEY", "SENTRY_DSN", "EDGE_CONFIG"].slice(0, items).map((k) => (
          <div key={k} className="rounded-md border px-3 py-2 font-mono text-xs">
            {k}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default function CollapsiblePlayground() {
  return (
    <Playground
      controls={{
        open: { type: "boolean", default: false },
        items: { type: "number", default: 2, min: 1, max: 4, label: "hidden items" },
      }}
      render={(v) => <Demo {...v} />}
      code={({ open }) => `const [open, setOpen] = React.useState(${open})

<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger asChild>
    <Button size="icon-sm" variant="ghost"><ChevronsUpDown /></Button>
  </CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>`}
    />
  )
}
