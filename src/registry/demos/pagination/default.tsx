"use client"

import * as React from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const TOTAL = 10

// renvoie les pages à afficher avec des trous pr les ellipses
function pages(current: number): (number | "…")[] {
  if (current <= 3) return [1, 2, 3, 4, "…", TOTAL]
  if (current >= TOTAL - 2) return [1, "…", TOTAL - 3, TOTAL - 2, TOTAL - 1, TOTAL]
  return [1, "…", current - 1, current, current + 1, "…", TOTAL]
}

export default function PaginationDemo() {
  const [page, setPage] = React.useState(2)
  const go = (p: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    setPage(Math.min(TOTAL, Math.max(1, p)))
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={go(page - 1)} aria-disabled={page === 1} className="aria-disabled:pointer-events-none aria-disabled:opacity-40" />
        </PaginationItem>
        {pages(page).map((p, i) => (
          <PaginationItem key={`${p}-${i}`}>
            {p === "…" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink href="#" isActive={p === page} onClick={go(p)}>
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href="#" onClick={go(page + 1)} aria-disabled={page === TOTAL} className="aria-disabled:pointer-events-none aria-disabled:opacity-40" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
