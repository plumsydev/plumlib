"use client"

import { Switch } from "@/components/ui/switch"

export default function SwitchSizes() {
  return (
    <div className="flex items-center gap-4">
      <Switch size="sm" aria-label="Small" defaultChecked />
      <Switch aria-label="Default" defaultChecked />
      <Switch size="lg" aria-label="Large" defaultChecked />
      <Switch aria-label="Disabled" disabled />
    </div>
  )
}
