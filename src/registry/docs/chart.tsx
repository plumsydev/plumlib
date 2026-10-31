import type { ComponentDoc } from "../types"
import Default from "../demos/chart/default"
import Bar from "../demos/chart/bar"
import Live from "../demos/chart/live"
import SparklineDemo from "../demos/chart/sparkline"
import ChartPlayground from "../playgrounds/chart"

export const doc: ComponentDoc = {
  slug: "chart",
  name: "Chart",
  description: "Area, line, bar and sparkline charts drawn in plain SVG. Curves draw in, bars grow, data changes morph, and the tooltip follows your cursor.",
  category: "Data Display",
  dependencies: ["motion"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "bar", title: "Bar chart", description: "Grouped or stacked. The legend toggles series.", component: Bar },
    { name: "live", title: "Live data", description: "Feed new points and the line glides instead of jumping.", component: Live },
    { name: "sparkline", title: "Sparklines", description: "Tiny trend lines for KPI cards.", component: SparklineDemo },
  ],
  playground: ChartPlayground,
  usage: {
    imports: `import { AreaChart, BarChart, LineChart, Sparkline } from "@/components/ui/chart"`,
    code: `<AreaChart
  data={data}
  index="month"
  series={[
    { key: "desktop", label: "Desktop" },
    { key: "mobile", label: "Mobile" },
  ]}
/>`,
  },
  api: [
    {
      component: "AreaChart / LineChart / BarChart",
      props: [
        { name: "data", type: "Record<string, string | number>[]", required: true, description: "One object per x value." },
        { name: "index", type: "string", required: true, description: "Key used for the x axis." },
        { name: "series", type: "{ key: string; label?: string; color?: string }[]", required: true, description: "Values to plot. Colors default to the theme palette." },
        { name: "height", type: "number", default: "260", description: "Height in px. Width follows the container." },
        { name: "stacked", type: "boolean", default: "false", description: "Stack series on top of each other." },
        { name: "grid / xAxis / yAxis / legend / tooltip", type: "boolean", default: "true", description: "Toggle chart furniture." },
        { name: "valueFormatter", type: "(value: number) => string", description: "Formats ticks and tooltip values." },
        { name: "curve", type: '"smooth" | "linear"', default: '"smooth"', description: "Area and line only." },
        { name: "dots", type: "boolean", default: "false", description: "Area and line only. Show a dot on each point." },
      ],
    },
    {
      component: "Sparkline",
      props: [
        { name: "data", type: "number[]", required: true, description: "The values." },
        { name: "color", type: "string", default: '"var(--brand)"', description: "Stroke color." },
        { name: "fill", type: "boolean", default: "true", description: "Gradient under the line." },
      ],
    },
  ],
  notes: [
    "Define `--chart-1` to `--chart-5` in your theme to change the default palette.",
    "Smooth curves use monotone interpolation, so they never overshoot your data.",
  ],
}
