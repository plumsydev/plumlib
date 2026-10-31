"use client"

import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "@/components/ui/carousel"

const quotes = [
  { quote: "We moved our whole design system over in an afternoon. The motion is what sold the team.", name: "Léa Martin", role: "Design lead, Northwind" },
  { quote: "It feels like the components were made by someone who actually ships product.", name: "Sam Okafor", role: "Staff engineer, Lumen" },
  { quote: "Our onboarding flow got noticeably smoother. Support tickets about it dropped by a third.", name: "Ines Duarte", role: "PM, Parcel" },
  { quote: "Owning the code means we never wait on a release to fix a detail.", name: "Tom Becker", role: "CTO, Fieldnote" },
]

export default function CarouselAutoplay() {
  return (
    <Carousel autoplay={4000} loop className="w-full max-w-md">
      <CarouselContent>
        {quotes.map((q) => (
          <CarouselItem key={q.name}>
            <figure className="rounded-xl border bg-card p-6">
              <blockquote className="text-[15px] leading-relaxed text-pretty">&ldquo;{q.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {q.name.split(" ").map((p) => p[0]).join("")}
                </span>
                <span>
                  <span className="block text-sm font-medium">{q.name}</span>
                  <span className="block text-xs text-muted-foreground">{q.role}</span>
                </span>
              </figcaption>
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots className="mt-4" />
      <p className="mt-2 text-center text-xs text-muted-foreground">Hover to pause</p>
    </Carousel>
  )
}
