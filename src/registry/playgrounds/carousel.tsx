"use client"

import { Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Playground } from "@/components/site/playground"

const basis = { "1": "basis-full", "2": "basis-1/2", "3": "basis-1/3" } as const

export default function CarouselPlayground() {
  return (
    <Playground
      controls={{
        perView: { type: "select", options: ["1", "2", "3"], default: "1", label: "per view" },
        slides: { type: "number", default: 6, min: 2, max: 10 },
        loop: { type: "boolean", default: false },
        autoplay: { type: "boolean", default: false },
        arrows: { type: "boolean", default: true },
        dots: { type: "boolean", default: true },
      }}
      render={({ perView, slides, loop, autoplay, arrows, dots }) => (
        <Carousel key={`${perView}-${slides}-${loop}-${autoplay}`} loop={loop} autoplay={autoplay ? 2500 : undefined} className="w-full max-w-md">
          <CarouselContent>
            {Array.from({ length: slides }, (_, i) => (
              <CarouselItem key={i} className={basis[perView]}>
                <div
                  className="flex aspect-square items-center justify-center rounded-xl border text-3xl font-semibold tabular-nums"
                  style={{ background: `oklch(0.7 0.12 ${(i * 47) % 360} / 0.18)` }}
                >
                  {i + 1}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {(arrows || dots) && (
            <div className="mt-4 flex items-center justify-between gap-3">
              {arrows ? <CarouselPrevious /> : <span />}
              {dots && <CarouselDots />}
              {arrows ? <CarouselNext /> : <span />}
            </div>
          )}
        </Carousel>
      )}
      code={({ perView, loop, autoplay, arrows, dots }) => `<Carousel${loop ? " loop" : ""}${autoplay ? " autoplay={2500}" : ""}>
  <CarouselContent>
    <CarouselItem${perView === "1" ? "" : ` className="${basis[perView]}"`}>…</CarouselItem>
  </CarouselContent>${arrows ? "\n  <CarouselPrevious />\n  <CarouselNext />" : ""}${dots ? "\n  <CarouselDots />" : ""}
</Carousel>`}
    />
  )
}
