import type { ComponentDoc } from "../types"
import Default from "../demos/collapsible/default"
import Details from "../demos/collapsible/details"
import CollapsiblePlayground from "../playgrounds/collapsible"
import SidebarDemo from "../demos/collapsible/sidebar"

export const doc: ComponentDoc = {
  slug: "collapsible",
  name: "Collapsible",
  description: "Show and hide a region with an animated height. The building block behind disclosure patterns.",
  category: "Navigation",
  primitive: { name: "Radix Collapsible", href: "https://www.radix-ui.com/primitives/docs/components/collapsible" },
  dependencies: ["radix-ui"],
  demos: [
    { name: "default", component: Default },
    { name: "details", title: "Disclosure", description: "A rotating chevron driven by `data-state`.", component: Details },
    { name: "sidebar", title: "Sidebar", description: "Collapsible groups make a compact, nested navigation.", component: SidebarDemo },
  ],
  playground: CollapsiblePlayground,
  usage: {
    imports: `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"`,
    code: `<Collapsible>
  <CollapsibleTrigger>Show more</CollapsibleTrigger>
  <CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>`,
  },
  api: [
    {
      component: "Collapsible",
      props: [
        { name: "open / onOpenChange", type: "boolean", description: "Controlled state." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Initial state when uncontrolled." },
        { name: "disabled", type: "boolean", default: "false", description: "Prevents toggling." },
      ],
    },
  ],
}
