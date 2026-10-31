"use client"

import * as React from "react"
import { Plus, X } from "lucide-react"
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

type Task = { id: number; text: string; done: boolean }

export default function AnimatedListTasks() {
  const [tasks, setTasks] = React.useState<Task[]>([
    { id: 1, text: "Review dock PR", done: false },
    { id: 2, text: "Write changelog", done: true },
    { id: 3, text: "Record demo video", done: false },
  ])
  const [draft, setDraft] = React.useState("")
  const id = React.useRef(4)

  const add = (e: React.FormEvent) => {
    e.preventDefault()
    if (!draft.trim()) return
    setTasks((t) => [{ id: id.current++, text: draft.trim(), done: false }, ...t])
    setDraft("")
  }

  return (
    <div className="w-full max-w-sm space-y-3">
      <form onSubmit={add} className="flex gap-2">
        <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Add a task and press enter" />
        <Button size="icon" type="submit" aria-label="Add task">
          <Plus />
        </Button>
      </form>
      <AnimatedList className="gap-1.5">
        {tasks.map((task) => (
          <AnimatedListItem key={task.id}>
            <div className="group flex items-center gap-3 rounded-lg border bg-card px-3 py-2.5">
              <Checkbox
                checked={task.done}
                onCheckedChange={(v) => setTasks((t) => t.map((x) => (x.id === task.id ? { ...x, done: v === true } : x)))}
                aria-label={task.text}
              />
              <span className={`flex-1 text-sm transition-colors ${task.done ? "text-muted-foreground line-through" : ""}`}>{task.text}</span>
              <button
                type="button"
                aria-label="Remove"
                onClick={() => setTasks((t) => t.filter((x) => x.id !== task.id))}
                className="cursor-pointer rounded p-0.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground focus-visible:opacity-100"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </AnimatedListItem>
        ))}
      </AnimatedList>
    </div>
  )
}
