import type { ComponentDoc } from "../types"
import Default from "../demos/carousel/default"
import Multiple from "../demos/carousel/multiple"
import Autoplay from "../demos/carousel/autoplay"
import Counter from "../demos/carousel/counter"
import CarouselPlayground from "../playgrounds/carousel"

export const doc: ComponentDoc = {
  slug: "carousel",
  name: "Carousel",
  description: "A drag-to-swipe slider with momentum, spring snapping, animated dots and an optional story-style autoplay. No carousel library involved.",
  category: "Data Display",
  dependencies: ["motion", "lucide-react"],
  registryDependencies: ["button"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "multiple", title: "Several per view", description: "Size slides with `basis-*` classes. `loop` wraps around at both ends.", component: Multiple },
    { name: "autoplay", title: "Autoplay", description: "The active dot fills up like a story. Hovering or focusing the carousel pauses it.", component: Autoplay },
    { name: "counter", title: "Custom controls", description: "`useCarousel()` exposes the index, count and navigation anywhere inside the carousel.", component: Counter },
  ],
  playground: CarouselPlayground,
  usage: {
    imports: `import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"`,
    code: `<Carousel>
  <CarouselContent>
    <CarouselItem>…</CarouselItem>
    <CarouselItem>…</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
  <CarouselDots />
</Carousel>`,
  },
  api: [
    {
      component: "Carousel",
      props: [
        { name: "loop", type: "boolean", default: "false", description: "Wrap from the last slide to the first and back." },
        { name: "autoplay", type: "number", description: "Delay between slides in ms. Pauses on hover, focus and drag." },
        { name: "defaultIndex", type: "number", default: "0", description: "Initial slide." },
        { name: "onIndexChange", type: "(index: number) => void", description: "Called when the active slide changes." },
      ],
    },
    { component: "CarouselItem", description: "A slide. Use `basis-1/2`, `basis-1/3`… to show several per view.", props: [] },
    { component: "CarouselPrevious / CarouselNext", description: "Button props. Disabled at the ends unless `loop`.", props: [] },
    { component: "CarouselDots", description: "Clickable indicators. With `autoplay`, the active one shows progress.", props: [] },
    { component: "useCarousel()", description: "Returns `index`, `count`, `scrollTo`, `prev`, `next`, `canPrev`, `canNext`.", props: [] },
  ],
  notes: [
    "Snap points are measured from the real slides, so mixed widths work.",
    "Swipes are projected with their velocity: a quick flick skips further than a slow drag.",
    "Arrow keys navigate when focus is inside the carousel; clicks are cancelled after a drag so links don't fire by accident.",
  ],
}
