import type { ComponentDoc } from "../types"
import Default from "../demos/dropdown-menu/default"
import Checkboxes from "../demos/dropdown-menu/checkboxes"
import Sort from "../demos/dropdown-menu/sort"
import DropdownMenuPlayground from "../playgrounds/dropdown-menu"

export const doc: ComponentDoc = {
  slug: "dropdown-menu",
  name: "Dropdown Menu",
  description: "A menu of actions opened from a button. Full keyboard support, typeahead, submenus, checkbox and radio items.",
  category: "Overlays",
  primitive: { name: "Radix Dropdown Menu", href: "https://www.radix-ui.com/primitives/docs/components/dropdown-menu" },
  dependencies: ["radix-ui", "lucide-react", "motion"],
  demos: [
    { name: "default", component: Default },
    {
      name: "checkboxes",
      title: "Checkbox & radio items",
      description: "Prevent the default `onSelect` to keep the menu open while toggling.",
      component: Checkboxes,
    },
    {
      name: "sort",
      title: "Sort",
      description: "A radio group that reorders a list. Rows glide to their new position.",
      component: Sort,
    },
  ],
  playground: DropdownMenuPlayground,
  usage: {
    imports: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"`,
    code: `<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My account</DropdownMenuLabel>
    <DropdownMenuItem>
      Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  },
  api: [
    {
      component: "DropdownMenuContent",
      props: [
        { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Preferred side." },
        { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alignment against the trigger." },
        { name: "sideOffset", type: "number", default: "6", description: "Distance from the trigger in px." },
      ],
    },
    {
      component: "DropdownMenuItem",
      props: [
        { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "Use destructive for dangerous actions." },
        { name: "inset", type: "boolean", default: "false", description: "Indents the item to line up with checkbox items." },
        { name: "onSelect", type: "(event: Event) => void", description: "Fires when chosen. Call `event.preventDefault()` to keep the menu open." },
        { name: "disabled", type: "boolean", default: "false", description: "Skipped by keyboard navigation." },
      ],
    },
    {
      component: "DropdownMenuCheckboxItem",
      props: [
        { name: "checked", type: "boolean | 'indeterminate'", description: "Controlled checked state." },
        { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Called when toggled." },
      ],
    },
  ],
  notes: ["Icons inside items are sized and muted automatically. Add a `text-*` class to an icon to opt out of the muted color."],
}
