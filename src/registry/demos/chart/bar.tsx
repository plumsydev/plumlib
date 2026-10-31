"use client"

import * as React from "react"
import { BarChart } from "@/components/ui/chart"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const data = [
  { month: "Jan", subscriptions: 4200, services: 1800, addons: 640 },
  { month: "Feb", subscriptions: 4600, services: 1500, addons: 720 },
  { month: "Mar", subscriptions: 5100, services: 2100, addons: 810 },
  { month: "Apr", subscriptions: 4900, services: 2400, addons: 760 },
  { month: "May", subscriptions: 5600, services: 2000, addons: 980 },
  { month: "Jun", subscriptions: 6200, services: 2600, addons: 1120 },
  { month: "Jul", subscriptions: 6800, services: 2300, addons: 1240 },
  { month: "Aug", subscriptions: 7100, services: 2900, addons: 1310 },
]

const money = (v: number) => `€${new Intl.NumberFormat("en-US", { notation: "compact" }).format(v)}`

export default function ChartBar() {
  const [mode, setMode] = React.useState("grouped")
  return (
    <div className="w-full max-w-2xl rounded-xl border bg-card p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-medium">Revenue by source</div>
          <div className="text-xs text-muted-foreground">Click the legend to hide a series</div>
        </div>
        <ToggleGroup type="single" variant="outline" size="sm" value={mode} onValueChange={(v) => v && setMode(v)}>
          <ToggleGroupItem value="grouped">Grouped</ToggleGroupItem>
          <ToggleGroupItem value="stacked">Stacked</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <BarChart
        data={data}
        index="month"
        stacked={mode === "stacked"}
        valueFormatter={money}
        series={[
          { key: "subscriptions", label: "Subscriptions" },
          { key: "services", label: "Services" },
          { key: "addons", label: "Add-ons" },
        ]}
      />
    </div>
  )
}
