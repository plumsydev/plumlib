import { renderOg, ogSize } from "@/lib/og"

export const alt = "Plum UI documentation"
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return renderOg({
    eyebrow: "Documentation",
    title: "Install, theme, animate.",
    description: "Everything you need to set up Plum UI, from the CLI to the motion system.",
  })
}
