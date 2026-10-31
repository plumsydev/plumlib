import type { ComponentDoc } from "../types"
import Default from "../demos/breadcrumb/default"
import Separator from "../demos/breadcrumb/separator"
import BreadcrumbPlayground from "../playgrounds/breadcrumb"
import DropdownDemo from "../demos/breadcrumb/dropdown"

export const doc: ComponentDoc = {
  slug: "breadcrumb",
  name: "Breadcrumb",
  description: "Shows where the current page sits in the hierarchy, with links that underline from the left on hover.",
  category: "Navigation",
  dependencies: ["radix-ui", "lucide-react"],
  demos: [
    { name: "default", component: Default },
    { name: "separator", title: "Custom separator", description: "Pass any icon as children of `BreadcrumbSeparator`.", component: Separator },
    { name: "dropdown", title: "Collapsed with a menu", description: "Hide middle levels behind an ellipsis that opens a dropdown. Click a level to go up.", component: DropdownDemo },
  ],
  playground: BreadcrumbPlayground,
  usage: {
    imports: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"`,
    code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Settings</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  },
  api: [
    {
      component: "BreadcrumbLink",
      props: [{ name: "asChild", type: "boolean", default: "false", description: "Render your router's Link component instead of an anchor." }],
    },
    {
      component: "BreadcrumbSeparator",
      props: [{ name: "children", type: "ReactNode", default: "<ChevronRight />", description: "Custom separator content." }],
    },
  ],
}
