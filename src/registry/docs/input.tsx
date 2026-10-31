import type { ComponentDoc } from "../types"
import Default from "../demos/input/default"
import WithIcons from "../demos/input/with-icons"
import Sizes from "../demos/input/sizes"
import States from "../demos/input/states"
import Playground from "../playgrounds/input"

export const doc: ComponentDoc = {
  slug: "input",
  name: "Input",
  description: "A text field with a calm focus ring, three sizes and an input group for icons, prefixes and shortcuts.",
  category: "Inputs",
  dependencies: ["class-variance-authority"],
  registryDependencies: ["kbd"],
  demos: [
    { name: "default", component: Default },
    {
      name: "with-icons",
      title: "Input group",
      description: "Wrap an `Input` in `InputGroup` and add `InputAddon`s. The ring moves to the group and icons light up on focus.",
      component: WithIcons,
    },
    { name: "sizes", title: "Sizes", component: Sizes },
    { name: "states", title: "States", description: "Invalid, disabled and file inputs.", component: States },
  ],
  playground: Playground,
  usage: {
    imports: `import { Input, InputAddon, InputGroup } from "@/components/ui/input"`,
    code: `<InputGroup>
  <InputAddon><Search /></InputAddon>
  <Input placeholder="Search…" />
</InputGroup>`,
  },
  api: [
    {
      component: "Input",
      description: "Extends the native input element.",
      props: [
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Height and padding." },
        { name: "aria-invalid", type: "boolean", description: "Shows the destructive border and ring." },
      ],
    },
    {
      component: "InputGroup",
      description: "A div that hosts the focus ring and lays out addons around the input.",
      props: [],
    },
    {
      component: "InputAddon",
      props: [{ name: "align", type: '"start" | "end"', default: '"start"', description: "Which side of the input the addon sits on." }],
    },
  ],
  notes: ["The default size uses a 16px font on mobile so iOS doesn’t zoom on focus."],
}
