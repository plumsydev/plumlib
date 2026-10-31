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
import { Playground } from "@/components/site/playground"

export default function ExpandablePlayground() {
  return (
    <Playground
      controls={{
        bounce: { type: "number", default: 0.12, min: 0, max: 0.5, step: 0.02 },
        duration: { type: "number", default: 0.5, min: 0.2, max: 1.2, step: 0.05 },
        hue: { type: "number", default: 330, min: 0, max: 360, step: 5 },
      }}
      render={({ bounce, duration, hue }) => {
        const bg = `linear-gradient(135deg, oklch(0.72 0.14 ${hue}), oklch(0.45 0.16 ${hue + 40}))`
        return (
          <Expandable transition={{ type: "spring", bounce, duration }}>
            <ExpandableTrigger className="w-56">
              <ExpandableMedia className="h-32">
                <div className="h-full w-full" style={{ background: bg }} />
              </ExpandableMedia>
              <div className="space-y-0.5 p-3">
                <ExpandableTitle className="text-sm">Spring tuning</ExpandableTitle>
                <ExpandableSubtitle className="text-xs">Click to expand</ExpandableSubtitle>
              </div>
            </ExpandableTrigger>
            <ExpandableContent className="max-w-md">
              <ExpandableClose />
              <ExpandableMedia className="h-52">
                <div className="h-full w-full" style={{ background: bg }} />
              </ExpandableMedia>
              <div className="space-y-2 p-6">
                <ExpandableTitle className="text-lg">Spring tuning</ExpandableTitle>
                <ExpandableSubtitle>bounce {bounce} · duration {duration}s</ExpandableSubtitle>
                <ExpandableDescription>Crank up the bounce and the card overshoots on its way in, then settles. Press Esc or click outside to fold it back.</ExpandableDescription>
              </div>
            </ExpandableContent>
          </Expandable>
        )
      }}
      code={({ bounce, duration }) => `<Expandable transition={{ type: "spring", bounce: ${bounce}, duration: ${duration} }}>
  <ExpandableTrigger>
    <ExpandableMedia>…</ExpandableMedia>
    <ExpandableTitle>Spring tuning</ExpandableTitle>
    <ExpandableSubtitle>Click to expand</ExpandableSubtitle>
  </ExpandableTrigger>
  <ExpandableContent>
    <ExpandableClose />
    <ExpandableMedia>…</ExpandableMedia>
    <ExpandableTitle>Spring tuning</ExpandableTitle>
    <ExpandableSubtitle>…</ExpandableSubtitle>
    <ExpandableDescription>Only rendered when open.</ExpandableDescription>
  </ExpandableContent>
</Expandable>`}
    />
  )
}
