import type { ComponentDoc } from "../types"
import Default from "../demos/pagination/default"
import Compact from "../demos/pagination/compact"
import PaginationPlayground from "../playgrounds/pagination"
import DataDemo from "../demos/pagination/data"

export const doc: ComponentDoc = {
  slug: "pagination",
  name: "Pagination",
  description: "Page navigation where the active marker slides between numbers instead of jumping.",
  category: "Navigation",
  dependencies: ["motion", "lucide-react"],
  registryDependencies: ["button"],
  demos: [
    { name: "default", component: Default },
    { name: "compact", title: "Compact", description: "Previous / next only, with a page counter.", component: Compact },
    { name: "data", title: "Paginating real data", description: "The list slides in the direction you page.", component: DataDemo },
  ],
  playground: PaginationPlayground,
  usage: {
    imports: `import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"`,
    code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="?page=1" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=2" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="?page=3" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
  },
  api: [
    {
      component: "PaginationLink",
      description: "Renders an anchor with ghost button styles.",
      props: [
        { name: "isActive", type: "boolean", default: "false", description: "Marks the current page and draws the sliding indicator." },
        { name: "size", type: "ButtonProps[\"size\"]", default: '"icon"', description: "Button size token." },
      ],
    },
  ],
}
