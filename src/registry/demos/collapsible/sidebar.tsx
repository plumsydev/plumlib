"use client"

import * as React from "react"
import { ChevronRight, FolderKanban, Inbox, LayoutDashboard, Settings } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const groups = [
  { title: "Workspace", icon: LayoutDashboard, items: ["Overview", "Activity", "Usage"] },
  { title: "Projects", icon: FolderKanban, items: ["acme-web", "acme-api", "marketing-site", "docs"] },
  { title: "Inbox", icon: Inbox, items: ["Mentions", "Assigned", "Archived"] },
  { title: "Settings", icon: Settings, items: ["General", "Members", "Billing"] },
]

export default function CollapsibleSidebar() {
  const [active, setActive] = React.useState("acme-web")
  return (
    <nav className="w-60 space-y-1 rounded-xl border bg-card p-2 text-sm">
      {groups.map((g, i) => (
        <Collapsible key={g.title} defaultOpen={i < 2}>
          <CollapsibleTrigger className="group flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 font-medium outline-none transition-colors hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring">
            <g.icon className="size-4 text-muted-foreground" />
            {g.title}
            <span className="ml-auto text-xs font-normal text-muted-foreground tabular-nums">{g.items.length}</span>
            <ChevronRight className="size-3.5 text-muted-foreground transition-transform duration-300 ease-out-expo group-data-[state=open]:rotate-90" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="ml-4 border-l py-1 pl-2">
              {g.items.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setActive(item)}
                  className={`block w-full cursor-pointer rounded-md px-2 py-1 text-left transition-colors hover:bg-accent ${
                    active === item ? "bg-accent font-medium text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </nav>
  )
}
