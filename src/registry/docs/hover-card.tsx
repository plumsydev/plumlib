import type { ComponentDoc } from "../types"
import Default from "../demos/hover-card/default"
import Repository from "../demos/hover-card/repository"

export const doc: ComponentDoc = {
  slug: "hover-card",
  name: "Hover Card",
  description: "Preview rich content behind a link when sighted users hover it.",
  category: "Overlays",
  primitive: { name: "Radix Hover Card", href: "https://www.radix-ui.com/primitives/docs/components/hover-card" },
  dependencies: ["radix-ui"],
  demos: [
    { name: "default", component: Default },
    { name: "repository", title: "Link preview", component: Repository },
  ],
  usage: {
    imports: `import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"`,
    code: `<HoverCard>
  <HoverCardTrigger>@maya</HoverCardTrigger>
  <HoverCardContent>Design engineer at Acme.</HoverCardContent>
</HoverCard>`,
  },
  api: [
    {
      component: "HoverCard",
      props: [
        { name: "openDelay", type: "number", default: "250", description: "Delay before opening, in ms." },
        { name: "closeDelay", type: "number", default: "150", description: "Delay before closing, in ms." },
      ],
    },
    {
      component: "HoverCardContent",
      props: [
        { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Preferred side." },
        { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alignment against the trigger." },
      ],
    },
  ],
  notes: ["Hover cards are ignored by keyboard and touch users — only use them for supplementary content."],
}
