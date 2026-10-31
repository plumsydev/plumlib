"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <Checkbox id="c-1" defaultChecked />
        <Label htmlFor="c-1">Enable preview deployments</Label>
      </div>
      <div className="flex items-start gap-2.5">
        <Checkbox id="c-2" />
        <div className="grid gap-1.5">
          <Label htmlFor="c-2">Require approval</Label>
          <p className="text-sm text-muted-foreground">A teammate must review before production.</p>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <Checkbox id="c-3" disabled />
        <Label htmlFor="c-3">Locked by your organization</Label>
      </div>
    </div>
  )
}
