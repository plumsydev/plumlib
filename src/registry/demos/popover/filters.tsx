"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { ListFilter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { spring } from "@/lib/motion"

const issues = [
  { id: "PLM-142", title: "Toast stack jumps on resize", status: "In progress", priority: "High" },
  { id: "PLM-139", title: "Calendar keyboard navigation", status: "Todo", priority: "Medium" },
  { id: "PLM-133", title: "Dark mode border contrast", status: "Done", priority: "Low" },
  { id: "PLM-128", title: "Command palette fuzzy ranking", status: "In progress", priority: "Medium" },
  { id: "PLM-121", title: "Drawer snap points on iOS", status: "Todo", priority: "High" },
]

const statuses = ["Todo", "In progress", "Done"]

export default function PopoverFilters() {
  const [active, setActive] = React.useState<string[]>(["Todo", "In progress"])
  const shown = issues.filter((i) => active.includes(i.status))

  return (
    <div className="w-full max-w-md space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Issues</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm" variant="outline">
              <ListFilter /> Status
              <Badge variant="secondary" className="ml-0.5 px-1.5 tabular-nums">{active.length}</Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-52 p-2" showArrow>
            <p className="px-2 pt-1 pb-2 text-xs font-medium text-muted-foreground">Filter by status</p>
            {statuses.map((s) => (
              <Label key={s} className="flex cursor-pointer items-center justify-between rounded-md px-2 py-2 font-normal hover:bg-accent">
                <span className="flex items-center gap-2.5">
                  <Checkbox
                    checked={active.includes(s)}
                    onCheckedChange={(c) => setActive((all) => (c ? [...all, s] : all.filter((x) => x !== s)))}
                  />
                  {s}
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">{issues.filter((i) => i.status === s).length}</span>
              </Label>
            ))}
          </PopoverContent>
        </Popover>
      </div>
      <ul className="divide-y rounded-lg border">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((i) => (
            <motion.li
              key={i.id}
              layout
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={spring.smooth}
              className="flex items-center gap-3 bg-background px-3 py-2.5 text-sm first:rounded-t-lg last:rounded-b-lg"
            >
              <span className="font-mono text-xs text-muted-foreground">{i.id}</span>
              <span className="flex-1 truncate">{i.title}</span>
              <Badge variant={i.priority === "High" ? "destructive" : "outline"}>{i.priority}</Badge>
            </motion.li>
          ))}
        </AnimatePresence>
        {shown.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted-foreground">No issues match.</li>}
      </ul>
    </div>
  )
}
