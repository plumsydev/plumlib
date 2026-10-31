import type { ComponentDoc } from "../types"
import Default from "../demos/date-picker/default"
import Range from "../demos/date-picker/range"
import Form from "../demos/date-picker/form"
import DatePickerPlayground from "../playgrounds/date-picker"

export const doc: ComponentDoc = {
  slug: "date-picker",
  name: "Date Picker",
  description: "A Calendar in a Popover, with a trigger whose label cross-fades as you pick. Comes with a range variant and smart presets.",
  category: "Inputs",
  dependencies: ["motion", "lucide-react"],
  registryDependencies: ["calendar", "popover"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "range", title: "Range with presets", description: "Presets on the side, two months, and the dashboard numbers roll as the range changes.", component: Range },
    { name: "form", title: "In a form", description: "Works with `Field`: invalid state, error message, weekdays only.", component: Form },
  ],
  playground: DatePickerPlayground,
  usage: {
    imports: `import { DatePicker, DateRangePicker } from "@/components/ui/date-picker"`,
    code: `const [date, setDate] = React.useState<Date>()

<DatePicker value={date} onChange={setDate} />`,
  },
  api: [
    {
      component: "DatePicker",
      props: [
        { name: "value", type: "Date", description: "Controlled value." },
        { name: "defaultValue", type: "Date", description: "Initial value when uncontrolled." },
        { name: "onChange", type: "(date: Date | undefined) => void", description: "Called on select and on clear." },
        { name: "placeholder", type: "string", default: '"Pick a date"', description: "Shown when empty." },
        { name: "formatOptions", type: "Intl.DateTimeFormatOptions", default: '{ dateStyle: "medium" }', description: "How the value is displayed." },
        { name: "locale", type: "string", default: '"en-US"', description: "Used for the label and the calendar." },
        { name: "minDate / maxDate", type: "Date", description: "Bounds passed to the calendar." },
        { name: "disabledDates", type: "(date: Date) => boolean", description: "Disable specific days." },
        { name: "clearable", type: "boolean", default: "true", description: "Shows an × to reset the value." },
        { name: "align", type: '"start" | "center" | "end"', default: '"start"', description: "Popover alignment." },
      ],
    },
    {
      component: "DateRangePicker",
      description: "Same props as `DatePicker`, with a `DateRange` value.",
      props: [
        { name: "presets", type: "{ label: string; range: () => DateRange }[]", description: "Shortcuts on the side. Pass `[]` to hide them." },
        { name: "numberOfMonths", type: "1 | 2", default: "2", description: "Months shown in the popover." },
      ],
    },
  ],
  notes: ["The popover closes on its own once a date — or both ends of a range — are picked, after a short beat so you see the selection land."],
}
