"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const MAX = 180

export default function TextareaWithCounter() {
  const [value, setValue] = React.useState("")
  const over = value.length > MAX

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="bio">Bio</Label>
      <Textarea
        id="bio"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-invalid={over || undefined}
        placeholder="Designer turned engineer. Ships on Fridays."
      />
      <p className={cn("text-right text-xs tabular-nums text-muted-foreground transition-colors", over && "text-destructive")}>
        {value.length}/{MAX}
      </p>
    </div>
  )
}
