"use client"

import { AnimatedNumber } from "@/components/ui/animated-number"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, useCarousel } from "@/components/ui/carousel"

const shots = ["Overview", "Deployments", "Analytics", "Logs", "Settings", "Billing"]

function Counter() {
  // useCarousel donne accès à l'index n'importe où ds le carousel
  const { index, count } = useCarousel()
  return (
    <div className="flex items-center gap-1 font-mono text-sm tabular-nums">
      <AnimatedNumber value={index + 1} />
      <span className="text-muted-foreground">/ {count}</span>
    </div>
  )
}

export default function CarouselCounter() {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent>
        {shots.map((s, i) => (
          <CarouselItem key={s}>
            <div className="flex aspect-video flex-col rounded-xl border bg-card p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Screen {i + 1}</span>
                <span className="font-mono">acme.app/{s.toLowerCase()}</span>
              </div>
              <div className="mt-auto text-lg font-semibold tracking-tight">{s}</div>
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                {[0, 1, 2].map((b) => (
                  <div key={b} className="h-8 rounded-md bg-muted" style={{ opacity: 1 - b * 0.25 }} />
                ))}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-3 flex items-center justify-between">
        <CarouselPrevious variant="ghost" />
        <Counter />
        <CarouselNext variant="ghost" />
      </div>
    </Carousel>
  )
}
