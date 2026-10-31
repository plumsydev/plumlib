"use client"

import { AreaChart, BarChart, LineChart } from "@/components/ui/chart"
import { Playground } from "@/components/site/playground"

const data = [
  { month: "Jan", signups: 320, trials: 180 },
  { month: "Feb", signups: 410, trials: 210 },
  { month: "Mar", signups: 380, trials: 260 },
  { month: "Apr", signups: 520, trials: 300 },
  { month: "May", signups: 610, trials: 280 },
  { month: "Jun", signups: 580, trials: 340 },
  { month: "Jul", signups: 720, trials: 390 },
]

const series = [
  { key: "signups", label: "Signups" },
  { key: "trials", label: "Trials" },
]

export default function ChartPlayground() {
  return (
    <Playground
      controls={{
        type: { type: "select", options: ["area", "line", "bar"], default: "area" },
        stacked: { type: "boolean", default: false },
        curve: { type: "select", options: ["smooth", "linear"], default: "smooth" },
        grid: { type: "boolean", default: true },
        dots: { type: "boolean", default: false },
        legend: { type: "boolean", default: true },
      }}
      previewClassName="p-6"
      render={({ type, stacked, curve, grid, dots, legend }) => {
        const common = { data, index: "month", series, grid, legend, height: 240 }
        return (
          <div className="w-full">
            {type === "bar" ? (
              <BarChart {...common} stacked={stacked} />
            ) : type === "line" ? (
              <LineChart {...common} curve={curve} dots={dots} />
            ) : (
              <AreaChart {...common} stacked={stacked} curve={curve} dots={dots} />
            )}
          </div>
        )
      }}
      code={({ type, stacked, curve, grid, dots, legend }) => {
        const name = { area: "AreaChart", line: "LineChart", bar: "BarChart" }[type]
        const extra = [
          stacked && type !== "line" ? "stacked" : "",
          type !== "bar" && curve !== "smooth" ? `curve="${curve}"` : "",
          type !== "bar" && dots ? "dots" : "",
          grid ? "" : "grid={false}",
          legend ? "" : "legend={false}",
        ].filter(Boolean)
        return `<${name}
  data={data}
  index="month"
  series={[
    { key: "signups", label: "Signups" },
    { key: "trials", label: "Trials" },
  ]}${extra.map((e) => `\n  ${e}`).join("")}
/>`
      }}
    />
  )
}
