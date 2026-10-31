import type { ComponentDoc } from "../types"
import Default from "../demos/timeline/default"
import Tracking from "../demos/timeline/tracking"
import Changelog from "../demos/timeline/changelog"
import TimelinePlayground from "../playgrounds/timeline"

export const doc: ComponentDoc = {
  slug: "timeline",
  name: "Timeline",
  description: "A vertical sequence of events. The line draws itself as you scroll and each step slides in when it enters the viewport.",
  category: "Data Display",
  dependencies: ["motion"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "tracking", title: "Live status", description: "Change `status` on the fly: indicators morph between done, current and upcoming.", component: Tracking },
    { name: "changelog", title: "Changelog", description: "Compose freely with badges and metadata.", component: Changelog },
  ],
  playground: TimelinePlayground,
  usage: {
    imports: `import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline"`,
    code: `<Timeline>
  <TimelineItem status="done">
    <TimelineIndicator />
    <TimelineContent>
      <TimelineHeader>
        <TimelineTitle>Build completed</TimelineTitle>
        <TimelineTime>09:14</TimelineTime>
      </TimelineHeader>
      <TimelineDescription>38s · 412 kB</TimelineDescription>
    </TimelineContent>
  </TimelineItem>
</Timeline>`,
  },
  api: [
    {
      component: "Timeline",
      props: [{ name: "animated", type: "boolean", default: "true", description: "Draw the line on scroll and reveal items in view." }],
    },
    {
      component: "TimelineItem",
      props: [{ name: "status", type: '"done" | "current" | "upcoming"', default: '"done"', description: "Drives the indicator and title styles." }],
    },
    { component: "TimelineIndicator", description: "Defaults to a check, a pulsing dot or a hollow dot. Pass an icon as children to override.", props: [] },
  ],
}
