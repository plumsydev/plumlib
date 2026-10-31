import * as React from "react"
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn(
        "animate-shimmer rounded-md bg-muted bg-[length:200%_100%]",
        "bg-[linear-gradient(90deg,var(--muted)_25%,color-mix(in_oklch,var(--muted),var(--foreground)_6%)_50%,var(--muted)_75%)]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
