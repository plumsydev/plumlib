import type { ComponentDoc } from "../types"
import Default from "../demos/switch/default"
import Sizes from "../demos/switch/sizes"
import Settings from "../demos/switch/settings"

export const doc: ComponentDoc = {
  slug: "switch",
  name: "Switch",
  description: "A toggle for instant settings. The thumb stretches while pressed and settles on a spring curve.",
  category: "Inputs",
  primitive: { name: "Radix Switch", href: "https://www.radix-ui.com/primitives/docs/components/switch" },
  dependencies: ["radix-ui", "class-variance-authority"],
  registryDependencies: ["label"],
  demos: [
    { name: "default", component: Default },
    { name: "sizes", title: "Sizes", component: Sizes },
    { name: "settings", title: "Settings list", component: Settings },
  ],
  usage: {
    imports: `import { Switch } from "@/components/ui/switch"`,
    code: `<Switch defaultChecked />`,
  },
  api: [
    {
      component: "Switch",
      description: "Extends Radix `Switch.Root`.",
      props: [
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Track and thumb size." },
        { name: "checked", type: "boolean", description: "Controlled state." },
        { name: "defaultChecked", type: "boolean", default: "false", description: "Uncontrolled initial state." },
        { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Called when toggled." },
      ],
    },
  ],
  notes: ["The spring is pure CSS (`ease-spring`, a `linear()` easing), so it costs nothing at runtime."],
}
