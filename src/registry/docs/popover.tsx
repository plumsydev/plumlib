import type { ComponentDoc } from "../types"
import Default from "../demos/popover/default"
import Picker from "../demos/popover/picker"

export const doc: ComponentDoc = {
  slug: "popover",
  name: "Popover",
  description: "Floating content anchored to a trigger. It grows out of its trigger, whichever side it lands on.",
  category: "Overlays",
  primitive: { name: "Radix Popover", href: "https://www.radix-ui.com/primitives/docs/components/popover" },
  dependencies: ["radix-ui"],
  demos: [
    { name: "default", component: Default },
    { name: "picker", title: "Controlled picker", description: "Control `open` to close the popover after a selection.", component: Picker },
  ],
  usage: {
    imports: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"`,
    code: `<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>Place content here.</PopoverContent>
</Popover>`,
  },
  api: [
    {
      component: "Popover",
      props: [
        { name: "open", type: "boolean", description: "Controlled open state." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the open state changes." },
        { name: "modal", type: "boolean", default: "false", description: "Blocks outside interaction while open." },
      ],
    },
    {
      component: "PopoverContent",
      props: [
        { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Preferred side of the trigger." },
        { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alignment against the trigger." },
        { name: "sideOffset", type: "number", default: "6", description: "Distance from the trigger in px." },
        { name: "collisionPadding", type: "number", default: "0", description: "Space kept between the content and the viewport edges." },
      ],
    },
  ],
  notes: ["The open animation uses Radix's transform-origin variable, so the content always scales from the trigger — even after flipping sides."],
}
