"use client"

import { Input } from "@/components/ui/input"

export default function InputStates() {
  return (
    <div className="grid w-full max-w-xs gap-3">
      <Input defaultValue="acme-inc" aria-invalid />
      <Input placeholder="Disabled" disabled />
      <Input type="file" />
    </div>
  )
}
