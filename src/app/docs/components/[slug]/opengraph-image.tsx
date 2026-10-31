import { renderOg, ogSize } from "@/lib/og"
import { components, getComponent } from "@/registry"

export const alt = "Plum UI component"
export const size = ogSize
export const contentType = "image/png"

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const doc = getComponent((await params).slug)
  return renderOg({
    eyebrow: doc ? `Component · ${doc.category}` : "Component",
    title: doc?.name ?? "Plum UI",
    description: doc?.description ?? "",
  })
}
