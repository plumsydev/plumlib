import type { ComponentDoc } from "../types"
import Default from "../demos/radio-group/default"
import Cards from "../demos/radio-group/cards"
import Playground from "../playgrounds/radio-group"
import Frequency from "../demos/radio-group/frequency"

export const doc: ComponentDoc = {
  slug: "radio-group",
  name: "Radio Group",
  description: "A set of mutually exclusive options. The dot springs in when selected.",
  category: "Inputs",
  primitive: { name: "Radix Radio Group", href: "https://www.radix-ui.com/primitives/docs/components/radio-group" },
  dependencies: ["radix-ui", "motion"],
  registryDependencies: ["label"],
  demos: [
    { name: "default", component: Default },
    { name: "cards", title: "Cards", description: "`RadioGroupCard` turns a whole block into a radio.", component: Cards },
    { name: "frequency", title: "Controlled", description: "Read the value to drive the rest of the UI.", component: Frequency },
  ],
  playground: Playground,
  usage: {
    imports: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`,
    code: `<RadioGroup defaultValue="a">
  <RadioGroupItem value="a" id="a" />
  <RadioGroupItem value="b" id="b" />
</RadioGroup>`,
  },
  api: [
    {
      component: "RadioGroup",
      description: "Extends Radix `RadioGroup.Root`.",
      props: [
        { name: "value", type: "string", description: "Controlled value." },
        { name: "defaultValue", type: "string", description: "Uncontrolled initial value." },
        { name: "onValueChange", type: "(value: string) => void", description: "Called when the selection changes." },
        { name: "orientation", type: '"horizontal" | "vertical"', description: "Arrow-key navigation direction." },
      ],
    },
    { component: "RadioGroupItem", props: [{ name: "value", type: "string", required: true, description: "The item value." }] },
    {
      component: "RadioGroupCard",
      description: "A full-width item with a built-in indicator. Children are laid out in a column.",
      props: [{ name: "value", type: "string", required: true, description: "The item value." }],
    },
  ],
}
