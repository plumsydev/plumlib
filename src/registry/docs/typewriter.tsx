import type { ComponentDoc } from "../types"
import Default from "../demos/typewriter/default"
import Terminal from "../demos/typewriter/terminal"
import Search from "../demos/typewriter/search"
import TypewriterPlayground from "../playgrounds/typewriter"

export const doc: ComponentDoc = {
  slug: "typewriter",
  name: "Typewriter",
  description: "Types, pauses and deletes a rotating list of words with a natural rhythm and a blinking caret.",
  category: "Motion",
  dependencies: ["motion"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "terminal", title: "Terminal", description: "A block caret and faster typing for command-line vibes.", component: Terminal },
    { name: "search", title: "Animated placeholder", description: "Suggestions type themselves until the user focuses the field.", component: Search },
  ],
  playground: TypewriterPlayground,
  usage: {
    imports: "import { Typewriter } from \"@/components/ui/typewriter\"",
    code: `<Typewriter words={["fast.", "alive.", "yours."]} />`,
  },
  api: [
    {
      component: "Typewriter",
      props: [
        { name: "words", type: "string[]", required: true, description: "Words to cycle through." },
        { name: "typeSpeed", type: "number", default: "70", description: "Milliseconds per typed character (slightly randomized)." },
        { name: "deleteSpeed", type: "number", default: "35", description: "Milliseconds per deleted character." },
        { name: "pause", type: "number", default: "1600", description: "Milliseconds to hold a finished word." },
        { name: "loop", type: "boolean", default: "true", description: "Start over after the last word." },
        { name: "cursor", type: "boolean", default: "true", description: "Show the caret." },
        { name: "cursorClassName", type: "string", description: "Classes for the caret." },
      ],
    },
  ],
  notes: ["The caret stays solid while typing and blinks while waiting, like a real text field.", "Screen readers read the full list once; the typing itself is hidden.", "With reduced motion, words crossfade instead of being typed."],
}
