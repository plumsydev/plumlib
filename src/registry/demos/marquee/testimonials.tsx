"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Marquee } from "@/components/ui/marquee"

const quotes = [
  { name: "Léa Martin", role: "Design lead, Northwind", text: "We replaced three internal libraries in a week." },
  { name: "Sam Okafor", role: "Staff engineer, Globex", text: "The motion feels considered. Nothing is there for show." },
  { name: "Mia Chen", role: "Founder, Lumen", text: "Our onboarding finally feels like the rest of the product." },
  { name: "Tom Reyes", role: "Frontend, Initech", text: "Copy, paste, tweak. No package fighting back." },
  { name: "Ava Rossi", role: "PM, Hooli", text: "Users noticed the polish before we told them about it." },
  { name: "Noah Kim", role: "CTO, Tyrell", text: "Accessible by default saved us an audit cycle." },
]

function Quote({ q }: { q: (typeof quotes)[number] }) {
  return (
    <figure className="w-72 shrink-0 rounded-xl border bg-card p-4">
      <blockquote className="text-sm leading-6">“{q.text}”</blockquote>
      <figcaption className="mt-3 flex items-center gap-2.5">
        <Avatar className="size-7">
          <AvatarFallback className="text-[10px]">{q.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <div className="text-xs">
          <div className="font-medium">{q.name}</div>
          <div className="text-muted-foreground">{q.role}</div>
        </div>
      </figcaption>
    </figure>
  )
}

export default function MarqueeTestimonials() {
  return (
    <div className="w-full max-w-3xl space-y-3">
      <Marquee speed={30}>{quotes.slice(0, 3).map((q) => <Quote key={q.name} q={q} />)}</Marquee>
      <Marquee speed={30} reverse>{quotes.slice(3).map((q) => <Quote key={q.name} q={q} />)}</Marquee>
      <p className="text-center text-xs text-muted-foreground">Hover a row, it eases to a stop.</p>
    </div>
  )
}
