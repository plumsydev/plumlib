import type { ComponentDoc } from "../types"
import Default from "../demos/menubar/default"
import Player from "../demos/menubar/player"
import Workspace from "../demos/menubar/workspace"
import MenubarPlayground from "../playgrounds/menubar"

export const doc: ComponentDoc = {
  slug: "menubar",
  name: "Menubar",
  description: "A desktop-style menu bar. Once a menu is open, hover the others and the highlight slides along with you.",
  category: "Navigation",
  primitive: { name: "Radix Menubar", href: "https://www.radix-ui.com/primitives/docs/components/menubar" },
  dependencies: ["radix-ui", "motion", "lucide-react"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "player", title: "Media controls", description: "Checkbox and radio items drive the player: shuffle, repeat and playback speed.", component: Player },
    { name: "workspace", title: "Workspace switcher", description: "The trigger label follows the radio selection.", component: Workspace },
  ],
  playground: MenubarPlayground,
  usage: {
    imports: `import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"`,
    code: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New tab <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
  },
  api: [
    {
      component: "Menubar",
      props: [
        { name: "value", type: "string", description: "Controlled open menu." },
        { name: "onValueChange", type: "(value: string) => void", description: "Called when a menu opens or closes." },
        { name: "loop", type: "boolean", default: "true", description: "Arrow keys wrap around the bar." },
      ],
    },
    {
      component: "MenubarItem",
      props: [
        { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "Destructive items are tinted red." },
        { name: "inset", type: "boolean", description: "Aligns the label with checkbox and radio items." },
      ],
    },
  ],
  notes: ["Also exports `MenubarCheckboxItem`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarSub`, `MenubarSubTrigger`, `MenubarSubContent`, `MenubarLabel` and `MenubarSeparator`."],
}
