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
import { Playground } from "@/components/site/playground"

// fenetre de pages avec ellipses, la logique que tt le monde refait à chaque projet
function pages(current: number, total: number, siblings: number) {
  const out: (number | "…")[] = []
  for (let p = 1; p <= total; p++) {
    if (p === 1 || p === total || Math.abs(p - current) <= siblings) out.push(p)
    else if (out[out.length - 1] !== "…") out.push("…")
  }
  return out
}

function Demo({ total, siblings, labels }: { total: number; siblings: number; labels: boolean }) {
  const [page, setPage] = React.useState(3)
  const current = Math.min(page, total)
  const go = (p: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    setPage(Math.max(1, Math.min(total, p)))
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={go(current - 1)} className={labels ? undefined : "[&>span>span]:hidden"} />
        </PaginationItem>
        {pages(current, total, siblings).map((p, i) => (
          <PaginationItem key={i}>
            {p === "…" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink href="#" isActive={p === current} onClick={go(p)}>
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href="#" onClick={go(current + 1)} className={labels ? undefined : "[&>span>span]:hidden"} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default function PaginationPlayground() {
  return (
    <Playground
      controls={{
        total: { type: "number", default: 12, min: 3, max: 30 },
        siblings: { type: "number", default: 1, min: 0, max: 2 },
        labels: { type: "boolean", default: true },
      }}
      render={(v) => <Demo {...v} />}
      code={() => `<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>`}
    />
  )
}
