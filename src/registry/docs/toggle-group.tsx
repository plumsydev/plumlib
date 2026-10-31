import type { ComponentDoc } from "../types"
import Default from "../demos/toggle-group/default"
import Icons from "../demos/toggle-group/icons"
import Multiple from "../demos/toggle-group/multiple"

export const doc: ComponentDoc = {
  slug: "toggle-group",
  name: "Toggle Group",
  description: "A segmented control. In single mode the indicator glides between items with a shared layout animation.",
  category: "Inputs",
  primitive: { name: "Radix Toggle Group", href: "https://www.radix-ui.com/primitives/docs/components/toggle-group" },
  dependencies: ["radix-ui", "class-variance-authority", "motion"],
  demos: [
    { name: "default", component: Default },
    { name: "icons", title: "Variants", description: "`outline` and `ghost` variants, with icons and sizes.", component: Icons },
    { name: "multiple", title: "Multiple", description: "With `type=\"multiple\"` each active item fades its own background in.", component: Multiple },
  ],
  usage: {
    imports: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"`,
    code: `<ToggleGroup type="single" defaultValue="week">
  <ToggleGroupItem value="day">Day</ToggleGroupItem>
  <ToggleGroupItem value="week">Week</ToggleGroupItem>
</ToggleGroup>`,
  },
  api: [
    {
      component: "ToggleGroup",
      description: "Extends Radix `ToggleGroup.Root`.",
      props: [
        { name: "type", type: '"single" | "multiple"', required: true, description: "Selection mode." },
        { name: "variant", type: '"default" | "outline" | "ghost"', default: '"default"', description: "Container style." },
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Item height." },
        { name: "value / defaultValue", type: "string | string[]", description: "Controlled or initial value (array in multiple mode)." },
        { name: "onValueChange", type: "(value: string | string[]) => void", description: "Called when the selection changes." },
      ],
    },
    { component: "ToggleGroupItem", props: [{ name: "value", type: "string", required: true, description: "The item value." }] },
  ],
  notes: ["Each group scopes its `layoutId` with `useId()`, so several groups on one page never fight over the indicator."],
}
