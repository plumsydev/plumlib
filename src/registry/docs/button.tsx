import type { ComponentDoc } from "../types"
import Default from "../demos/button/default"
import Variants from "../demos/button/variants"
import Sizes from "../demos/button/sizes"
import Loading from "../demos/button/loading"
import AsChild from "../demos/button/as-child"
import ButtonPlayground from "../playgrounds/button"

export const doc: ComponentDoc = {
  slug: "button",
  name: "Button",
  description: "Triggers an action. Springy press feedback, a loading state that grows in place, and seven variants.",
  category: "Inputs",
  primitive: { name: "Radix Slot", href: "https://www.radix-ui.com/primitives/docs/utilities/slot" },
  dependencies: ["radix-ui", "class-variance-authority", "motion"],
  demos: [
    { name: "default", component: Default },
    { name: "variants", title: "Variants", component: Variants },
    { name: "sizes", title: "Sizes", component: Sizes },
    {
      name: "loading",
      title: "Loading",
      description: "The spinner animates its width so the label never jumps.",
      component: Loading,
    },
    { name: "as-child", title: "As child", description: "Render any element — like a Next.js Link — with button styles.", component: AsChild },
  ],
  playground: ButtonPlayground,
  usage: {
    imports: `import { Button } from "@/components/ui/button"`,
    code: `<Button variant="outline">Button</Button>`,
  },
  api: [
    {
      component: "Button",
      description: "Extends the native button element.",
      props: [
        { name: "variant", type: '"default" | "brand" | "secondary" | "outline" | "ghost" | "destructive" | "link"', default: '"default"', description: "Visual style." },
        { name: "size", type: '"xs" | "sm" | "default" | "lg" | "xl" | "icon" | "icon-sm" | "icon-xs"', default: '"default"', description: "Height and padding." },
        { name: "loading", type: "boolean", default: "false", description: "Shows an inline spinner and sets aria-busy." },
        { name: "asChild", type: "boolean", default: "false", description: "Merge props onto the child element instead of rendering a button." },
      ],
    },
  ],
  notes: ["Use `buttonVariants()` to give any element button styles without the component."],
}
