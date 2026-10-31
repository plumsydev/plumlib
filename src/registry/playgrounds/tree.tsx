"use client"

import { Tree, type TreeNode } from "@/components/ui/tree"
import { Playground } from "@/components/site/playground"

const data: TreeNode[] = [
  {
    id: "src",
    name: "src",
    children: [
      { id: "components", name: "components", children: [{ id: "button.tsx", name: "button.tsx" }, { id: "logo.svg", name: "logo.svg" }] },
      { id: "app.tsx", name: "app.tsx" },
      { id: "styles.css", name: "styles.css" },
    ],
  },
  { id: "docs", name: "docs", children: [{ id: "intro.md", name: "intro.md" }] },
  { id: "package.json", name: "package.json" },
]

export default function TreePlayground() {
  return (
    <Playground
      controls={{
        guides: { type: "boolean", default: true },
        expanded: { type: "boolean", default: true, label: "start expanded" },
        border: { type: "boolean", default: true },
      }}
      render={({ guides, expanded, border }) => (
        <div className={border ? "w-64 rounded-xl border bg-card p-2" : "w-64"}>
          <Tree
            key={String(expanded)}
            data={data}
            guides={guides}
            defaultExpanded={expanded ? ["src", "components"] : []}
            defaultSelected="app.tsx"
            aria-label="Files"
          />
        </div>
      )}
      code={({ guides, expanded }) => `<Tree
  data={data}${expanded ? '\n  defaultExpanded={["src", "components"]}' : ""}${guides ? "" : "\n  guides={false}"}
  onSelect={(node) => console.log(node.id)}
/>`}
    />
  )
}
