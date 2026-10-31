"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Playground } from "@/components/site/playground"

export default function SkeletonPlayground() {
  return (
    <Playground
      controls={{
        lines: { type: "number", default: 3, min: 1, max: 6 },
        avatar: { type: "boolean", default: true },
        media: { type: "boolean", default: false },
        rounded: { type: "select", options: ["md", "full"], default: "md" },
      }}
      render={({ lines, avatar, media, rounded }) => (
        <div className="w-full max-w-sm space-y-4">
          {media && <Skeleton className="aspect-video w-full rounded-xl" />}
          <div className="flex gap-3">
            {avatar && <Skeleton className="size-10 shrink-0 rounded-full" />}
            <div className="flex-1 space-y-2 pt-1">
              {Array.from({ length: lines }, (_, i) => (
                <Skeleton key={i} className={`h-3 ${rounded === "full" ? "rounded-full" : ""}`} style={{ width: `${100 - ((i * 23) % 45)}%` }} />
              ))}
            </div>
          </div>
        </div>
      )}
      code={({ lines, avatar, media }) => `<div className="flex gap-3">
${media ? `  <Skeleton className="aspect-video w-full rounded-xl" />\n` : ""}${avatar ? `  <Skeleton className="size-10 rounded-full" />\n` : ""}  <div className="flex-1 space-y-2">
${Array.from({ length: lines }, () => `    <Skeleton className="h-3 w-full" />`).join("\n")}
  </div>
</div>`}
    />
  )
}
