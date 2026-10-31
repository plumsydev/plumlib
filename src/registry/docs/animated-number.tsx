import type { ComponentDoc } from "../types"
import Default from "../demos/animated-number/default"
import Currency from "../demos/animated-number/currency"
import Stats from "../demos/animated-number/stats"

export const doc: ComponentDoc = {
  slug: "animated-number",
  name: "Animated Number",
  description: "A slot-machine counter: every digit rolls independently on a spring. Locale-aware through Intl.NumberFormat.",
  category: "Data Display",
  dependencies: ["motion"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "currency", title: "Currency & sign", description: "Any `Intl.NumberFormat` option works — currency, sign, decimals, locales.", component: Currency },
    { name: "stats", title: "Dashboard stats", description: "Percent and compact notation, rolling up from zero on mount.", component: Stats },
  ],
  usage: {
    imports: `import { AnimatedNumber } from "@/components/ui/animated-number"`,
    code: `<AnimatedNumber
  value={1299.9}
  format={{ style: "currency", currency: "EUR" }}
  locales="fr-FR"
/>`,
  },
  api: [
    {
      component: "AnimatedNumber",
      props: [
        { name: "value", type: "number", required: true, description: "The number to display." },
        { name: "format", type: "Intl.NumberFormatOptions", description: "Formatting options passed to Intl.NumberFormat." },
        { name: "locales", type: "Intl.LocalesArgument", default: '"en-US"', description: "Locale(s) used for formatting." },
        { name: "transition", type: "Transition", default: "spring.smooth", description: "Motion transition used by every digit." },
      ],
    },
  ],
  notes: [
    "Digits are keyed by their position from the right, so units stay units when the number gains a digit.",
    "The full formatted value is exposed through `aria-label`; the rolling columns are hidden from assistive tech.",
  ],
}
