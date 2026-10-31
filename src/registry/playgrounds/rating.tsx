"use client"

import { Heart } from "lucide-react"
import { Rating } from "@/components/ui/rating"
import { Playground, jsxProps } from "@/components/site/playground"

export default function RatingPlayground() {
  return (
    <Playground
      controls={{
        size: { type: "select", options: ["sm", "default", "lg"], default: "lg" },
        max: { type: "number", default: 5, min: 3, max: 10 },
        icon: { type: "select", options: ["star", "heart"], default: "star" },
        allowHalf: { type: "boolean", default: false },
        readOnly: { type: "boolean", default: false },
        disabled: { type: "boolean", default: false },
      }}
      render={({ icon, max, ...p }) => (
        <Rating
          key={max}
          defaultValue={3}
          max={max}
          {...p}
          icon={icon === "heart" ? (c) => <Heart className={c} fill="currentColor" strokeWidth={1.5} /> : undefined}
        />
      )}
      code={({ icon, max, ...p }) => `${icon === "heart" ? `import { Heart } from "lucide-react"\n` : ""}import { Rating } from "@/components/ui/rating"

<Rating defaultValue={3}${jsxProps({ max, ...p }, { max: 5, size: "default" })}${
        icon === "heart" ? `\n  icon={(className) => <Heart className={className} fill="currentColor" />}\n` : " "
      }/>`}
    />
  )
}
