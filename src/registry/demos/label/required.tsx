"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function LabelRequired() {
  const [bio, setBio] = React.useState("")
  return (
    <form className="grid w-full max-w-sm gap-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid gap-2">
        <Label htmlFor="lr-name">
          Full name <span className="text-destructive">*</span>
        </Label>
        <Input id="lr-name" required placeholder="Ada Lovelace" />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="lr-bio">Bio</Label>
          <span className="text-xs text-muted-foreground tabular-nums">{bio.length} / 160</span>
        </div>
        <Textarea id="lr-bio" maxLength={160} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Optional" autoResize />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="lr-locked">Workspace URL</Label>
        <Input id="lr-locked" disabled defaultValue="acme.plum.dev" />
        <p className="text-xs text-muted-foreground">Labels dim automatically next to disabled controls.</p>
      </div>
    </form>
  )
}
