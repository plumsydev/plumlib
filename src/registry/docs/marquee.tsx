import type { ComponentDoc } from "../types"
import Default from "../demos/marquee/default"
import Testimonials from "../demos/marquee/testimonials"
import Vertical from "../demos/marquee/vertical"
import MarqueePlayground from "../playgrounds/marquee"

export const doc: ComponentDoc = {
  slug: "marquee",
  name: "Marquee",
  description: "An infinite, seamless scroller for logos, testimonials and feeds. Eases to a stop on hover.",
  category: "Motion",
  dependencies: ["motion"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "testimonials", title: "Opposite rows", description: "Two rows with `reverse` on the second.", component: Testimonials },
    { name: "vertical", title: "Vertical", description: "`vertical` with a fixed height for a ticker-style feed.", component: Vertical },
  ],
  playground: MarqueePlayground,
  usage: {
    imports: "import { Marquee } from \"@/components/ui/marquee\"",
    code: `<Marquee speed={40} className="[--gap:3rem]">
  <span>Acme</span>
  <span>Globex</span>
</Marquee>`,
  },
  api: [
    {
      component: "Marquee",
      description: "Extends `div`. Set the spacing with `[--gap:…]`.",
      props: [
        { name: "speed", type: "number", default: "40", description: "Speed in px per second, independent of content length." },
        { name: "reverse", type: "boolean", default: "false", description: "Scroll the other way." },
        { name: "vertical", type: "boolean", default: "false", description: "Scroll vertically. Give the marquee a height." },
        { name: "pauseOnHover", type: "boolean", default: "true", description: "Smoothly decelerate to a stop while hovered." },
        { name: "fade", type: "boolean", default: "true", description: "Fade the edges with a mask." },
        { name: "repeat", type: "number", default: "4", description: "Copies of the content. Raise it if the content is narrower than the container." },
      ],
    },
  ],
  notes: ["Runs on the Web Animations API, so it stays on the compositor and never re-renders React.", "With reduced motion it becomes a regular scrollable row."],
}
