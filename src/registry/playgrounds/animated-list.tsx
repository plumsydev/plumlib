"use client"

import * as React from "react"
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list"
import { Button } from "@/components/ui/button"
import { Playground } from "@/components/site/playground"

const labels = ["New sign-up", "Payment received", "Build finished", "Comment added", "Invite accepted"]

function Demo({ max, interval }: { max: number; interval: number }) {
  const [items, setItems] = React.useState([{ id: 0, label: labels[0] }])
  const id = React.useRef(1)
  const push = React.useCallback(() => {
    const n = id.current++
    setItems((l) => [{ id: n, label: labels[n % labels.length] }, ...l].slice(0, max))
  }, [max])

  React.useEffect(() => {
    if (!interval) return
    const t = setInterval(push, interval)
    return () => clearInterval(t)
  }, [interval, push])

  return (
    <div className="w-64 space-y-3">
      <Button size="sm" variant="outline" onClick={push} className="w-full">Add item</Button>
      <AnimatedList>
        {items.map((i) => (
          <AnimatedListItem key={i.id} className="rounded-lg border bg-card px-3 py-2 text-sm shadow-xs">
            {i.label}
          </AnimatedListItem>
        ))}
      </AnimatedList>
    </div>
  )
}

export default function AnimatedListPlayground() {
  return (
    <Playground
      controls={{
        max: { type: "number", default: 4, min: 1, max: 6, label: "max items" },
        interval: { type: "number", default: 1800, min: 0, max: 4000, step: 200, label: "auto add (ms, 0 = off)" },
      }}
      previewClassName="items-start min-h-96"
      render={(p) => <Demo {...p} />}
      code={() => `import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list"

<AnimatedList>
  {items.map((item) => (
    <AnimatedListItem key={item.id}>{item.label}</AnimatedListItem>
  ))}
</AnimatedList>`}
    />
  )
}
