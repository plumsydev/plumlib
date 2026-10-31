import type { ComponentDoc } from "../types"
import Default from "../demos/spinner/default"
import Sizes from "../demos/spinner/sizes"
import Inline from "../demos/spinner/inline"
import SpinnerPlayground from "../playgrounds/spinner"

export const doc: ComponentDoc = {
  slug: "spinner",
  name: "Spinner",
  description: "Loading indicators in three flavors — ring, dots and bars — that inherit the current text color.",
  category: "Feedback",
  dependencies: ["motion"],
  demos: [
    { name: "default", component: Default },
    { name: "sizes", title: "Sizes & color", description: "Size tokens, or any `size-*` and `text-*` class.", component: Sizes },
    { name: "inline", title: "Inline", component: Inline },
  ],
  playground: SpinnerPlayground,
  usage: {
    imports: `import { Spinner } from "@/components/ui/spinner"`,
    code: `<Spinner variant="bars" />`,
  },
  api: [
    {
      component: "Spinner",
      props: [
        { name: "variant", type: '"ring" | "dots" | "bars"', default: '"ring"', description: "Animation style." },
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Size token (14, 16 or 24px)." },
      ],
    },
  ],
  notes: ["Rendered with `role=\"status\"` and an accessible label. Override `aria-label` to describe what's loading."],
}
