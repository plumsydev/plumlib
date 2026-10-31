"use client"

import * as React from "react"
import { Check, Package, PackageCheck, Truck, Warehouse } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
  type TimelineStatus,
} from "@/components/ui/timeline"

const steps = [
  { title: "Order placed", body: "Payment confirmed for order #20481.", time: "Mon 14:02", icon: Check },
  { title: "Packed", body: "Your items left the shelf and were boxed.", time: "Mon 18:40", icon: Package },
  { title: "At the hub", body: "Sorted at the Lyon distribution center.", time: "Tue 06:15", icon: Warehouse },
  { title: "Out for delivery", body: "With the courier, expected before 13:00.", time: "Tue 09:30", icon: Truck },
  { title: "Delivered", body: "Left at the front desk, signed by A. Roux.", time: "Tue 11:48", icon: PackageCheck },
]

export default function TimelineTracking() {
  const [current, setCurrent] = React.useState(2)
  const status = (i: number): TimelineStatus => (i < current ? "done" : i === current ? "current" : "upcoming")

  return (
    <div className="w-full max-w-md space-y-6">
      <Timeline animated={false}>
        {steps.map((s, i) => {
          const Icon = s.icon
          return (
            <TimelineItem key={s.title} status={status(i)}>
              <TimelineIndicator>{i <= current ? <Icon /> : undefined}</TimelineIndicator>
              <TimelineContent>
                <TimelineHeader>
                  <TimelineTitle>{s.title}</TimelineTitle>
                  <TimelineTime>{i <= current ? s.time : "Pending"}</TimelineTime>
                </TimelineHeader>
                <TimelineDescription>{s.body}</TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          )
        })}
      </Timeline>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}>
          Step back
        </Button>
        <Button size="sm" onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))} disabled={current === steps.length - 1}>
          Advance shipment
        </Button>
      </div>
    </div>
  )
}
