"use client"

import * as React from "react"
import { Calendar, Camera, FolderOpen, Mail, MessageCircle, Music, Settings, Trash2 } from "lucide-react"
import { Dock, DockItem, DockSeparator } from "@/components/ui/dock"

const apps = [
  { id: "finder", label: "Finder", icon: FolderOpen },
  { id: "mail", label: "Mail", icon: Mail, badge: 3 },
  { id: "messages", label: "Messages", icon: MessageCircle },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "music", label: "Music", icon: Music },
  { id: "photos", label: "Photos", icon: Camera },
  { id: "settings", label: "Settings", icon: Settings },
]

export default function DockDemo() {
  // cliquer une app la "lance", le point apparait dessous
  const [open, setOpen] = React.useState<string[]>(["finder", "mail"])
  const toggle = (id: string) => setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]))

  return (
    <div className="flex h-40 w-full items-end justify-center pb-4">
      <Dock>
        {apps.map((app) => (
          <DockItem key={app.id} label={app.label} active={open.includes(app.id)} badge={app.badge} onClick={() => toggle(app.id)}>
            <app.icon />
          </DockItem>
        ))}
        <DockSeparator />
        <DockItem label="Trash" onClick={() => setOpen([])}>
          <Trash2 />
        </DockItem>
      </Dock>
    </div>
  )
}
