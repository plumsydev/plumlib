import type { ComponentDoc } from "../types"
import Default from "../demos/checkbox/default"
import Indeterminate from "../demos/checkbox/indeterminate"
import Card from "../demos/checkbox/card"
import Playground from "../playgrounds/checkbox"

export const doc: ComponentDoc = {
  slug: "checkbox",
  name: "Checkbox",
  description: "A checkbox whose tick draws itself in. Supports the indeterminate state.",
  category: "Inputs",
  primitive: { name: "Radix Checkbox", href: "https://www.radix-ui.com/primitives/docs/components/checkbox" },
  dependencies: ["radix-ui", "motion"],
  registryDependencies: ["label"],
  demos: [
    { name: "default", component: Default },
    {
      name: "indeterminate",
      title: "Indeterminate",
      description: "Pass `checked=\"indeterminate\"` for a parent that controls a partial selection.",
      component: Indeterminate,
    },
    { name: "card", title: "Card", description: "Wrap it in a Label and style with `has-[[data-state=checked]]`.", component: Card },
  ],
  playground: Playground,
  usage: {
    imports: `import { Checkbox } from "@/components/ui/checkbox"`,
    code: `<Checkbox id="terms" />`,
  },
  api: [
    {
      component: "Checkbox",
      description: "Extends Radix `Checkbox.Root`.",
      props: [
        { name: "checked", type: 'boolean | "indeterminate"', description: "Controlled state." },
        { name: "defaultChecked", type: 'boolean | "indeterminate"', default: "false", description: "Uncontrolled initial state." },
        { name: "onCheckedChange", type: '(checked: boolean | "indeterminate") => void', description: "Called when the state changes." },
        { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction." },
      ],
    },
  ],
}
