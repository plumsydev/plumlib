"use client"

import * as React from "react"
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Link2, List, ListOrdered, Underline } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Toggle } from "@/components/ui/toggle"

const groups = [
  [
    { icon: Bold, label: "Bold" },
    { icon: Italic, label: "Italic" },
    { icon: Underline, label: "Underline" },
  ],
  [
    { icon: AlignLeft, label: "Align left" },
    { icon: AlignCenter, label: "Align center" },
    { icon: AlignRight, label: "Align right" },
  ],
  [
    { icon: List, label: "Bullet list" },
    { icon: ListOrdered, label: "Numbered list" },
  ],
  [{ icon: Link2, label: "Link" }],
]

export default function SeparatorToolbar() {
  return (
    <div className="flex h-10 items-center gap-1 rounded-lg border bg-card px-1.5 shadow-xs">
      {groups.map((g, gi) => (
        <React.Fragment key={gi}>
          {gi > 0 && <Separator orientation="vertical" className="mx-1 !h-5" />}
          {g.map(({ icon: Icon, label }) => (
            <Toggle key={label} size="sm" aria-label={label}>
              <Icon />
            </Toggle>
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}
