"use client"

import { SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"

export default function EmptySearch() {
  return (
    <Empty className="max-w-md">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchX />
        </EmptyMedia>
        <EmptyTitle>No results for &ldquo;dark mde&rdquo;</EmptyTitle>
        <EmptyDescription>
          Did you mean <a href="#">dark mode</a>? Try fewer keywords or check your spelling.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="ghost" size="sm">
          Clear filters
        </Button>
      </EmptyContent>
    </Empty>
  )
}
