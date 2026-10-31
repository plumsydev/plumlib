import type { ComponentDoc } from "../types"
import Default from "../demos/navigation-menu/default"
import Header from "../demos/navigation-menu/header"
import Simple from "../demos/navigation-menu/simple"
import NavigationMenuPlayground from "../playgrounds/navigation-menu"

export const doc: ComponentDoc = {
  slug: "navigation-menu",
  name: "Navigation Menu",
  description:
    "Site navigation with rich dropdowns. A hover pill glides between items, the panel morphs to fit each menu and content slides in from the side you came from.",
  category: "Navigation",
  primitive: { name: "Radix Navigation Menu", href: "https://www.radix-ui.com/primitives/docs/components/navigation-menu" },
  dependencies: ["radix-ui", "class-variance-authority", "motion", "lucide-react"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "header", title: "In a header", description: "Controlled with `value` — glide from one item to the next without the panel closing.", component: Header },
    { name: "simple", title: "Without viewport", description: "`viewport={false}` renders each panel under its own trigger.", component: Simple },
  ],
  playground: NavigationMenuPlayground,
  usage: {
    imports: `import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"`,
    code: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem value="product">
      <NavigationMenuTrigger>Product</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/deploy">Deploy</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem value="pricing">
      <NavigationMenuLink href="/pricing" className={navigationMenuTriggerStyle()}>
        Pricing
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
  },
  api: [
    {
      component: "NavigationMenu",
      props: [
        { name: "viewport", type: "boolean", default: "true", description: "Render content in a shared panel that morphs between menus." },
        { name: "value", type: "string", description: "Controlled open item." },
        { name: "onValueChange", type: "(value: string) => void", description: "Called when the open item changes." },
        { name: "delayDuration", type: "number", default: "200", description: "Hover delay before opening, in ms." },
      ],
    },
    {
      component: "NavigationMenuLink",
      description: "A link styled as a card row inside content. Add `navigationMenuTriggerStyle()` to use it at the top level.",
      props: [{ name: "active", type: "boolean", description: "Marks the current page." }],
    },
  ],
  notes: ["Give each `NavigationMenuItem` a `value` — it powers both the hover pill and controlled mode."],
}
