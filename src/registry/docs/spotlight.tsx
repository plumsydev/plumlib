import type { ComponentDoc } from "../types"
import Default from "../demos/spotlight/default"
import Card from "../demos/spotlight/card"
import Grid from "../demos/spotlight/grid"
import SpotlightPlayground from "../playgrounds/spotlight"

export const doc: ComponentDoc = {
  slug: "spotlight",
  name: "Spotlight",
  description: "A soft light that follows the cursor and catches the border. Group cards to light up their neighbors too.",
  category: "Motion",
  dependencies: ["motion"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "card", title: "Single card", description: "One card on its own, halo and border.", component: Card },
    { name: "grid", title: "Bordered grid", description: "`border={false}` on cells of a gap-px grid for a quieter look.", component: Grid },
  ],
  playground: SpotlightPlayground,
  usage: {
    imports: "import { Spotlight, SpotlightGroup } from \"@/components/ui/spotlight\"",
    code: `<SpotlightGroup className="grid grid-cols-3 gap-3">
  <Spotlight className="rounded-xl border p-5">…</Spotlight>
  <Spotlight className="rounded-xl border p-5">…</Spotlight>
</SpotlightGroup>`,
  },
  api: [
    {
      component: "Spotlight",
      description: "Extends `div`.",
      props: [
        { name: "size", type: "number", default: "360", description: "Diameter of the light in px." },
        { name: "border", type: "boolean", default: "true", description: "Light up the border near the cursor." },
        { name: "fill", type: "boolean", default: "true", description: "Show the halo inside the card." },
      ],
    },
    {
      component: "SpotlightGroup",
      description: "Tracks the cursor for every `Spotlight` inside it, so borders of nearby cards glow as you approach.",
      props: [
      ],
    },
  ],
  notes: ["Pointer tracking writes CSS variables directly — no React re-render per mouse move.", "Give the `Spotlight` a `rounded-*` class; the border light inherits the radius."],
}
