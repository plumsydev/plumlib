"use client"

import {
  Expandable,
  ExpandableClose,
  ExpandableContent,
  ExpandableDescription,
  ExpandableMedia,
  ExpandableSubtitle,
  ExpandableTitle,
  ExpandableTrigger,
} from "@/components/ui/expandable"

const posts = [
  {
    title: "Designing for interruption",
    tag: "Motion · 6 min",
    hue: 330,
    body: "Springs can be interrupted mid-flight and keep their velocity. That single property is why they feel alive under the cursor, while keyframes feel canned.",
  },
  {
    title: "OKLCH in practice",
    tag: "Color · 4 min",
    hue: 245,
    body: "Perceptual lightness means a 0.56 blue and a 0.56 pink actually look equally bright. Theming stops being guesswork.",
  },
  {
    title: "The 100ms rule",
    tag: "Performance · 3 min",
    hue: 155,
    body: "Under 100ms feels instant. Every interaction in the library acknowledges input within that budget, even when the work takes longer.",
  },
]

export default function ExpandableGallery() {
  return (
    <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-3">
      {posts.map((p) => (
        <Expandable key={p.title}>
          <ExpandableTrigger>
            <ExpandableMedia className="h-28">
              <div className="h-full w-full" style={{ background: `linear-gradient(135deg, oklch(0.7 0.14 ${p.hue}), oklch(0.45 0.16 ${p.hue + 40}))` }} />
            </ExpandableMedia>
            <div className="space-y-1 p-3">
              <ExpandableTitle className="text-sm">{p.title}</ExpandableTitle>
              <ExpandableSubtitle className="text-xs">{p.tag}</ExpandableSubtitle>
            </div>
          </ExpandableTrigger>
          <ExpandableContent className="max-w-md">
            <ExpandableClose />
            <ExpandableMedia className="h-48">
              <div className="h-full w-full" style={{ background: `linear-gradient(135deg, oklch(0.7 0.14 ${p.hue}), oklch(0.45 0.16 ${p.hue + 40}))` }} />
            </ExpandableMedia>
            <div className="space-y-3 p-6">
              <ExpandableTitle className="text-lg">{p.title}</ExpandableTitle>
              <ExpandableSubtitle>{p.tag}</ExpandableSubtitle>
              <ExpandableDescription>{p.body}</ExpandableDescription>
            </div>
          </ExpandableContent>
        </Expandable>
      ))}
    </div>
  )
}
