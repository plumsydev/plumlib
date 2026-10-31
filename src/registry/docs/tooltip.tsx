import type { ComponentDoc } from "../types"
import Default from "../demos/tooltip/default"
import Sides from "../demos/tooltip/sides"

export const doc: ComponentDoc = {
  slug: "tooltip",
  name: "Tooltip",
  description: "A small label that appears on hover or focus. Short delay, instant hand-off between neighbours.",
  category: "Overlays",
  primitive: { name: "Radix Tooltip", href: "https://www.radix-ui.com/primitives/docs/components/tooltip" },
  dependencies: ["radix-ui"],
  demos: [
    { name: "default", component: Default },
    { name: "sides", title: "Sides & arrow", description: "Pass `showArrow` for a pointer and `side` to position it.", component: Sides },
  ],
  usage: {
    imports: `import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"`,
    code: `<Tooltip>
  <TooltipTrigger>Hover</TooltipTrigger>
  <TooltipContent>Add to library</TooltipContent>
</Tooltip>`,
  },
  api: [
    {
      component: "TooltipProvider",
      description: "Optional. Wrap a group of tooltips so moving between them skips the delay.",
      props: [
        { name: "delayDuration", type: "number", default: "150", description: "Delay before opening, in ms." },
        { name: "skipDelayDuration", type: "number", default: "300", description: "Window during which the next tooltip opens instantly." },
      ],
    },
    {
      component: "TooltipContent",
      props: [
        { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: "Preferred side." },
        { name: "sideOffset", type: "number", default: "6", description: "Distance from the trigger in px." },
        { name: "showArrow", type: "boolean", default: "false", description: "Renders an arrow pointing to the trigger." },
      ],
    },
  ],
  notes: [
    "A `<kbd>` inside the content is styled automatically — handy for shortcuts.",
    "Tooltips are not reachable on touch devices. Never hide essential information in one.",
  ],
}
