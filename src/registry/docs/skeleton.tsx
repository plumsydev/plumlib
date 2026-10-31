import type { ComponentDoc } from "../types"
import Default from "../demos/skeleton/default"
import CardDemo from "../demos/skeleton/card"
import Loading from "../demos/skeleton/loading"
import SkeletonPlayground from "../playgrounds/skeleton"

export const doc: ComponentDoc = {
  slug: "skeleton",
  name: "Skeleton",
  description: "Placeholder shapes with a soft shimmer, shown while content loads.",
  category: "Feedback",
  demos: [
    { name: "default", component: Default },
    { name: "card", title: "Card", component: CardDemo },
    { name: "loading", title: "Loading → content", description: "Crossfade to real data with a staggered blur-in.", component: Loading },
  ],
  playground: SkeletonPlayground,
  usage: {
    imports: `import { Skeleton } from "@/components/ui/skeleton"`,
    code: `<Skeleton className="h-4 w-48" />`,
  },
  api: [
    {
      component: "Skeleton",
      description: "A div — size and shape it with utility classes.",
      props: [{ name: "className", type: "string", description: "Width, height and radius of the placeholder." }],
    },
  ],
  notes: ["Uses the `animate-shimmer` token from the theme. Under reduced motion the shimmer stops and a flat surface remains."],
}
