"use client"

import { Tree, type TreeNode } from "@/components/ui/tree"

const files: TreeNode[] = [
  {
    id: "app",
    name: "app",
    children: [
      { id: "app/layout.tsx", name: "layout.tsx" },
      { id: "app/page.tsx", name: "page.tsx" },
      {
        id: "app/dashboard",
        name: "dashboard",
        children: [
          { id: "app/dashboard/page.tsx", name: "page.tsx" },
          { id: "app/dashboard/loading.tsx", name: "loading.tsx" },
        ],
      },
    ],
  },
  {
    id: "components",
    name: "components",
    children: [
      {
        id: "components/ui",
        name: "ui",
        children: [
          { id: "components/ui/button.tsx", name: "button.tsx" },
          { id: "components/ui/dialog.tsx", name: "dialog.tsx" },
          { id: "components/ui/tree.tsx", name: "tree.tsx" },
        ],
      },
    ],
  },
  { id: "public", name: "public", children: [{ id: "public/og.png", name: "og.png" }] },
  { id: "package.json", name: "package.json" },
  { id: "README.md", name: "README.md" },
]

export default function TreeDemo() {
  return (
    <div className="w-full max-w-xs rounded-xl border bg-card p-2">
      <Tree data={files} defaultExpanded={["app", "components", "components/ui"]} defaultSelected="components/ui/tree.tsx" aria-label="Files" />
    </div>
  )
}
