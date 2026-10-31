import type { ComponentDoc } from "../types"
import Default from "../demos/context-menu/default"

export const doc: ComponentDoc = {
  slug: "context-menu",
  name: "Context Menu",
  description: "A menu that opens at the pointer on right click or long press. Same items and keyboard model as the dropdown.",
  category: "Overlays",
  primitive: { name: "Radix Context Menu", href: "https://www.radix-ui.com/primitives/docs/components/context-menu" },
  dependencies: ["radix-ui", "lucide-react"],
  demos: [{ name: "default", component: Default }],
  usage: {
    imports: `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"`,
    code: `<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Rename</ContextMenuItem>
    <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
  },
  api: [
    {
      component: "ContextMenuTrigger",
      description: "The area that listens for right click. Gets `data-state=open` while the menu is shown.",
      props: [{ name: "disabled", type: "boolean", default: "false", description: "Fall back to the native context menu." }],
    },
    {
      component: "ContextMenuItem",
      props: [
        { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "Use destructive for dangerous actions." },
        { name: "inset", type: "boolean", default: "false", description: "Indents the item to line up with checkbox items." },
      ],
    },
  ],
  notes: ["Exports mirror the Dropdown Menu one-to-one: `ContextMenuCheckboxItem`, `ContextMenuRadioGroup`, `ContextMenuSub`, `ContextMenuShortcut` and friends."],
}
