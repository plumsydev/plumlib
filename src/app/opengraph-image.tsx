import { renderOg, ogSize } from "@/lib/og"
import { components } from "@/registry"

export const alt = "Plum UI — Components that move with intent"
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return renderOg({
    eyebrow: `${components.length} components · open source`,
    title: "Components that move with intent.",
    description: "Animated, accessible React components you copy into your app and own.",
  })
}
