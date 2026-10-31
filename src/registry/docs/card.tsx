import type { ComponentDoc } from "../types"
import Default from "../demos/card/default"
import Interactive from "../demos/card/interactive"

export const doc: ComponentDoc = {
  slug: "card",
  name: "Card",
  description: "A surface that groups related content, with slots for header, action, content and footer.",
  category: "Data Display",
  demos: [
    { name: "default", component: Default },
    { name: "interactive", title: "Interactive", description: "`interactive` adds a soft lift on hover — great for link cards.", component: Interactive },
  ],
  usage: {
    imports: `import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"`,
    code: `<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
    <CardAction>…</CardAction>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>…</CardFooter>
</Card>`,
  },
  api: [
    {
      component: "Card",
      props: [{ name: "interactive", type: "boolean", default: "false", description: "Lifts the card and deepens its shadow on hover." }],
    },
  ],
  notes: ["Add `border-b` to `CardHeader` or `border-t` to `CardFooter` and the spacing adapts automatically."],
}
