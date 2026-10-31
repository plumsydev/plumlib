import type { ComponentDoc } from "../types"
import Default from "../demos/avatar/default"
import Group from "../demos/avatar/group"
import Sizes from "../demos/avatar/sizes"

export const doc: ComponentDoc = {
  slug: "avatar",
  name: "Avatar",
  description: "User images that fade in once loaded, with initials fallback, presence status and stacked groups.",
  category: "Data Display",
  primitive: { name: "Radix Avatar", href: "https://www.radix-ui.com/primitives/docs/components/avatar" },
  dependencies: ["radix-ui", "class-variance-authority"],
  demos: [
    { name: "default", component: Default },
    { name: "group", title: "Group", description: "Hover the stack — it fans out. `max` collapses the rest into a counter.", component: Group },
    { name: "sizes", title: "Sizes", component: Sizes },
  ],
  usage: {
    imports: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"`,
    code: `<Avatar>
  <AvatarImage src="/avatar.png" alt="Léa Martin" />
  <AvatarFallback>LM</AvatarFallback>
</Avatar>`,
  },
  api: [
    {
      component: "Avatar",
      props: [{ name: "size", type: '"xs" | "sm" | "default" | "lg" | "xl"', default: '"default"', description: "Diameter, from 24 to 64px." }],
    },
    {
      component: "AvatarFallback",
      props: [{ name: "delayMs", type: "number", description: "Wait before showing the fallback, avoids a flash on fast connections." }],
    },
    {
      component: "AvatarStatus",
      props: [{ name: "status", type: '"online" | "busy" | "away" | "offline"', default: '"online"', description: "Presence dot color." }],
    },
    {
      component: "AvatarGroup",
      props: [{ name: "max", type: "number", description: "Maximum avatars shown before a +N counter." }],
    },
  ],
  notes: ["`AvatarStatus` sits outside the clipped circle — add `overflow-visible` to the Avatar and `rounded-full` to the image."],
}
