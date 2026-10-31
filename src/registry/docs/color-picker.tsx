import type { ComponentDoc } from "../types"
import Default from "../demos/color-picker/default"
import Panel from "../demos/color-picker/panel"
import Theme from "../demos/color-picker/theme"
import Playground from "../playgrounds/color-picker"

export const doc: ComponentDoc = {
  slug: "color-picker",
  name: "Color Picker",
  description: "Saturation area, hue slider, hex input, swatches and the native eyedropper, in a popover or inline. No color library needed.",
  category: "Inputs",
  isNew: true,
  dependencies: ["motion", "lucide-react", "radix-ui"],
  registryDependencies: ["popover"],
  demos: [
    { name: "default", component: Default },
    { name: "panel", title: "Inline panel", description: "`ColorPickerPanel` renders without the popover.", component: Panel },
    { name: "theme", title: "Theme editor", component: Theme },
  ],
  playground: Playground,
  usage: {
    imports: `import { ColorPicker } from "@/components/ui/color-picker"`,
    code: `<ColorPicker defaultValue="#8b5cf6" />`,
  },
  api: [
    {
      component: "ColorPicker",
      props: [
        { name: "value", type: "string", description: "Controlled hex color." },
        { name: "defaultValue", type: "string", default: '"#8b5cf6"', description: "Initial color when uncontrolled." },
        { name: "onValueChange", type: "(hex: string) => void", description: "Called while dragging and typing." },
        { name: "swatches", type: "string[]", description: "Preset colors. Pass `[]` to hide them." },
        { name: "align", type: '"start" | "center" | "end"', default: '"start"', description: "Popover alignment." },
        { name: "children", type: "ReactNode", description: "Custom trigger." },
      ],
    },
    {
      component: "ColorPickerPanel",
      props: [
        { name: "value", type: "string", required: true, description: "Hex color." },
        { name: "onValueChange", type: "(hex: string) => void", required: true, description: "Change handler." },
        { name: "swatches", type: "string[]", description: "Preset colors." },
      ],
    },
  ],
  notes: [
    "Both sliders are keyboard accessible: arrows nudge by 1%, Shift by 10%.",
    "The eyedropper button only shows in browsers that support the `EyeDropper` API.",
  ],
}
