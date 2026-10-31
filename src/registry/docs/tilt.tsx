import type { ComponentDoc } from "../types"
import Default from "../demos/tilt/default"
import Product from "../demos/tilt/product"
import Settings from "../demos/tilt/settings"
import TiltPlayground from "../playgrounds/tilt"

export const doc: ComponentDoc = {
  slug: "tilt",
  name: "Tilt",
  description: "Tilts a card in 3D toward the cursor with a moving glare, then springs back to rest.",
  category: "Motion",
  dependencies: ["motion"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "product", title: "Product card", description: "Children with `translateZ` float above the surface.", component: Product },
    { name: "settings", title: "Angle & glare", description: "Adjust the maximum angle and toggle the glare.", component: Settings },
  ],
  playground: TiltPlayground,
  usage: {
    imports: "import { Tilt } from \"@/components/ui/tilt\"",
    code: `<Tilt max={10} className="rounded-2xl">
  <Card>…</Card>
</Tilt>`,
  },
  api: [
    {
      component: "Tilt",
      description: "Extends `motion.div`.",
      props: [
        { name: "max", type: "number", default: "10", description: "Maximum tilt in degrees." },
        { name: "scale", type: "number", default: "1.02", description: "Scale while hovered." },
        { name: "glare", type: "boolean", default: "true", description: "Render a light reflection that follows the cursor." },
        { name: "perspective", type: "number", default: "900", description: "CSS perspective in px." },
      ],
    },
  ],
  notes: ["Works with touch while dragging a finger across the card, and keeps vertical page scrolling.", "Disabled with reduced motion."],
}
