"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Sortable, SortableHandle, SortableItem } from "@/components/ui/sortable"

const initial = [
  { id: "t1", title: "Migrate auth to passkeys", done: false },
  { id: "t2", title: "Write the onboarding emails", done: true },
  { id: "t3", title: "Fix flaky checkout test", done: false },
  { id: "t4", title: "Ship dark mode for the dashboard", done: false },
  { id: "t5", title: "Review pricing page copy", done: false },
]

export default function SortableDemo() {
  const [tasks, setTasks] = React.useState(initial)

  return (
    <Sortable values={tasks} onValuesChange={setTasks} className="w-full max-w-sm gap-2">
      {tasks.map((task) => (
        <SortableItem key={task.id} value={task} className="flex items-center gap-2 border py-2 pr-3 pl-1.5">
          <SortableHandle />
          <Checkbox
            checked={task.done}
            onCheckedChange={(v) => setTasks((ts) => ts.map((t) => (t.id === task.id ? { ...t, done: v === true } : t)))}
            aria-label={task.title}
          />
          <span className={task.done ? "text-sm text-muted-foreground line-through" : "text-sm"}>{task.title}</span>
        </SortableItem>
      ))}
    </Sortable>
  )
}
