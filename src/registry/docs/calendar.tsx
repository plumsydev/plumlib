import type { ComponentDoc } from "../types"
import Default from "../demos/calendar/default"
import Range from "../demos/calendar/range"
import Multiple from "../demos/calendar/multiple"
import Booking from "../demos/calendar/booking"
import CalendarPlayground from "../playgrounds/calendar"

export const doc: ComponentDoc = {
  slug: "calendar",
  name: "Calendar",
  description:
    "A date grid with single, range and multiple selection. Months slide in the direction you navigate and the selection pill glides between days. Zero date library.",
  category: "Inputs",
  dependencies: ["motion", "lucide-react"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "range", title: "Range", description: "Two months side by side, `minDate` to block the past and a live preview of the range on hover.", component: Range },
    { name: "multiple", title: "Multiple", description: "Pick any number of days. Each one pops in with a spring.", component: Multiple },
    { name: "booking", title: "Booking", description: "Weekends disabled, a two-month window and time slots that react to the selected day.", component: Booking },
  ],
  playground: CalendarPlayground,
  usage: {
    imports: `import { Calendar, type DateRange } from "@/components/ui/calendar"`,
    code: `const [date, setDate] = React.useState<Date | undefined>(new Date())

<Calendar mode="single" selected={date} onSelect={setDate} />`,
  },
  api: [
    {
      component: "Calendar",
      props: [
        { name: "mode", type: '"single" | "range" | "multiple"', default: '"single"', description: "Selection model. Drives the type of `selected` and `onSelect`." },
        { name: "selected", type: "Date | DateRange | Date[]", description: "Controlled selection. Leave it out to let the calendar manage its own state." },
        { name: "defaultSelected", type: "Date | DateRange | Date[]", description: "Initial selection when uncontrolled." },
        { name: "onSelect", type: "(value) => void", description: "Called with the new selection. Clicking a selected day in single mode clears it." },
        { name: "month", type: "Date", description: "Controlled visible month." },
        { name: "defaultMonth", type: "Date", description: "Initial visible month. Defaults to the selection, then today." },
        { name: "onMonthChange", type: "(month: Date) => void", description: "Called when navigating." },
        { name: "numberOfMonths", type: "1 | 2", default: "1", description: "Render one or two months side by side." },
        { name: "disabled", type: "(date: Date) => boolean", description: "Return true to disable a day." },
        { name: "minDate", type: "Date", description: "Days before are disabled and navigation stops." },
        { name: "maxDate", type: "Date", description: "Days after are disabled and navigation stops." },
        { name: "weekStartsOn", type: "0 | 1", default: "1", description: "0 for Sunday, 1 for Monday." },
        { name: "locale", type: "string", default: '"en-US"', description: "Any BCP 47 locale. Month and weekday names come from `Intl`." },
        { name: "showOutsideDays", type: "boolean", default: "true", description: "Show the trailing days of the adjacent months." },
        { name: "children", type: "ReactNode", description: "Footer rendered under the grid." },
      ],
    },
  ],
  notes: [
    "Keyboard: arrows move by day and week, `PageUp`/`PageDown` by month (add `Shift` for a year), `Home`/`End` jump to the week edges, `Enter` selects.",
    "Every grid has six rows, so the height never jumps between months.",
  ],
}
