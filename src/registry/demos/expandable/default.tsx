"use client"

import { ArrowUpRight, GitBranch, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Expandable,
  ExpandableClose,
  ExpandableContent,
  ExpandableDescription,
  ExpandableMedia,
  ExpandableSubtitle,
  ExpandableTitle,
  ExpandableTrigger,
} from "@/components/ui/expandable"

function Cover() {
  return (
    <div className="relative h-full w-full bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklch,var(--brand)_55%,transparent),transparent_60%),radial-gradient(circle_at_80%_70%,color-mix(in_oklch,var(--info)_45%,transparent),transparent_55%)] bg-muted">
      <div className="bg-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
    </div>
  )
}

export default function ExpandableDemo() {
  return (
    <Expandable>
      <ExpandableTrigger className="w-72">
        <ExpandableMedia className="h-40">
          <Cover />
        </ExpandableMedia>
        <div className="space-y-1 p-4">
          <ExpandableTitle>acme-storefront</ExpandableTitle>
          <ExpandableSubtitle>Next.js · deployed 4 min ago</ExpandableSubtitle>
        </div>
      </ExpandableTrigger>
      <ExpandableContent>
        <ExpandableClose />
        <ExpandableMedia className="h-56">
          <Cover />
        </ExpandableMedia>
        <div className="space-y-4 p-6">
          <div className="space-y-1">
            <ExpandableTitle className="text-xl">acme-storefront</ExpandableTitle>
            <ExpandableSubtitle>Next.js · deployed 4 min ago</ExpandableSubtitle>
          </div>
          <ExpandableDescription className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="success" dot>Ready</Badge>
              <Badge variant="outline"><GitBranch /> main</Badge>
              <Badge variant="outline"><Globe /> cdg1, iad1</Badge>
            </div>
            <p>
              The storefront went from 2.1s to 640ms largest contentful paint after moving product pages to the edge.
              Cache hit ratio sits at 94% over the last 24 hours.
            </p>
            <div className="grid grid-cols-3 gap-3 rounded-lg border p-3 text-foreground">
              {[["LCP", "640ms"], ["Requests", "1.2M"], ["Errors", "0.02%"]].map(([k, v]) => (
                <div key={k}>
                  <div className="text-xs text-muted-foreground">{k}</div>
                  <div className="font-semibold tabular-nums">{v}</div>
                </div>
              ))}
            </div>
            <Button className="w-full">
              Visit site <ArrowUpRight />
            </Button>
          </ExpandableDescription>
        </div>
      </ExpandableContent>
    </Expandable>
  )
}
