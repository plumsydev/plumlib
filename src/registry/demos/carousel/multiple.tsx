"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const templates = [
  { name: "Commerce", stack: "Next.js · Stripe", hue: 330 },
  { name: "Blog", stack: "Astro · MDX", hue: 200 },
  { name: "SaaS starter", stack: "Next.js · Postgres", hue: 155 },
  { name: "Docs", stack: "Next.js · Search", hue: 60 },
  { name: "Portfolio", stack: "Vite · Motion", hue: 290 },
  { name: "AI chatbot", stack: "Next.js · Streaming", hue: 20 },
  { name: "Dashboard", stack: "Remix · Charts", hue: 250 },
]

export default function CarouselMultiple() {
  return (
    <Carousel loop className="w-full max-w-xl">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Start from a template</h3>
          <p className="text-xs text-muted-foreground">Drag, swipe or use the arrow keys.</p>
        </div>
        <div className="flex gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
      <CarouselContent>
        {templates.map((t) => (
          <CarouselItem key={t.name} className="basis-1/2 sm:basis-1/3">
            <a href="#" onClick={(e) => e.preventDefault()} className="group block rounded-xl border bg-card p-3 transition-colors hover:border-foreground/20">
              <div className="relative mb-3 aspect-video overflow-hidden rounded-lg bg-muted">
                <div
                  className="absolute inset-x-3 top-3 bottom-0 rounded-t-md border border-b-0 bg-background shadow-sm transition-transform duration-500 ease-out-expo group-hover:-translate-y-1"
                  style={{ boxShadow: `0 -8px 24px -12px oklch(0.6 0.18 ${t.hue})` }}
                >
                  <div className="flex gap-1 p-1.5">
                    <span className="size-1 rounded-full bg-foreground/20" />
                    <span className="size-1 rounded-full bg-foreground/20" />
                    <span className="size-1 rounded-full bg-foreground/20" />
                  </div>
                  <div className="mx-2 h-1.5 w-2/3 rounded-full" style={{ background: `oklch(0.65 0.17 ${t.hue} / 0.6)` }} />
                  <div className="mx-2 mt-1 h-1 w-1/2 rounded-full bg-foreground/10" />
                </div>
              </div>
              <div className="text-sm font-medium">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.stack}</div>
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
