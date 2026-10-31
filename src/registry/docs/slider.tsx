import type { ComponentDoc } from "../types"
import Default from "../demos/slider/default"
import Tooltip from "../demos/slider/tooltip"
import Range from "../demos/slider/range"
import Vertical from "../demos/slider/vertical"
import Playground from "../playgrounds/slider"

export const doc: ComponentDoc = {
  slug: "slider",
  name: "Slider",
  description: "Pick a value or a range. The track thickens and the thumb grows while you drag.",
  category: "Inputs",
  primitive: { name: "Radix Slider", href: "https://www.radix-ui.com/primitives/docs/components/slider" },
  dependencies: ["radix-ui", "motion"],
  demos: [
    { name: "default", component: Default },
    { name: "tooltip", title: "Value tooltip", description: "`showTooltip` floats the formatted value above the thumb while dragging.", component: Tooltip },
    { name: "range", title: "Range", description: "Pass two values for a range.", component: Range },
    { name: "vertical", title: "Vertical", component: Vertical },
  ],
  registryDependencies: ["label"],
  playground: Playground,
  usage: {
    imports: `import { Slider } from "@/components/ui/slider"`,
    code: `<Slider defaultValue={[50]} max={100} step={1} />`,
  },
  api: [
    {
      component: "Slider",
      description: "Extends Radix `Slider.Root`.",
      props: [
        { name: "value", type: "number[]", description: "Controlled values, one per thumb." },
        { name: "defaultValue", type: "number[]", default: "[min]", description: "Uncontrolled initial values." },
        { name: "onValueChange", type: "(value: number[]) => void", description: "Called while dragging." },
        { name: "min / max / step", type: "number", default: "0 / 100 / 1", description: "Range and granularity." },
        { name: "showTooltip", type: "boolean", default: "false", description: "Show the value above the thumb while dragging." },
        { name: "formatValue", type: "(value: number) => ReactNode", description: "Format the tooltip value." },
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Layout direction." },
      ],
    },
  ],
}
