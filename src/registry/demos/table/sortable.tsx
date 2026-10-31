"use client"

import * as React from "react"
import { motion } from "motion/react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { spring } from "@/lib/motion"
import { cn } from "@/lib/utils"

const MotionRow = motion.create(TableRow)

const projects = [
  { name: "acme-web", requests: 182400, latency: 84 },
  { name: "acme-api", requests: 961200, latency: 41 },
  { name: "acme-docs", requests: 24800, latency: 112 },
  { name: "acme-admin", requests: 8300, latency: 67 },
]

type Key = "name" | "requests" | "latency"

export default function TableSortable() {
  const [sort, setSort] = React.useState<{ key: Key; dir: 1 | -1 }>({ key: "requests", dir: -1 })

  const rows = [...projects].sort((a, b) => (a[sort.key] > b[sort.key] ? 1 : -1) * sort.dir)
  const head = (key: Key, label: string, right?: boolean) => (
    <TableHead className={cn(right && "text-right")}>
      <button
        onClick={() => setSort((s) => ({ key, dir: s.key === key ? ((s.dir * -1) as 1 | -1) : -1 }))}
        className={cn(
          "inline-flex cursor-pointer items-center gap-1 rounded-sm outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring",
          sort.key === key && "text-foreground"
        )}
      >
        {label}
        {sort.key === key && (sort.dir === 1 ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />)}
      </button>
    </TableHead>
  )

  return (
    <Table className="max-w-md">
      <TableHeader>
        <TableRow>
          {head("name", "Project")}
          {head("requests", "Requests", true)}
          {head("latency", "p95", true)}
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* layout => les lignes glissent à leur nouvelle place au lieu de se téléporter */}
        {rows.map((p) => (
          <MotionRow key={p.name} layout transition={spring.smooth}>
            <TableCell className="font-mono text-xs">{p.name}</TableCell>
            <TableCell className="text-right tabular-nums">{p.requests.toLocaleString("en-US")}</TableCell>
            <TableCell className="text-right tabular-nums">{p.latency}ms</TableCell>
          </MotionRow>
        ))}
      </TableBody>
    </Table>
  )
}
