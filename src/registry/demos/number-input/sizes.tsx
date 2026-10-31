"use client"

import { NumberInput } from "@/components/ui/number-input"

export default function NumberInputSizes() {
  return (
    <div className="flex flex-col items-center gap-3">
      <NumberInput size="sm" defaultValue={8} containerClassName="w-32" aria-label="Small" />
      <NumberInput defaultValue={16} containerClassName="w-36" aria-label="Default" />
      <NumberInput size="lg" defaultValue={32} containerClassName="w-44" aria-label="Large" />
      <NumberInput defaultValue={4} hideControls containerClassName="w-24" aria-label="Without controls" />
    </div>
  )
}
