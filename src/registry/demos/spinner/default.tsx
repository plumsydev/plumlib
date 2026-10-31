"use client"

import { Spinner } from "@/components/ui/spinner"

export default function SpinnerDemo() {
  return (
    <div className="flex items-center gap-8 text-foreground">
      <Spinner size="lg" />
      <Spinner size="lg" variant="dots" />
      <Spinner size="lg" variant="bars" />
    </div>
  )
}
