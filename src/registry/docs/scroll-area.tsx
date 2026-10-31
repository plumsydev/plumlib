import type { ComponentDoc } from "../types"
import Default from "../demos/scroll-area/default"
import Horizontal from "../demos/scroll-area/horizontal"

export const doc: ComponentDoc = {
  slug: "scroll-area",
  name: "Scroll Area",
  description: "Native scrolling with a slim custom scrollbar that fades in on hover, plus optional edge fades.",
  category: "Data Display",
  primitive: { name: "Radix Scroll Area", href: "https://www.radix-ui.com/primitives/docs/components/scroll-area" },
  dependencies: ["radix-ui"],
  registryDependencies: ["separator"],
  demos: [
    { name: "default", component: Default },
    { name: "horizontal", title: "Horizontal", description: "`orientation=\"horizontal\"` with a masked edge.", component: Horizontal },
  ],
  usage: {
    imports: `import { ScrollArea } from "@/components/ui/scroll-area"`,
    code: `<ScrollArea fade className="h-72 w-48 rounded-md border">
  …
</ScrollArea>`,
  },
  api: [
    {
      component: "ScrollArea",
      description: "Accepts every Radix ScrollArea.Root prop.",
      props: [
        { name: "orientation", type: '"vertical" | "horizontal" | "both"', default: '"vertical"', description: "Which scrollbars to render." },
        { name: "fade", type: "boolean", default: "false", description: "Masks the edges of the viewport to hint at more content." },
        { name: "type", type: '"auto" | "always" | "scroll" | "hover"', default: '"hover"', description: "When scrollbars are visible." },
      ],
    },
  ],
}
