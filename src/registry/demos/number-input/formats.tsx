"use client"

import { NumberInput } from "@/components/ui/number-input"
import { Label } from "@/components/ui/label"

export default function NumberInputFormats() {
  return (
    <div className="grid w-full max-w-sm gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <Label>Monthly budget</Label>
        <NumberInput
          defaultValue={1500}
          step={50}
          min={0}
          format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
        />
      </div>
      <div className="space-y-2">
        <Label>Discount</Label>
        <NumberInput defaultValue={0.15} step={0.05} min={0} max={1} format={{ style: "percent" }} />
      </div>
      <div className="space-y-2">
        <Label>Weight</Label>
        <NumberInput defaultValue={2.5} step={0.1} min={0} format={{ style: "unit", unit: "kilogram", maximumFractionDigits: 1 }} />
      </div>
      <div className="space-y-2">
        <Label>Replicas</Label>
        <NumberInput defaultValue={3} min={1} max={12} size="sm" />
      </div>
    </div>
  )
}
