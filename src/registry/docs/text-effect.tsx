import type { ComponentDoc } from "../types"
import Default from "../demos/text-effect/default"
import Presets from "../demos/text-effect/presets"
import Streaming from "../demos/text-effect/streaming"
import Lines from "../demos/text-effect/lines"
import TextEffectPlayground from "../playgrounds/text-effect"

export const doc: ComponentDoc = {
  slug: "text-effect",
  name: "Text Effect",
  description: "Reveals text word by word, letter by letter or line by line, with blur, slide, scale or fade presets.",
  category: "Motion",
  dependencies: ["motion"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "presets", title: "Presets", description: "Switch preset and granularity — the effect replays on every change.", component: Presets },
    { name: "streaming", title: "Streaming answer", description: "Pair it with `TextShimmer` for an AI response that thinks, then flows in.", component: Streaming },
    { name: "lines", title: "Per line", description: "`per=\"line\"` with `trigger=\"inView\"` for quotes and long-form copy.", component: Lines },
  ],
  playground: TextEffectPlayground,
  usage: {
    imports: "import { TextEffect } from \"@/components/ui/text-effect\"",
    code: `<TextEffect per="word" preset="blur">
  Ship interfaces people remember.
</TextEffect>`,
  },
  api: [
    {
      component: "TextEffect",
      props: [
        { name: "children", type: "string", required: true, description: "The text to animate." },
        { name: "per", type: "\"word\" | \"char\" | \"line\"", default: "\"word\"", description: "Granularity of each animated segment." },
        { name: "preset", type: "\"fade\" | \"blur\" | \"slide\" | \"scale\"", default: "\"blur\"", description: "Entrance style of each segment." },
        { name: "as", type: "\"p\" | \"span\" | \"div\" | \"h1\" | \"h2\" | \"h3\"", default: "\"p\"", description: "Element to render." },
        { name: "delay", type: "number", default: "0", description: "Seconds before the first segment." },
        { name: "stagger", type: "number", default: "per-dependent", description: "Seconds between segments (0.03 char, 0.08 word, 0.16 line)." },
        { name: "trigger", type: "\"mount\" | \"inView\"", default: "\"mount\"", description: "Play immediately or when scrolled into view." },
        { name: "once", type: "boolean", default: "true", description: "With `inView`, only play the first time." },
        { name: "segmentClassName", type: "string", description: "Classes applied to each segment." },
        { name: "onComplete", type: "() => void", description: "Called when the last segment has landed." },
      ],
    },
  ],
  notes: ["Screen readers get the full sentence through `aria-label`; the animated segments are hidden from assistive tech.", "Change the `key` to replay the animation.", "With reduced motion, segments simply fade in together."],
}
