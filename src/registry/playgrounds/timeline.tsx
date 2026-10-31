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
import { Playground } from "@/components/site/playground"

const steps = ["Ticket opened", "Triaged", "Fix in review", "Deployed", "Customer notified"]

export default function TimelinePlayground() {
  return (
    <Playground
      controls={{
        current: { type: "number", default: 2, min: 0, max: 5, label: "current step" },
        descriptions: { type: "boolean", default: true },
        times: { type: "boolean", default: true },
      }}
      render={({ current, descriptions, times }) => (
        <Timeline animated={false} className="w-full max-w-sm">
          {steps.map((s, i) => (
            <TimelineItem key={s} status={i < current ? "done" : i === current ? "current" : "upcoming"}>
              <TimelineIndicator />
              <TimelineContent>
                <TimelineHeader>
                  <TimelineTitle>{s}</TimelineTitle>
                  {times && <TimelineTime>{i <= current ? `${9 + i}:0${i}` : "—"}</TimelineTime>}
                </TimelineHeader>
                {descriptions && <TimelineDescription>Updated by the on-call engineer.</TimelineDescription>}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      )}
      code={({ descriptions, times }) => `<Timeline>
  <TimelineItem status="done">
    <TimelineIndicator />
    <TimelineContent>
      <TimelineHeader>
        <TimelineTitle>Ticket opened</TimelineTitle>${times ? "\n        <TimelineTime>09:00</TimelineTime>" : ""}
      </TimelineHeader>${descriptions ? "\n      <TimelineDescription>Updated by the on-call engineer.</TimelineDescription>" : ""}
    </TimelineContent>
  </TimelineItem>
  <TimelineItem status="current">…</TimelineItem>
  <TimelineItem status="upcoming">…</TimelineItem>
</Timeline>`}
    />
  )
}
