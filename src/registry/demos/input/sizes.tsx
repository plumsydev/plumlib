"use client"

import { Input } from "@/components/ui/input"

export default function InputSizes() {
  return (
    <div className="grid w-full max-w-xs gap-3">
      <Input size="sm" placeholder="Small" />
      <Input placeholder="Default" />
      <Input size="lg" placeholder="Large" />
    </div>
  )
}
