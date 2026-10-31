import type { ComponentDoc } from "../types"
import Default from "../demos/magnetic/default"
import Icons from "../demos/magnetic/icons"
import Strength from "../demos/magnetic/strength"
import MagneticPlayground from "../playgrounds/magnetic"

export const doc: ComponentDoc = {
  slug: "magnetic",
  name: "Magnetic",
  description: "Pulls its child toward the cursor with a spring when it gets close. Subtle by default, playful if you want.",
  category: "Motion",
  dependencies: ["motion"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "icons", title: "Nested", description: "Nest two magnets so the icon travels further than its button — instant depth.", component: Icons },
    { name: "strength", title: "Strength & range", description: "Visualize the field of influence and tune it live.", component: Strength },
  ],
  playground: MagneticPlayground,
  usage: {
    imports: "import { Magnetic } from \"@/components/ui/magnetic\"",
    code: `<Magnetic strength={0.35} range={80}>
  <Button>Start building</Button>
</Magnetic>`,
  },
  api: [
    {
      component: "Magnetic",
      description: "Extends `motion.div`.",
      props: [
        { name: "strength", type: "number", default: "0.35", description: "How far the child follows the cursor, from 0 to 1." },
        { name: "range", type: "number", default: "80", description: "Distance in px around the element where the pull applies." },
        { name: "disabled", type: "boolean", default: "false", description: "Turn the effect off." },
      ],
    },
  ],
  notes: ["Only reacts to a mouse — touch and pen input are ignored so taps stay precise.", "Disabled automatically with reduced motion."],
}
