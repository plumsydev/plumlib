import type { ComponentDoc } from "../types"
import Default from "../demos/animated-list/default"
import Tasks from "../demos/animated-list/tasks"
import Chat from "../demos/animated-list/chat"
import AnimatedListPlayground from "../playgrounds/animated-list"

export const doc: ComponentDoc = {
  slug: "animated-list",
  name: "Animated List",
  description: "A list where new items drop in with a spring and the others glide to make room.",
  category: "Motion",
  dependencies: ["motion"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "tasks", title: "Add & remove", description: "Items animate in on add and collapse out on remove.", component: Tasks },
    { name: "chat", title: "Chat", description: "Override `initial` so messages rise from the bottom.", component: Chat },
  ],
  playground: AnimatedListPlayground,
  usage: {
    imports: "import { AnimatedList, AnimatedListItem } from \"@/components/ui/animated-list\"",
    code: `<AnimatedList>
  {items.map((item) => (
    <AnimatedListItem key={item.id}>{item.title}</AnimatedListItem>
  ))}
</AnimatedList>`,
  },
  api: [
    {
      component: "AnimatedList",
      description: "Extends `ul`. Wraps its children in `AnimatePresence`.",
      props: [
      ],
    },
    {
      component: "AnimatedListItem",
      description: "Extends `motion.li`, so `initial`, `animate`, `exit` and `transition` can be overridden.",
      props: [
      ],
    },
  ],
  notes: ["Give every item a stable `key` — that's how enter and exit are detected.", "With reduced motion, items fade without moving."],
}
