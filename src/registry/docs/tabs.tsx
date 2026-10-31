import type { ComponentDoc } from "../types"
import Default from "../demos/tabs/default"
import Underline from "../demos/tabs/underline"
import Icons from "../demos/tabs/icons"
import TabsPlayground from "../playgrounds/tabs"

export const doc: ComponentDoc = {
  slug: "tabs",
  name: "Tabs",
  description: "Switch between views with a spring-loaded indicator that glides to the active tab.",
  category: "Navigation",
  primitive: { name: "Radix Tabs", href: "https://www.radix-ui.com/primitives/docs/components/tabs" },
  dependencies: ["radix-ui", "motion"],
  demos: [
    { name: "default", component: Default },
    { name: "underline", title: "Underline", description: "`variant=\"underline\"` on the list for page-level navigation.", component: Underline },
    { name: "icons", title: "With icons", component: Icons },
  ],
  playground: TabsPlayground,
  usage: {
    imports: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"`,
    code: `<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">…</TabsContent>
  <TabsContent value="password">…</TabsContent>
</Tabs>`,
  },
  api: [
    {
      component: "Tabs",
      description: "Accepts every Radix Tabs.Root prop.",
      props: [
        { name: "defaultValue", type: "string", description: "Initially active tab." },
        { name: "value / onValueChange", type: "string", description: "Controlled state." },
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Layout and keyboard navigation axis." },
      ],
    },
    {
      component: "TabsList",
      props: [{ name: "variant", type: '"pill" | "underline"', default: '"pill"', description: "Segmented pill or underline style." }],
    },
    {
      component: "TabsTrigger",
      props: [
        { name: "value", type: "string", required: true, description: "Value of the tab it activates." },
        { name: "disabled", type: "boolean", default: "false", description: "Prevents activation." },
      ],
    },
  ],
  notes: ["Each Tabs instance scopes its indicator with `useId()`, so several tab sets on one page never fight over the animation."],
}
