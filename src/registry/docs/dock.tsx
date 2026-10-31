import type { ComponentDoc } from "../types"
import Default from "../demos/dock/default"
import Toolbar from "../demos/dock/toolbar"
import Large from "../demos/dock/large"
import DockPlayground from "../playgrounds/dock"

export const doc: ComponentDoc = {
  slug: "dock",
  name: "Dock",
  description: "A macOS-style dock: icons magnify under the cursor with springs, show labels and running indicators.",
  category: "Motion",
  dependencies: ["motion"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "toolbar", title: "Tool picker", description: "A compact dock as a design-tool toolbar, with keyboard shortcuts.", component: Toolbar },
    { name: "large", title: "Magnification", description: "Tune the magnification and the radius of influence.", component: Large },
  ],
  playground: DockPlayground,
  usage: {
    imports: "import { Dock, DockItem, DockSeparator } from \"@/components/ui/dock\"",
    code: `<Dock>
  <DockItem label="Mail" badge={3}>
    <Mail />
  </DockItem>
  <DockSeparator />
  <DockItem label="Trash">
    <Trash2 />
  </DockItem>
</Dock>`,
  },
  api: [
    {
      component: "Dock",
      description: "Extends `div`, rendered as a toolbar.",
      props: [
        { name: "size", type: "number", default: "40", description: "Resting icon size in px." },
        { name: "magnification", type: "number", default: "64", description: "Icon size right under the cursor." },
        { name: "distance", type: "number", default: "140", description: "Radius of influence in px." },
      ],
    },
    {
      component: "DockItem",
      description: "Extends `motion.button`.",
      props: [
        { name: "label", type: "string", required: true, description: "Tooltip text and accessible name." },
        { name: "active", type: "boolean", default: "false", description: "Shows the running indicator and sets aria-pressed." },
        { name: "badge", type: "ReactNode", description: "Small notification badge." },
      ],
    },
    {
      component: "DockSeparator",
      description: "A vertical divider between groups.",
      props: [
      ],
    },
  ],
  notes: ["The dock keeps a fixed height; icons grow upward without pushing the layout.", "Keyboard focus shows the label too."],
}
