"use client"

import * as React from "react"
import { Combobox } from "@/components/ui/combobox"
import { Label } from "@/components/ui/label"

const people = ["Léa Martin", "Alex Kim", "Sam Rivera", "Noah Weber", "Maya Chen", "Jules Dubois", "Iris Novak"].map((name) => ({
  // on vire les accents sinon "Léa" devient "l-a" mskn
  value: name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\W+/g, "-"),
  label: name,
  icon: (
    <span className="grid size-5 place-items-center rounded-full bg-muted text-[9px] font-semibold text-muted-foreground">
      {name.split(" ").map((p) => p[0]).join("")}
    </span>
  ),
}))

export default function ComboboxMultiple() {
  const [value, setValue] = React.useState(["lea-martin", "alex-kim"])
  return (
    <div className="w-full max-w-sm space-y-2">
      <Label>Reviewers</Label>
      <Combobox multiple options={people} value={value} onValueChange={setValue} placeholder="Add reviewers" maxBadges={3} />
      <p className="text-xs text-muted-foreground">{value.length} reviewer{value.length === 1 ? "" : "s"} will be notified.</p>
    </div>
  )
}
