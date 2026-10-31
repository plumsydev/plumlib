"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const regions = ["cdg1", "fra1", "iad1", "sfo1", "hnd1"]
const deployments = Array.from({ length: 47 }, (_, i) => ({
  id: (0x4f2c91a - i * 7919).toString(16).slice(0, 7),
  branch: ["main", "feat/billing", "fix/auth", "chore/deps"][i % 4],
  region: regions[i % regions.length],
  ago: `${i * 3 + 2}m ago`,
}))

const PER_PAGE = 5

export default function PaginationData() {
  const [page, setPage] = React.useState(1)
  const [dir, setDir] = React.useState(1)
  const total = Math.ceil(deployments.length / PER_PAGE)
  const rows = deployments.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const go = (p: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    const next = Math.max(1, Math.min(total, p))
    setDir(next > page ? 1 : -1)
    setPage(next)
  }

  const windowed = Array.from({ length: total }, (_, i) => i + 1).filter((p) => p === 1 || p === total || Math.abs(p - page) <= 1)

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="overflow-hidden rounded-xl border">
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.ul
            key={page}
            initial={{ opacity: 0, x: dir * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -20 }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
            className="divide-y"
          >
            {rows.map((d) => (
              <li key={d.id} className="flex items-center gap-3 px-4 py-2.5 text-sm">
                <span className="font-mono text-xs">{d.id}</span>
                <span className="truncate text-muted-foreground">{d.branch}</span>
                <span className="ml-auto font-mono text-xs text-muted-foreground">{d.region}</span>
                <span className="w-16 text-right text-xs text-muted-foreground tabular-nums">{d.ago}</span>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground tabular-nums">
          {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, deployments.length)} of {deployments.length}
        </span>
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={go(page - 1)} className="[&>span>span]:hidden" />
            </PaginationItem>
            {windowed.map((p, i) => (
              <React.Fragment key={p}>
                {i > 0 && p - windowed[i - 1] > 1 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink href="#" isActive={p === page} onClick={go(p)}>
                    {p}
                  </PaginationLink>
                </PaginationItem>
              </React.Fragment>
            ))}
            <PaginationItem>
              <PaginationNext href="#" onClick={go(page + 1)} className="[&>span>span]:hidden" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
