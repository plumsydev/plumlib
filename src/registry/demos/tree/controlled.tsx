"use client"

import * as React from "react"
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tree, type TreeNode } from "@/components/ui/tree"

const data: TreeNode[] = [
  {
    id: "src",
    name: "src",
    children: [
      { id: "src/lib", name: "lib", children: [{ id: "src/lib/utils.ts", name: "utils.ts" }, { id: "src/lib/motion.ts", name: "motion.ts" }] },
      { id: "src/styles", name: "styles", children: [{ id: "src/styles/plum.css", name: "plum.css" }] },
      { id: "src/main.tsx", name: "main.tsx" },
    ],
  },
  { id: "scripts", name: "scripts", children: [{ id: "scripts/build.mjs", name: "build.mjs" }] },
  { id: "tsconfig.json", name: "tsconfig.json" },
]

// tous les dossiers, pr le bouton "tout déplier"
const folders = (nodes: TreeNode[]): string[] => nodes.flatMap((n) => (n.children ? [n.id, ...folders(n.children)] : []))

export default function TreeControlled() {
  const [expanded, setExpanded] = React.useState<string[]>(["src"])
  const [selected, setSelected] = React.useState<string>("src/main.tsx")
  const all = folders(data)

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <span className="text-xs font-medium text-muted-foreground">Explorer</span>
        <div className="flex gap-0.5">
          <Button size="icon-xs" variant="ghost" aria-label="Expand all" onClick={() => setExpanded(all)}>
            <ChevronsUpDown />
          </Button>
          <Button size="icon-xs" variant="ghost" aria-label="Collapse all" onClick={() => setExpanded([])}>
            <ChevronsDownUp />
          </Button>
        </div>
      </div>
      <div className="p-2">
        <Tree
          data={data}
          expanded={expanded}
          onExpandedChange={setExpanded}
          selected={selected}
          onSelect={(n) => setSelected(n.id)}
          aria-label="Project"
        />
      </div>
      <div className="border-t bg-muted/40 px-3 py-2 font-mono text-xs text-muted-foreground">
        {selected.split("/").map((part, i, arr) => (
          <span key={i}>
            <span className={i === arr.length - 1 ? "text-foreground" : undefined}>{part}</span>
            {i < arr.length - 1 && <span className="px-1 opacity-50">/</span>}
          </span>
        ))}
      </div>
    </div>
  )
}
