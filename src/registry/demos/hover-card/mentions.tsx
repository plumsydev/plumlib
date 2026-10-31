"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

const people = {
  lea: { name: "Léa Martin", role: "Design engineer", team: "Interface", status: "In a meeting until 15:00", tone: "bg-brand/15 text-brand" },
  alex: { name: "Alex Kim", role: "Staff engineer", team: "Platform", status: "Focusing", tone: "bg-info/15 text-info" },
  sam: { name: "Sam Nguyen", role: "Product manager", team: "Growth", status: "Available", tone: "bg-success/15 text-success" },
}

function Mention({ id }: { id: keyof typeof people }) {
  const p = people[id]
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <a href="#" className="rounded-sm bg-brand/10 px-1 font-medium text-brand transition-colors hover:bg-brand/20">
          @{p.name.split(" ")[0]}
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-64" showArrow>
        <div className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarFallback className={p.tone}>{p.name.split(" ").map((w) => w[0]).join("")}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium">{p.name}</div>
            <div className="text-xs text-muted-foreground">{p.role}</div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <Badge variant="outline">{p.team}</Badge>
          <span className="text-muted-foreground">{p.status}</span>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default function HoverCardMentions() {
  return (
    <div className="max-w-sm rounded-xl border bg-card p-4 text-sm leading-7">
      <Mention id="lea" /> pushed the new tokens. <Mention id="alex" /> can you check the dark mode borders before{" "}
      <Mention id="sam" /> sends the changelog?
    </div>
  )
}
