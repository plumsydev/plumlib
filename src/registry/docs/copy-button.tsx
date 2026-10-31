import type { ComponentDoc } from "../types"
import Default from "../demos/copy-button/default"
import WithLabel from "../demos/copy-button/with-label"

export const doc: ComponentDoc = {
  slug: "copy-button",
  name: "Copy Button",
  description: "Copies text to the clipboard and confirms with a blurred icon swap. Handles failures gracefully.",
  category: "Inputs",
  dependencies: ["motion", "lucide-react"],
  registryDependencies: ["button"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "with-label", title: "With label", description: "Pass `label` and the text swaps too.", component: WithLabel },
  ],
  usage: {
    imports: `import { CopyButton } from "@/components/ui/copy-button"`,
    code: `<CopyButton value="npm i plum" />`,
  },
  api: [
    {
      component: "CopyButton",
      description: "Accepts every Button prop except `loading`.",
      props: [
        { name: "value", type: "string | (() => string)", required: true, description: "Text to copy, or a function evaluated on click." },
        { name: "label", type: "string", description: "Optional visible label. Without it the button is icon-only." },
        { name: "timeout", type: "number", default: "1600", description: "Milliseconds before resetting to idle." },
        { name: "onCopied", type: "(value: string) => void", description: "Called after a successful copy." },
      ],
    },
  ],
  notes: ["The button exposes `data-state=\"idle\" | \"copied\" | \"error\"` for custom styling."],
}
