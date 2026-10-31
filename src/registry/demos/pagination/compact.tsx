"use client"

import * as React from "react"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

export default function PaginationCompact() {
  const [page, setPage] = React.useState(1)
  const total = 24

  return (
    <div className="flex w-full max-w-md items-center justify-between gap-4 text-sm">
      <span className="text-muted-foreground">
        Page <span className="font-medium text-foreground tabular-nums">{page}</span> of {total}
      </span>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setPage((p) => Math.max(1, p - 1))
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setPage((p) => Math.min(total, p + 1))
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
