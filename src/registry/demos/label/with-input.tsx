"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LabelWithInput() {
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor="team">Team name</Label>
      <Input id="team" placeholder="Acme Design" />
    </div>
  )
}
