import type { ComponentDoc } from "../types"
import Default from "../demos/context-menu/default"
import Files from "../demos/context-menu/files"
import Canvas from "../demos/context-menu/canvas"
import ContextMenuPlayground from "../playgrounds/context-menu"

export const doc: ComponentDoc = {
  slug: "context-menu",
  name: "Context Menu",
  description: "A menu that opens at the pointer on right click or long press. Same items and keyboard model as the dropdown.",
  category: "Overlays",
  primitive: { name: "Radix Context Menu", href: "https://www.radix-ui.com/primitives/docs/components/context-menu" },
  dependencies: ["radix-ui", "lucide-react", "motion"],
  demos: [
    { name: "default", component: Default },
    {
      name: "files",
      title: "File browser",
      description: "Right click a file to rename, duplicate, star or delete it — with undo.",
      component: Files,
    },
    {
      name: "canvas",
      title: "Canvas",
      description: "Checkbox and radio items that drive a canvas: grid, rulers and zoom.",
      component: Canvas,
    },
  ],
  playground: ContextMenuPlayground,
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
