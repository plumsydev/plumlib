import type { ComponentDoc } from "../types"
import Default from "../demos/toggle/default"
import Outline from "../demos/toggle/outline"
import Playground from "../playgrounds/toggle"
import Bookmark from "../demos/toggle/bookmark"

export const doc: ComponentDoc = {
  slug: "toggle",
  name: "Toggle",
  description: "A two-state button. Icons pop slightly when pressed on.",
  category: "Inputs",
  primitive: { name: "Radix Toggle", href: "https://www.radix-ui.com/primitives/docs/components/toggle" },
  dependencies: ["radix-ui", "class-variance-authority"],
  demos: [
    { name: "default", component: Default },
    { name: "outline", title: "Outline", component: Outline },
    { name: "bookmark", title: "Like & save", description: "Controlled toggles with custom pressed colors.", component: Bookmark },
  ],
  playground: Playground,
  usage: {
    imports: `import { Toggle } from "@/components/ui/toggle"`,
    code: `<Toggle aria-label="Bold"><Bold /></Toggle>`,
  },
  api: [
    {
      component: "Toggle",
      description: "Extends Radix `Toggle.Root`.",
      props: [
        { name: "variant", type: '"default" | "outline"', default: '"default"', description: "Visual style." },
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Size." },
        { name: "pressed / defaultPressed", type: "boolean", description: "Controlled or initial state." },
        { name: "onPressedChange", type: "(pressed: boolean) => void", description: "Called when toggled." },
      ],
    },
  ],
  notes: ["Use `toggleVariants()` to style other elements like a toggle."],
}
