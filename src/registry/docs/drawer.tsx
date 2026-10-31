import type { ComponentDoc } from "../types"
import Default from "../demos/drawer/default"
import Direction from "../demos/drawer/direction"
import SnapPoints from "../demos/drawer/snap-points"
import DrawerPlayground from "../playgrounds/drawer"

export const doc: ComponentDoc = {
  slug: "drawer",
  name: "Drawer",
  description: "A draggable panel with real physics. Swipe it closed on touch, scale the page behind it like a native sheet.",
  category: "Overlays",
  primitive: { name: "Vaul", href: "https://vaul.emilkowal.ski" },
  dependencies: ["vaul"],
  demos: [
    { name: "default", component: Default },
    { name: "direction", title: "Direction", description: "Drawers can come from any edge with `direction`.", component: Direction },
    {
      name: "snap-points",
      title: "Snap points",
      description: "Drag between a peek, half and full height — like a maps app.",
      component: SnapPoints,
    },
  ],
  playground: DrawerPlayground,
  usage: {
    imports: `import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"`,
    code: `<Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Title</DrawerTitle>
      <DrawerDescription>Description</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose>Close</DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
  },
  api: [
    {
      component: "Drawer",
      props: [
        { name: "direction", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Edge the drawer comes from." },
        { name: "shouldScaleBackground", type: "boolean", default: "true", description: "Scales the page behind. Needs a `vaul-drawer-wrapper` attribute on your app wrapper." },
        { name: "snapPoints", type: "(number | string)[]", description: "Fractions or pixel values the drawer can rest at." },
        { name: "dismissible", type: "boolean", default: "true", description: "Allow closing by dragging or clicking outside." },
        { name: "open", type: "boolean", description: "Controlled open state." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the open state changes." },
      ],
    },
  ],
  notes: [
    "For the background scale effect, add `vaul-drawer-wrapper=\"\"` to the element wrapping your app (and give it a background color).",
    "A common pattern: render a Dialog on desktop and a Drawer on mobile with the same content.",
  ],
}
