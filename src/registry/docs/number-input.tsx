import type { ComponentDoc } from "../types"
import Default from "../demos/number-input/default"
import Formats from "../demos/number-input/formats"
import Cart from "../demos/number-input/cart"
import Sizes from "../demos/number-input/sizes"
import Playground from "../playgrounds/number-input"

export const doc: ComponentDoc = {
  slug: "number-input",
  name: "Number Input",
  description: "A numeric stepper whose digits roll into place. Hold to repeat, arrow keys, Intl formatting and a polite shake at the bounds.",
  category: "Inputs",
  isNew: true,
  dependencies: ["motion", "lucide-react", "class-variance-authority"],
  registryDependencies: ["animated-number"],
  demos: [
    { name: "default", component: Default },
    { name: "formats", title: "Formats", description: "Any `Intl.NumberFormat` options: currency, percent, units.", component: Formats },
    { name: "cart", title: "Cart", description: "Quantities driving an animated total.", component: Cart },
    { name: "sizes", title: "Sizes", component: Sizes },
  ],
  playground: Playground,
  usage: {
    imports: `import { NumberInput } from "@/components/ui/number-input"`,
    code: `<NumberInput defaultValue={3} min={1} max={10} />`,
  },
  api: [
    {
      component: "NumberInput",
      description: "Extends the native input, minus `type`, `value` and `onChange`.",
      props: [
        { name: "value", type: "number", description: "Controlled value." },
        { name: "defaultValue", type: "number", default: "0", description: "Initial value when uncontrolled." },
        { name: "onValueChange", type: "(value: number) => void", description: "Called with the clamped, step-rounded value." },
        { name: "min / max", type: "number", default: "-Infinity / Infinity", description: "Bounds. Hitting them shakes the field." },
        { name: "step", type: "number", default: "1", description: "Increment. Shift multiplies by 10 from the keyboard." },
        { name: "format", type: "Intl.NumberFormatOptions", description: "How the value is displayed when not focused." },
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Height." },
        { name: "hideControls", type: "boolean", default: "false", description: "Hide the − and + buttons." },
        { name: "containerClassName", type: "string", description: "Classes for the outer wrapper." },
      ],
    },
  ],
  notes: [
    "Exposes `role=\"spinbutton\"` with `aria-valuenow`, `aria-valuemin` and `aria-valuemax`.",
    "Home and End jump to `min` and `max` when they are finite. Typing a value commits on Enter or blur.",
  ],
}
