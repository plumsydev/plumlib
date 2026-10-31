import type { ComponentDoc } from "../types"
import Default from "../demos/separator/default"
import Label from "../demos/separator/label"

export const doc: ComponentDoc = {
  slug: "separator",
  name: "Separator",
  description: "A visual or semantic divider between content, horizontal or vertical, optionally labelled.",
  category: "Data Display",
  primitive: { name: "Radix Separator", href: "https://www.radix-ui.com/primitives/docs/components/separator" },
  dependencies: ["radix-ui"],
  demos: [
    { name: "default", component: Default },
    { name: "label", title: "With label", description: "Pass children to center a label between two lines.", component: Label },
  ],
  usage: {
    imports: `import { Separator } from "@/components/ui/separator"`,
    code: `<Separator />
<Separator orientation="vertical" />
<Separator>or</Separator>`,
  },
  api: [
    {
      component: "Separator",
      props: [
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direction of the divider." },
        { name: "decorative", type: "boolean", default: "true", description: "When false, exposes a `separator` role to assistive tech." },
        { name: "children", type: "ReactNode", description: "Optional centered label (horizontal only)." },
      ],
    },
  ],
}
