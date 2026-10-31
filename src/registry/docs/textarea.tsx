import type { ComponentDoc } from "../types"
import Default from "../demos/textarea/default"
import AutoResize from "../demos/textarea/auto-resize"
import WithCounter from "../demos/textarea/with-counter"
import Playground from "../playgrounds/textarea"

export const doc: ComponentDoc = {
  slug: "textarea",
  name: "Textarea",
  description: "A multi-line text field that can grow with its content — no JavaScript required.",
  category: "Inputs",
  demos: [
    { name: "default", component: Default },
    {
      name: "auto-resize",
      title: "Auto resize",
      description: "`autoResize` uses CSS `field-sizing: content`. Browsers without support fall back to a fixed height.",
      component: AutoResize,
    },
    { name: "with-counter", title: "With counter", component: WithCounter },
  ],
  registryDependencies: ["label"],
  playground: Playground,
  usage: {
    imports: `import { Textarea } from "@/components/ui/textarea"`,
    code: `<Textarea autoResize placeholder="Write something…" />`,
  },
  api: [
    {
      component: "Textarea",
      description: "Extends the native textarea element.",
      props: [{ name: "autoResize", type: "boolean", default: "false", description: "Grow with content using field-sizing." }],
    },
  ],
}
