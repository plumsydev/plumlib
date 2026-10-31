"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { MoreHorizontal, Plus, Trash2, Flag, Copy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { toast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"

type Task = { id: number; title: string; done: boolean; priority?: boolean; label: string }

const seed: Task[] = [
  { id: 1, title: "Ship the new onboarding flow", done: false, priority: true, label: "Product" },
  { id: 2, title: "Fix flaky deploy preview test", done: true, label: "Eng" },
  { id: 3, title: "Write the Q4 changelog", done: false, label: "Docs" },
  { id: 4, title: "Review pricing page copy", done: false, label: "Marketing" },
]

let nextId = 10

export default function TasksBlock() {
  const [tasks, setTasks] = React.useState(seed)
  const [filter, setFilter] = React.useState("all")
  const [draft, setDraft] = React.useState("")

  const visible = tasks.filter((t) => (filter === "open" ? !t.done : filter === "done" ? t.done : true))
  const done = tasks.filter((t) => t.done).length

  const update = (id: number, patch: Partial<Task>) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, ...patch } : t)))

  const remove = (task: Task) => {
    const index = tasks.findIndex((t) => t.id === task.id)
    setTasks((ts) => ts.filter((t) => t.id !== task.id))
    // l'undo remet la tâche à sa place d'origine, pas tt en bas
    toast("Task deleted", {
      description: task.title,
      action: {
        label: "Undo",
        onClick: () => setTasks((ts) => [...ts.slice(0, index), task, ...ts.slice(index)]),
      },
    })
  }

  const add = (e: React.FormEvent) => {
    e.preventDefault()
    if (!draft.trim()) return
    setTasks((ts) => [{ id: nextId++, title: draft.trim(), done: false, label: "Inbox" }, ...ts])
    setDraft("")
  }

  return (
    <div className="w-full max-w-xl rounded-2xl border bg-card shadow-lg">
      <div className="space-y-4 border-b p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold tracking-tight">This week</h3>
          <span className="text-sm text-muted-foreground tabular-nums">
            {done}/{tasks.length} done
          </span>
        </div>
        <Progress value={tasks.length ? (done / tasks.length) * 100 : 0} />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <form onSubmit={add} className="flex min-w-0 flex-1 gap-2">
            <Input placeholder="Add a task and press Enter" value={draft} onChange={(e) => setDraft(e.target.value)} size="sm" />
            <Button size="icon-sm" type="submit" aria-label="Add task"><Plus /></Button>
          </form>
          <ToggleGroup type="single" size="sm" variant="outline" value={filter} onValueChange={(v) => v && setFilter(v)}>
            <ToggleGroupItem value="all">All</ToggleGroupItem>
            <ToggleGroupItem value="open">Open</ToggleGroupItem>
            <ToggleGroupItem value="done">Done</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <ul className="relative min-h-60 p-2">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((task) => (
            <motion.li
              key={task.id}
              layout
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24, transition: { duration: 0.18 } }}
              transition={spring.snappy}
              className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent/60"
            >
              <Checkbox checked={task.done} onCheckedChange={(v) => update(task.id, { done: v === true })} aria-label={task.title} />
              <span className="relative min-w-0 flex-1 truncate text-sm">
                <span className={cn("transition-colors duration-300", task.done && "text-muted-foreground")}>{task.title}</span>
                {/* le barré se dessine de gauche à droite */}
                <span
                  className="pointer-events-none absolute top-1/2 left-0 h-px origin-left bg-muted-foreground transition-transform duration-500 ease-out-expo"
                  style={{ width: "100%", transform: `scaleX(${task.done ? 1 : 0})` }}
                />
              </span>
              {task.priority && <Flag className="size-3.5 text-warning" />}
              <Badge variant="secondary" className="hidden sm:inline-flex">{task.label}</Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-xs" className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 data-[state=open]:opacity-100" aria-label="Task actions">
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => update(task.id, { priority: !task.priority })}>
                    <Flag /> {task.priority ? "Remove priority" : "Mark as priority"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      setTasks((ts) => [...ts, { ...task, id: nextId++, title: `${task.title} (copy)`, done: false }])
                      toast.success("Task duplicated")
                    }}
                  >
                    <Copy /> Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onSelect={() => remove(task)}>
                    <Trash2 /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.li>
          ))}
        </AnimatePresence>
        {visible.length === 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
            Nothing here. Enjoy the calm.
          </motion.p>
        )}
      </ul>
    </div>
  )
}
