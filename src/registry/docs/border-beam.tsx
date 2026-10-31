import type { ComponentDoc } from "../types"
import Default from "../demos/border-beam/default"
import Double from "../demos/border-beam/double"
import Status from "../demos/border-beam/status"
import BorderBeamPlayground from "../playgrounds/border-beam"

export const doc: ComponentDoc = {
  slug: "border-beam",
  name: "Border Beam",
  description: "A beam of light that travels around an element's border. Great for highlighting a card or signaling work in progress.",
  category: "Motion",
  dependencies: ["motion"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "double", title: "Two beams", description: "Two beams with opposite directions and offset timing.", component: Double },
    { name: "status", title: "As a status", description: "Mount it only while a build runs.", component: Status },
  ],
  playground: BorderBeamPlayground,
  usage: {
    imports: "import { BorderBeam } from \"@/components/ui/border-beam\"",
    code: `<div className="relative rounded-2xl border p-6">
  …
  <BorderBeam />
</div>`,
  },
  api: [
    {
      component: "BorderBeam",
      description: "Place inside a `relative` parent with a border radius.",
      props: [
        { name: "size", type: "number", default: "80", description: "Beam length in px." },
        { name: "duration", type: "number", default: "6", description: "Seconds per lap." },
        { name: "delay", type: "number", default: "0", description: "Offset in seconds, to stagger several beams." },
        { name: "borderWidth", type: "number", default: "1", description: "Thickness in px — match the parent border." },
        { name: "colorFrom", type: "string", default: "\"var(--foreground)\"", description: "Head color of the beam." },
        { name: "colorTo", type: "string", default: "\"transparent\"", description: "Tail color of the beam." },
        { name: "reverse", type: "boolean", default: "false", description: "Travel counter-clockwise." },
      ],
    },
  ],
  notes: ["Uses CSS `offset-path: rect()` and a border mask — no SVG, no measuring.", "Renders nothing with reduced motion."],
}
