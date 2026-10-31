"use client"

import * as React from "react"
import { motion } from "motion/react"
import { ArrowDownUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { spring } from "@/lib/motion"

const projects = [
  { name: "acme-web", visits: 48210, updated: 2 },
  { name: "billing-api", visits: 9120, updated: 30 },
  { name: "docs", visits: 132400, updated: 300 },
  { name: "status-page", visits: 2210, updated: 12 },
]

const sorters = {
  name: { label: "Name", fn: (a: (typeof projects)[0], b: (typeof projects)[0]) => a.name.localeCompare(b.name) },
  visits: { label: "Most visited", fn: (a: (typeof projects)[0], b: (typeof projects)[0]) => b.visits - a.visits },
  updated: { label: "Recently updated", fn: (a: (typeof projects)[0], b: (typeof projects)[0]) => a.updated - b.updated },
}

export default function DropdownMenuSort() {
  const [sort, setSort] = React.useState<keyof typeof sorters>("updated")
  const list = [...projects].sort(sorters[sort].fn)

  return (
    <div className="w-full max-w-xs space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Projects</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              <ArrowDownUp /> {sorters[sort].label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={sort} onValueChange={(v) => setSort(v as keyof typeof sorters)}>
              {Object.entries(sorters).map(([k, s]) => (
                <DropdownMenuRadioItem key={k} value={k}>
                  {s.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* layout => les lignes glissent à leur nouvelle place qd le tri change */}
      <ul className="space-y-1.5">
        {list.map((p) => (
          <motion.li key={p.name} layout transition={spring.smooth} className="flex items-center justify-between rounded-lg border bg-background px-3 py-2 text-sm">
            <span className="font-medium">{p.name}</span>
            <span className="text-xs text-muted-foreground tabular-nums">
              {sort === "updated" ? `${p.updated < 60 ? `${p.updated}m` : `${p.updated / 60}h`} ago` : `${p.visits.toLocaleString("en-US")} visits`}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
