import type { ComponentDoc } from "../types"
import Default from "../demos/sortable/default"
import Horizontal from "../demos/sortable/horizontal"
import Ranking from "../demos/sortable/ranking"
import SortablePlayground from "../playgrounds/sortable"

export const doc: ComponentDoc = {
  slug: "sortable",
  name: "Sortable",
  description: "Drag-and-drop reordering with lifting cards, neighbours that make room with springs, and a keyboard mode for everyone else.",
  category: "Data Display",
  dependencies: ["motion", "lucide-react"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "horizontal", title: "Horizontal", description: "`axis=\"x\"` and `handle={false}` to drag the whole item.", component: Horizontal },
    { name: "ranking", title: "Ranking", description: "Pair with AnimatedNumber so positions roll as you reorder.", component: Ranking },
  ],
  playground: SortablePlayground,
  usage: {
    imports: `import { Sortable, SortableHandle, SortableItem } from "@/components/ui/sortable"`,
    code: `const [items, setItems] = React.useState(["One", "Two", "Three"])

<Sortable values={items} onValuesChange={setItems}>
  {items.map((item) => (
    <SortableItem key={item} value={item}>
      <SortableHandle />
      {item}
    </SortableItem>
  ))}
</Sortable>`,
  },
  api: [
    {
      component: "Sortable",
      props: [
        { name: "values", type: "T[]", required: true, description: "The ordered items." },
        { name: "onValuesChange", type: "(values: T[]) => void", required: true, description: "Receives the new order." },
        { name: "axis", type: '"x" | "y"', default: '"y"', description: "Drag direction." },
      ],
    },
    {
      component: "SortableItem",
      props: [
        { name: "value", type: "T", required: true, description: "The item from `values` (same reference)." },
        { name: "handle", type: "boolean", default: "true", description: "Only start dragging from a SortableHandle." },
      ],
    },
  ],
  notes: ["Keyboard: focus a handle, press Space to pick up, arrows to move, Space to drop, Escape to cancel. Moves are announced to screen readers."],
}
