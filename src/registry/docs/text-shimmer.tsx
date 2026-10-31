import type { ComponentDoc } from "../types"
import Default from "../demos/text-shimmer/default"
import Speed from "../demos/text-shimmer/speed"
import Button from "../demos/text-shimmer/button"
import TextShimmerPlayground from "../playgrounds/text-shimmer"

export const doc: ComponentDoc = {
  slug: "text-shimmer",
  name: "Text Shimmer",
  description: "A soft highlight that sweeps across text — perfect for loading, thinking and generating states.",
  category: "Motion",
  dependencies: ["motion"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "speed", title: "Duration & spread", description: "Tune how fast the light travels and how wide it is.", component: Speed },
    { name: "button", title: "In a button", description: "Swap a label for a shimmering status while work happens.", component: Button },
  ],
  playground: TextShimmerPlayground,
  usage: {
    imports: "import { TextShimmer } from \"@/components/ui/text-shimmer\"",
    code: `<TextShimmer duration={1.5}>Thinking…</TextShimmer>`,
  },
  api: [
    {
      component: "TextShimmer",
      props: [
        { name: "children", type: "string", required: true, description: "The text to shimmer." },
        { name: "as", type: "\"span\" | \"p\" | \"div\" | \"h1\" | \"h2\" | \"h3\"", default: "\"span\"", description: "Element to render." },
        { name: "duration", type: "number", default: "2", description: "Seconds per sweep." },
        { name: "spread", type: "number", default: "2", description: "Highlight width, multiplied by the character count." },
      ],
    },
  ],
  notes: ["Colors come from `--muted-foreground` (base) and `--foreground` (highlight). Override `[--base:…]` and `[--shine:…]` via `className`."],
}
