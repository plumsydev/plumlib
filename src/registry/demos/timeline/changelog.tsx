"use client"

import { Badge } from "@/components/ui/badge"
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline"

const entries = [
  { version: "2.4.0", date: "Oct 28", kind: "Feature", title: "Edge config", body: "Read configuration from the edge with zero cold starts." },
  { version: "2.3.2", date: "Oct 21", kind: "Fix", title: "Faster cold builds", body: "Dependency installs are cached across branches." },
  { version: "2.3.0", date: "Oct 14", kind: "Feature", title: "Instant rollbacks", body: "Promote a previous deployment without rebuilding." },
  { version: "2.2.5", date: "Oct 02", kind: "Security", title: "Token scoping", body: "API tokens can now be limited to a single project." },
]

const variants = { Feature: "brand", Fix: "secondary", Security: "warning" } as const

export default function TimelineChangelog() {
  return (
    <Timeline className="w-full max-w-md">
      {entries.map((e) => (
        <TimelineItem key={e.version}>
          <TimelineIndicator />
          <TimelineContent>
            <TimelineHeader>
              <div className="flex items-center gap-2">
                <TimelineTitle>{e.title}</TimelineTitle>
                <Badge variant={variants[e.kind as keyof typeof variants]}>{e.kind}</Badge>
              </div>
              <TimelineTime>
                {e.date} · <span className="font-mono">v{e.version}</span>
              </TimelineTime>
            </TimelineHeader>
            <TimelineDescription>{e.body}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
