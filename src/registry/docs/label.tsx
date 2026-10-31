import type { ComponentDoc } from "../types"
import Default from "../demos/label/default"
import WithInput from "../demos/label/with-input"

export const doc: ComponentDoc = {
  slug: "label",
  name: "Label",
  description: "An accessible label that dims itself when its control is disabled.",
  category: "Inputs",
  primitive: { name: "Radix Label", href: "https://www.radix-ui.com/primitives/docs/components/label" },
  dependencies: ["radix-ui"],
  registryDependencies: ["checkbox", "input"],
  demos: [
    { name: "default", component: Default },
    { name: "with-input", title: "With input", component: WithInput },
  ],
  usage: {
    imports: `import { Label } from "@/components/ui/label"`,
    code: `<Label htmlFor="email">Email</Label>`,
  },
  api: [
    {
      component: "Label",
      description: "Extends Radix `Label.Root`. Pass `htmlFor` to link it to a control.",
      props: [{ name: "htmlFor", type: "string", description: "The id of the associated control." }],
    },
  ],
}
