import type { ComponentDoc } from "../types"
import Default from "../demos/select/default"
import Groups from "../demos/select/groups"
import WithIcons from "../demos/select/with-icons"
import Playground from "../playgrounds/select"

export const doc: ComponentDoc = {
  slug: "select",
  name: "Select",
  description: "A listbox that opens from its trigger with a soft scale-and-blur, keyboard navigation and typeahead built in.",
  category: "Inputs",
  primitive: { name: "Radix Select", href: "https://www.radix-ui.com/primitives/docs/components/select" },
  dependencies: ["radix-ui", "motion", "lucide-react"],
  demos: [
    { name: "default", component: Default },
    { name: "groups", title: "Groups", description: "Label and separate long lists. Scroll buttons appear when needed.", component: Groups },
    { name: "with-icons", title: "With icons", description: "Icons in items are mirrored in the trigger.", component: WithIcons },
  ],
  playground: Playground,
  usage: {
    imports: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"`,
    code: `<Select>
  <SelectTrigger className="w-44">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
  </SelectContent>
</Select>`,
  },
  api: [
    {
      component: "Select",
      description: "Extends Radix `Select.Root`.",
      props: [
        { name: "value", type: "string", description: "Controlled value." },
        { name: "defaultValue", type: "string", description: "Uncontrolled initial value." },
        { name: "onValueChange", type: "(value: string) => void", description: "Called when the selection changes." },
      ],
    },
    {
      component: "SelectTrigger",
      props: [{ name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Trigger height." }],
    },
    {
      component: "SelectContent",
      props: [
        { name: "position", type: '"popper" | "item-aligned"', default: '"popper"', description: "Popper opens below the trigger; item-aligned overlays the selected item like macOS." },
      ],
    },
    { component: "SelectItem", props: [{ name: "value", type: "string", required: true, description: "The item value." }] },
  ],
}
