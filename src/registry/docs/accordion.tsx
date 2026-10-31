import type { ComponentDoc } from "../types"
import Default from "../demos/accordion/default"
import Multiple from "../demos/accordion/multiple"
import CardDemo from "../demos/accordion/card"
import AccordionPlayground from "../playgrounds/accordion"

export const doc: ComponentDoc = {
  slug: "accordion",
  name: "Accordion",
  description: "Vertically stacked sections that expand with a measured height animation and a soft blur-in.",
  category: "Navigation",
  primitive: { name: "Radix Accordion", href: "https://www.radix-ui.com/primitives/docs/components/accordion" },
  dependencies: ["radix-ui", "motion", "lucide-react"],
  demos: [
    { name: "default", component: Default },
    { name: "multiple", title: "Multiple", description: "Let several sections stay open with `type=\"multiple\"`.", component: Multiple },
    { name: "card", title: "Inside a card", description: "Compose with icons and a bordered surface.", component: CardDemo },
  ],
  playground: AccordionPlayground,
  usage: {
    imports: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"`,
    code: `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It follows the WAI-ARIA pattern.</AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
  api: [
    {
      component: "Accordion",
      description: "Root. Accepts every Radix Accordion.Root prop.",
      props: [
        { name: "type", type: '"single" | "multiple"', required: true, description: "Whether one or several items can be open." },
        { name: "collapsible", type: "boolean", default: "false", description: "With `single`, allows closing the open item." },
        { name: "defaultValue", type: "string | string[]", description: "Initially open item(s)." },
        { name: "value / onValueChange", type: "string | string[]", description: "Controlled state." },
      ],
    },
    {
      component: "AccordionItem",
      props: [
        { name: "value", type: "string", required: true, description: "Unique value of the item." },
        { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction." },
      ],
    },
  ],
  notes: ["Height is animated with the `pl-collapse` utility from the theme, driven by Radix's measured `--radix-accordion-content-height`."],
}
