"use client"

import Link from "next/link"
import { Bell, Bold, Italic, Underline } from "lucide-react"
import { AnimatedNumber } from "@/components/ui/animated-number"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Marquee } from "@/components/ui/marquee"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { TextShimmer } from "@/components/ui/text-shimmer"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { SectionHeading } from "./reveal"
import * as React from "react"

function Ticker() {
  const [n, setN] = React.useState(2481)
  React.useEffect(() => {
    const t = setInterval(() => setN((v) => v + Math.round(Math.random() * 40 - 12)), 1800)
    return () => clearInterval(t)
  }, [])
  return <AnimatedNumber value={n} className="text-2xl font-semibold tracking-tight" />
}

const rowA = [
  { slug: "switch", node: <Switch defaultChecked aria-label="Demo switch" /> },
  { slug: "checkbox", node: <Checkbox defaultChecked aria-label="Demo checkbox" /> },
  { slug: "badge", node: <Badge variant="success" dot>Operational</Badge> },
  { slug: "spinner", node: <Spinner variant="dots" /> },
  { slug: "slider", node: <Slider defaultValue={[64]} className="w-32" aria-label="Demo slider" /> },
  { slug: "kbd", node: <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup> },
  { slug: "animated-number", node: <Ticker /> },
  {
    slug: "toggle-group",
    node: (
      <ToggleGroup type="single" variant="outline" size="sm" defaultValue="b" aria-label="Format">
        <ToggleGroupItem value="b" aria-label="Bold"><Bold /></ToggleGroupItem>
        <ToggleGroupItem value="i" aria-label="Italic"><Italic /></ToggleGroupItem>
        <ToggleGroupItem value="u" aria-label="Underline"><Underline /></ToggleGroupItem>
      </ToggleGroup>
    ),
  },
]

const rowB = [
  { slug: "text-shimmer", node: <TextShimmer className="text-sm font-medium">Generating preview…</TextShimmer> },
  { slug: "progress", node: <Progress value={null} className="w-32" /> },
  {
    slug: "avatar",
    node: (
      <AvatarGroup>
        {["RB", "LM", "AK", "JD"].map((i) => (
          <Avatar key={i} className="size-8"><AvatarFallback className="text-[10px]">{i}</AvatarFallback></Avatar>
        ))}
      </AvatarGroup>
    ),
  },
  { slug: "button", node: <Button size="sm" variant="outline">Invite</Button> },
  { slug: "toggle", node: <Toggle aria-label="Notifications" defaultPressed><Bell /></Toggle> },
  { slug: "spinner", node: <Spinner variant="bars" /> },
  {
    slug: "tooltip",
    node: (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="sm" variant="secondary">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>Tooltips spring from their trigger</TooltipContent>
      </Tooltip>
    ),
  },
  { slug: "badge", node: <Badge variant="brand">New</Badge> },
]

function Tile({ slug, node }: { slug: string; node: React.ReactNode }) {
  return (
    <div className="group/tile flex h-32 w-56 shrink-0 flex-col rounded-xl border bg-card shadow-xs transition-[border-color,box-shadow] duration-300 hover:border-foreground/15 hover:shadow-md">
      <div className="flex flex-1 items-center justify-center px-4">{node}</div>
      <Link
        href={`/docs/components/${slug}`}
        className="border-t px-3 py-2 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
      >
        {slug}
      </Link>
    </div>
  )
}

export function Gallery() {
  return (
    <section className="py-24 sm:py-32">
      <div className="px-4 sm:px-6">
        <SectionHeading
          eyebrow="Gallery"
          title="Every piece, alive."
          description="Hover a row to slow it down, then play with anything you see."
        />
      </div>
      <div className="space-y-3">
        <Marquee speed={32} className="[--gap:0.75rem]">
          <div className="flex gap-3 pr-3">
            {rowA.map((t, i) => <Tile key={i} {...t} />)}
          </div>
        </Marquee>
        <Marquee speed={32} reverse className="[--gap:0.75rem]">
          <div className="flex gap-3 pr-3">
            {rowB.map((t, i) => <Tile key={i} {...t} />)}
          </div>
        </Marquee>
      </div>
    </section>
  )
}
