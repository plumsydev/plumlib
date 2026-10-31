"use client"

import { Bold, Code, Italic, Link2, Strikethrough } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const tools = [
  { icon: Bold, label: "Bold", keys: "⌘B" },
  { icon: Italic, label: "Italic", keys: "⌘I" },
  { icon: Strikethrough, label: "Strikethrough", keys: "⌘⇧X" },
  { icon: Code, label: "Inline code", keys: "⌘E" },
  { icon: Link2, label: "Link", keys: "⌘K" },
]

export default function TooltipDemo() {
  return (
    // un provider commun => passer d'un bouton à l'autre ouvre direct sans délai
    <TooltipProvider>
      <div className="flex items-center gap-0.5 rounded-lg border bg-background p-1 shadow-xs">
        {tools.map((t) => (
          <Tooltip key={t.label}>
            <TooltipTrigger asChild>
              <Button size="icon-sm" variant="ghost" aria-label={t.label}>
                <t.icon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {t.label}
              <kbd>{t.keys}</kbd>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}
