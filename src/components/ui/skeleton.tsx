import * as React from "react"
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn(
        "animate-shimmer rounded-md bg-muted bg-[length:200%_100%]",
        // reflet plus franc qu'avant, à 6% on le voyait pas sur les écrans un peu ternes
        "bg-[linear-gradient(90deg,var(--muted)_20%,color-mix(in_oklch,var(--muted),var(--foreground)_10%)_50%,var(--muted)_80%)]",
        "dark:bg-[linear-gradient(90deg,var(--muted)_20%,color-mix(in_oklch,var(--muted),var(--foreground)_12%)_50%,var(--muted)_80%)]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
