"use client"

import { Calendar, FolderOpen, Mail, Music, Settings } from "lucide-react"
import { Dock, DockItem } from "@/components/ui/dock"
import { Playground, jsxProps } from "@/components/site/playground"

const apps = [
  { label: "Finder", icon: FolderOpen },
  { label: "Mail", icon: Mail },
  { label: "Calendar", icon: Calendar },
  { label: "Music", icon: Music },
  { label: "Settings", icon: Settings },
]

export default function DockPlayground() {
  return (
    <Playground
      controls={{
        size: { type: "number", default: 40, min: 28, max: 56 },
        magnification: { type: "number", default: 64, min: 28, max: 100 },
        distance: { type: "number", default: 140, min: 40, max: 300, step: 10 },
      }}
      previewClassName="items-end pb-10"
      render={(p) => (
        <Dock {...p}>
          {apps.map((a) => (
            <DockItem key={a.label} label={a.label}>
              <a.icon />
            </DockItem>
          ))}
        </Dock>
      )}
      code={(p) => `import { Dock, DockItem } from "@/components/ui/dock"

<Dock${jsxProps(p, { size: 40, magnification: 64, distance: 140 })}>
  <DockItem label="Finder"><FolderOpen /></DockItem>
  <DockItem label="Mail"><Mail /></DockItem>
  …
</Dock>`}
    />
  )
}
