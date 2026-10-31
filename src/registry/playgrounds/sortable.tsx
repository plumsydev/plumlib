"use client"

import * as React from "react"
import { Sortable, SortableHandle, SortableItem } from "@/components/ui/sortable"
import { Playground } from "@/components/site/playground"

function Demo({ axis, handle }: { axis: "x" | "y"; handle: boolean }) {
  const [items, setItems] = React.useState(["Design", "Build", "Test", "Ship"])
  return (
    <Sortable axis={axis} values={items} onValuesChange={setItems} className={axis === "y" ? "w-56 gap-2" : "gap-2"}>
      {items.map((item) => (
        <SortableItem key={item} value={item} handle={handle} className="flex items-center gap-2 border px-2 py-2 text-sm">
          {handle && <SortableHandle />}
          <span className={handle ? undefined : "px-1"}>{item}</span>
        </SortableItem>
      ))}
    </Sortable>
  )
}

export default function SortablePlayground() {
  return (
    <Playground
      controls={{
        axis: { type: "select", options: ["y", "x"], default: "y" },
        handle: { type: "boolean", default: true },
      }}
      render={({ axis, handle }) => <Demo key={axis} axis={axis} handle={handle} />}
      code={({ axis, handle }) => `<Sortable values={items} onValuesChange={setItems}${axis === "x" ? ' axis="x"' : ""}>
  {items.map((item) => (
    <SortableItem key={item} value={item}${handle ? "" : " handle={false}"}>
${handle ? "      <SortableHandle />\n" : ""}      {item}
    </SortableItem>
  ))}
</Sortable>`}
    />
  )
}
