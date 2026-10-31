"use client"

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

const events = [
  { title: "Repository connected", time: "09:12", body: "acme/web linked to the production environment.", status: "done" },
  { title: "Build completed", time: "09:14", body: "38s · 412 kB of JavaScript · cache hit on 92% of modules.", status: "done" },
  { title: "Checks passed", time: "09:15", body: "Lighthouse 98, end-to-end suite green across 3 browsers.", status: "done" },
  { title: "Promoting to production", time: "now", body: "Routing traffic gradually: 25% of requests are on the new version.", status: "current" },
  { title: "Old deployment retired", time: "—", body: "Kept warm for 24 hours for instant rollback.", status: "upcoming" },
] as const

export default function TimelineDemo() {
  return (
    <Timeline className="w-full max-w-md">
      {events.map((e) => (
        <TimelineItem key={e.title} status={e.status}>
          <TimelineIndicator />
          <TimelineContent>
            <TimelineHeader>
              <TimelineTitle>{e.title}</TimelineTitle>
              <TimelineTime>{e.time}</TimelineTime>
            </TimelineHeader>
            <TimelineDescription>{e.body}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
