import type { ComponentDoc } from "../types"
import Default from "../demos/sheet/default"
import Sides from "../demos/sheet/sides"
import Inset from "../demos/sheet/inset"
import SheetPlayground from "../playgrounds/sheet"

export const doc: ComponentDoc = {
  slug: "sheet",
  name: "Sheet",
  description: "A panel that slides in from any edge of the screen. Ideal for settings, filters and detail views.",
  category: "Overlays",
  primitive: { name: "Radix Dialog", href: "https://www.radix-ui.com/primitives/docs/components/dialog" },
  dependencies: ["radix-ui", "lucide-react"],
  demos: [
    { name: "default", component: Default },
    { name: "sides", title: "Sides", description: "Use `side` to pick the edge.", component: Sides },
    {
      name: "inset",
      title: "Inset",
      description: "A floating panel detached from the edge with `inset`. Mark items as read and watch the list reflow.",
      component: Inset,
    },
  ],
  playground: SheetPlayground,
  usage: {
    imports: `import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"`,
    code: `<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>Make changes and save.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
  },
  api: [
    {
      component: "Sheet",
      props: [
        { name: "open", type: "boolean", description: "Controlled open state." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the open state changes." },
      ],
    },
    {
      component: "SheetContent",
      props: [
        { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"right"', description: "Edge the panel slides in from." },
        { name: "inset", type: "boolean", default: "false", description: "Floats the panel with a margin and rounded corners." },
        { name: "showCloseButton", type: "boolean", default: "true", description: "Renders the close button in the corner." },
      ],
    },
  ],
  notes: ["Need drag-to-dismiss on mobile? Reach for the Drawer instead.", "Wrap long content in `SheetBody`: it takes the remaining height and scrolls on its own."],
}
