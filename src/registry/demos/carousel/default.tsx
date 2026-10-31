"use client"

import { Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const releases = [
  { version: "v2.4", title: "Edge config", body: "Read feature flags in under a millisecond, from every region.", hue: 330 },
  { version: "v2.3", title: "Instant rollbacks", body: "Promote any previous deployment back to production in one click.", hue: 250 },
  { version: "v2.2", title: "Log drains", body: "Stream build and runtime logs to the tools you already use.", hue: 155 },
  { version: "v2.1", title: "Preview comments", body: "Leave feedback directly on preview deployments, pinned to the pixel.", hue: 40 },
  { version: "v2.0", title: "Monorepo support", body: "Only rebuild the apps that changed. Builds got 4x faster on average.", hue: 290 },
]

export default function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-md">
      <CarouselContent>
        {releases.map((r) => (
          <CarouselItem key={r.version}>
            <div className="relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-xl border bg-card p-6">
              {/* un halo de couleur par release, pas d'image externe à charger */}
              <div
                className="absolute -top-16 -right-16 size-56 rounded-full opacity-40 blur-3xl"
                style={{ background: `oklch(0.7 0.17 ${r.hue})` }}
              />
              <span className="relative mb-auto w-fit rounded-full border bg-background/70 px-2 py-0.5 font-mono text-xs backdrop-blur">
                {r.version}
              </span>
              <h3 className="relative text-xl font-semibold tracking-tight">{r.title}</h3>
              <p className="relative mt-1.5 text-sm text-muted-foreground">{r.body}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-4 flex items-center justify-between">
        <CarouselDots />
        <div className="flex gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
    </Carousel>
  )
}
