"use client"

import { TextShimmer } from "@/components/ui/text-shimmer"
import { Playground, jsxProps } from "@/components/site/playground"

export default function TextShimmerPlayground() {
  return (
    <Playground
      controls={{
        text: { type: "text", default: "Generating response…" },
        duration: { type: "number", default: 2, min: 0.5, max: 5, step: 0.1 },
        spread: { type: "number", default: 2, min: 1, max: 6, step: 0.5 },
        large: { type: "boolean", default: true },
      }}
      render={({ text, large, ...p }) => (
        <TextShimmer {...p} className={large ? "text-3xl font-semibold tracking-tight" : "text-sm"}>
          {text}
        </TextShimmer>
      )}
      code={({ text, large, ...p }) => `import { TextShimmer } from "@/components/ui/text-shimmer"

<TextShimmer${jsxProps(p, { duration: 2, spread: 2 })}${large ? ' className="text-3xl font-semibold"' : ""}>
  ${text}
</TextShimmer>`}
    />
  )
}
