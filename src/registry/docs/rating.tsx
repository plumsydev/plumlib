import type { ComponentDoc } from "../types"
import Default from "../demos/rating/default"
import Half from "../demos/rating/half"
import Review from "../demos/rating/review"
import Playground from "../playgrounds/rating"

export const doc: ComponentDoc = {
  slug: "rating",
  name: "Rating",
  description: "Stars that preview on hover, fill smoothly and pop in a cascade when you pick one. Half stars and keyboard included.",
  category: "Inputs",
  isNew: true,
  dependencies: ["motion", "class-variance-authority"],
  demos: [
    { name: "default", component: Default },
    { name: "half", title: "Half stars", component: Half },
    { name: "review", title: "Review form", description: "A read-only summary next to an interactive rating.", component: Review },
  ],
  playground: Playground,
  usage: {
    imports: `import { Rating } from "@/components/ui/rating"`,
    code: `<Rating defaultValue={4} />`,
  },
  api: [
    {
      component: "Rating",
      props: [
        { name: "value", type: "number", description: "Controlled value." },
        { name: "defaultValue", type: "number", default: "0", description: "Initial value when uncontrolled." },
        { name: "onValueChange", type: "(value: number) => void", description: "Clicking the current value resets to 0." },
        { name: "max", type: "number", default: "5", description: "Number of stars." },
        { name: "allowHalf", type: "boolean", default: "false", description: "Pick halves by pointing at the left side of a star." },
        { name: "readOnly", type: "boolean", default: "false", description: "Display only, accepts fractional values." },
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Star size." },
        { name: "icon", type: "(className: string) => ReactNode", description: "Replace the star with any icon." },
      ],
    },
  ],
  notes: ["Behaves like a slider for assistive tech: arrow keys step, Home and End jump to the ends."],
}
