"use client"

import * as React from "react"
import { Circle, MousePointer2, PenTool, Square, Type, Hand } from "lucide-react"
import { Dock, DockItem } from "@/components/ui/dock"

const tools = [
  { id: "select", label: "Select  V", icon: MousePointer2 },
  { id: "hand", label: "Hand  H", icon: Hand },
  { id: "pen", label: "Pen  P", icon: PenTool },
  { id: "rect", label: "Rectangle  R", icon: Square },
  { id: "ellipse", label: "Ellipse  O", icon: Circle },
  { id: "text", label: "Text  T", icon: Type },
]

export default function DockToolbar() {
  const [tool, setTool] = React.useState("select")

  // raccourcis clavier façon figma
  React.useEffect(() => {
    const keys: Record<string, string> = { v: "select", h: "hand", p: "pen", r: "rect", o: "ellipse", t: "text" }
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (["INPUT", "TEXTAREA"].includes(target.tagName) || e.metaKey || e.ctrlKey) return
      const next = keys[e.key.toLowerCase()]
      if (next) setTool(next)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <div className="flex h-36 w-full flex-col items-center justify-end gap-3 pb-2">
      <Dock size={34} magnification={50} distance={110} className="rounded-xl">
        {tools.map((t) => (
          <DockItem
            key={t.id}
            label={t.label}
            active={tool === t.id}
            onClick={() => setTool(t.id)}
            className={tool === t.id ? "from-foreground to-foreground/85 text-background dark:from-foreground dark:to-foreground/85" : undefined}
          >
            <t.icon />
          </DockItem>
        ))}
      </Dock>
      <p className="text-xs text-muted-foreground">Press V, H, P, R, O or T</p>
    </div>
  )
}
