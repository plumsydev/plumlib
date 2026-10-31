import type { ComponentDoc } from "../types"
import Default from "../demos/badge/default"
import Status from "../demos/badge/status"
import BadgePlayground from "../playgrounds/badge"
import RemovableDemo from "../demos/badge/removable"

export const doc: ComponentDoc = {
  slug: "badge",
  name: "Badge",
  description: "A compact label for statuses, counts and metadata, with an optional live dot.",
  category: "Data Display",
  dependencies: ["radix-ui", "class-variance-authority"],
  demos: [
    { name: "default", component: Default },
    { name: "status", title: "Status", description: "Tinted semantic variants with a pulsing dot.", component: Status },
    { name: "removable", title: "Removable labels", description: "Badges pop in and out, and the rest reflow with layout animations.", component: RemovableDemo },
  ],
  playground: BadgePlayground,
  usage: {
    imports: `import { Badge } from "@/components/ui/badge"`,
    code: `<Badge variant="success" dot>Operational</Badge>`,
  },
  api: [
    {
      component: "Badge",
      props: [
        { name: "variant", type: '"default" | "secondary" | "outline" | "brand" | "success" | "warning" | "destructive" | "info"', default: '"default"', description: "Visual style." },
        { name: "dot", type: "boolean", default: "false", description: "Prepends a pulsing status dot in the current color." },
        { name: "asChild", type: "boolean", default: "false", description: "Render as the child element, e.g. a link." },
      ],
    },
  ],
}
