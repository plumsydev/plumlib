import type { ComponentDoc } from "../types"
import Default from "../demos/kbd/default"
import Interactive from "../demos/kbd/interactive"

export const doc: ComponentDoc = {
  slug: "kbd",
  name: "Kbd",
  description: "Displays keyboard keys and shortcuts. Keys physically press down when you set data-pressed.",
  category: "Data Display",
  demos: [
    { name: "default", component: Default },
    { name: "interactive", title: "Pressed state", description: "Set `data-pressed` to sink the key — wire it to real keyboard events.", component: Interactive },
  ],
  usage: {
    imports: `import { Kbd, KbdGroup } from "@/components/ui/kbd"`,
    code: `<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>`,
  },
  api: [
    {
      component: "Kbd",
      description: "A styled `kbd` element.",
      props: [{ name: "data-pressed", type: "boolean", description: "Renders the key in its pressed state." }],
    },
  ],
  notes: ["Inside a Tooltip, keys automatically switch to inverted colors."],
}
