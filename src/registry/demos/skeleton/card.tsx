"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonCard() {
  return (
    <div className="w-full max-w-sm rounded-xl border bg-card p-4 shadow-xs">
      <Skeleton className="aspect-video w-full rounded-lg" />
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <div className="mt-6 flex gap-2">
        <Skeleton className="h-8 flex-1" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  )
}
