"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const scopes = ["Read repositories", "Write issues", "Manage webhooks"]

export default function CheckboxIndeterminate() {
  const [selected, setSelected] = React.useState<string[]>([scopes[0]])
  const all = selected.length === scopes.length
  const some = selected.length > 0 && !all

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <Checkbox
          id="all"
          checked={all ? true : some ? "indeterminate" : false}
          onCheckedChange={(v) => setSelected(v === true ? scopes : [])}
        />
        <Label htmlFor="all">All permissions</Label>
      </div>
      <div className="ml-6 flex flex-col gap-3 border-l pl-4">
        {scopes.map((s) => (
          <div key={s} className="flex items-center gap-2.5">
            <Checkbox
              id={s}
              checked={selected.includes(s)}
              onCheckedChange={(v) => setSelected((prev) => (v ? [...prev, s] : prev.filter((x) => x !== s)))}
            />
            <Label htmlFor={s} className="font-normal">{s}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}
