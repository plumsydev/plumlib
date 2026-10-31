"use client"

import { Spinner } from "@/components/ui/spinner"

export default function SpinnerSizes() {
  return (
    <div className="flex items-center gap-6 text-muted-foreground">
      <Spinner size="sm" variant="bars" />
      <Spinner variant="bars" />
      <Spinner size="lg" variant="bars" />
      <Spinner size="lg" className="size-8 text-brand" />
    </div>
  )
}
