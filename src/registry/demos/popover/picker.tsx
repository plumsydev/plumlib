"use client"

import * as React from "react"
import { Check, Circle, CircleCheck, CircleDashed, CircleDot, CircleX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const statuses = [
  { value: "backlog", label: "Backlog", icon: CircleDashed },
  { value: "todo", label: "Todo", icon: Circle },
  { value: "progress", label: "In progress", icon: CircleDot },
  { value: "done", label: "Done", icon: CircleCheck },
  { value: "canceled", label: "Canceled", icon: CircleX },
]

export default function PopoverPicker() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("progress")
  const current = statuses.find((s) => s.value === value)!

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="w-36 justify-start">
          <current.icon /> {current.label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-1" align="start">
        {statuses.map((s) => (
          <button
            key={s.value}
            type="button"
            onClick={() => {
              setValue(s.value)
              setOpen(false)
            }}
            className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus-visible:bg-accent"
          >
            <s.icon className="size-4 text-muted-foreground" />
            {s.label}
            {value === s.value && <Check className="ml-auto size-4" />}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
