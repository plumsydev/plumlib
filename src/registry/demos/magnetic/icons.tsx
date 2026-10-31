"use client"

import { Bell, Inbox, Search, Settings } from "lucide-react"
import { Magnetic } from "@/components/ui/magnetic"

const items = [
  { icon: Search, label: "Search" },
  { icon: Inbox, label: "Inbox" },
  { icon: Bell, label: "Notifications" },
  { icon: Settings, label: "Settings" },
]

export default function MagneticIcons() {
  return (
    <div className="flex items-center gap-2 rounded-full border bg-card p-2 shadow-sm">
      {items.map(({ icon: Icon, label }) => (
        <Magnetic key={label} strength={0.5} range={36}>
          <button
            type="button"
            aria-label={label}
            className="flex size-11 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {/* l'icône bouge un peu plus que le bouton, ça donne de la profondeur */}
            <Magnetic strength={0.3} range={36}>
              <Icon className="size-5" />
            </Magnetic>
          </button>
        </Magnetic>
      ))}
    </div>
  )
}
