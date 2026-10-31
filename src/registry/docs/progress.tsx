import type { ComponentDoc } from "../types"
import Default from "../demos/progress/default"
import Indeterminate from "../demos/progress/indeterminate"
import Ring from "../demos/progress/ring"
import ProgressPlayground from "../playgrounds/progress"

export const doc: ComponentDoc = {
  slug: "progress",
  name: "Progress",
  description: "Spring-animated progress bars and rings, with an indeterminate mode for unknown durations.",
  category: "Feedback",
  primitive: { name: "Radix Progress", href: "https://www.radix-ui.com/primitives/docs/components/progress" },
  dependencies: ["radix-ui", "motion", "class-variance-authority"],
  demos: [
    { name: "default", component: Default },
    { name: "indeterminate", title: "Indeterminate", description: "Pass `value={null}` when you can't measure progress.", component: Indeterminate },
    { name: "ring", title: "Ring", description: "`ProgressRing` for compact, circular progress.", component: Ring },
  ],
  playground: ProgressPlayground,
  usage: {
    imports: `import { Progress, ProgressRing } from "@/components/ui/progress"`,
    code: `<Progress value={42} />
<ProgressRing value={42} showValue />`,
  },
  api: [
    {
      component: "Progress",
      props: [
        { name: "value", type: "number | null", description: "Current value. `null` or omitted renders the indeterminate animation." },
        { name: "max", type: "number", default: "100", description: "Maximum value." },
        { name: "variant", type: '"default" | "brand" | "success" | "warning" | "destructive"', default: '"default"', description: "Indicator color." },
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Track height." },
      ],
    },
    {
      component: "ProgressRing",
      props: [
        { name: "value", type: "number", required: true, description: "Current value." },
        { name: "max", type: "number", default: "100", description: "Maximum value." },
        { name: "size", type: "number", default: "48", description: "Diameter in pixels." },
        { name: "strokeWidth", type: "number", default: "4", description: "Ring thickness." },
        { name: "showValue", type: "boolean", default: "false", description: "Displays the animated percentage in the center." },
      ],
    },
  ],
}
