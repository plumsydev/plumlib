import type { ComponentDoc } from "../types"
import Default from "../demos/command/default"
import DialogDemo from "../demos/command/dialog"

export const doc: ComponentDoc = {
  slug: "command",
  name: "Command",
  description: "A fast, composable command menu. The highlight glides between results and the list height eases as you filter.",
  category: "Overlays",
  primitive: { name: "cmdk", href: "https://cmdk.paco.me" },
  dependencies: ["cmdk", "motion", "lucide-react"],
  registryDependencies: ["dialog"],
  demos: [
    { name: "default", component: Default },
    {
      name: "dialog",
      title: "Command palette",
      description: "`CommandDialog` wraps the menu in a dialog anchored near the top of the screen. Try ⌘J.",
      component: DialogDemo,
    },
  ],
  usage: {
    imports: `import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"`,
    code: `<Command>
  <CommandInput placeholder="Search…" />
  <CommandList>
    <CommandEmpty>No results.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>
        Settings <CommandShortcut>⌘,</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
  },
  api: [
    {
      component: "Command",
      props: [
        { name: "value", type: "string", description: "Controlled selected item value." },
        { name: "onValueChange", type: "(value: string) => void", description: "Called when the highlighted item changes." },
        { name: "shouldFilter", type: "boolean", default: "true", description: "Set to false to filter items yourself (e.g. async search)." },
        { name: "loop", type: "boolean", default: "false", description: "Wrap keyboard navigation from last to first item." },
      ],
    },
    {
      component: "CommandDialog",
      description: "Accepts every Dialog root prop.",
      props: [
        { name: "title", type: "string", default: '"Command palette"', description: "Accessible title, visually hidden." },
        { name: "description", type: "string", description: "Accessible description, visually hidden." },
        { name: "showCloseButton", type: "boolean", default: "false", description: "Show the dialog close button." },
      ],
    },
    {
      component: "CommandItem",
      props: [
        { name: "value", type: "string", description: "Value used for filtering. Defaults to the text content." },
        { name: "keywords", type: "string[]", description: "Extra search terms that match this item." },
        { name: "onSelect", type: "(value: string) => void", description: "Called on click or Enter." },
        { name: "disabled", type: "boolean", default: "false", description: "Make the item unselectable." },
      ],
    },
  ],
  notes: ["Bind the palette to a global shortcut with a `keydown` listener on `document` — see the dialog example."],
}
