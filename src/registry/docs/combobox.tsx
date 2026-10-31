import type { ComponentDoc } from "../types"
import Default from "../demos/combobox/default"
import Multiple from "../demos/combobox/multiple"
import Grouped from "../demos/combobox/grouped"
import Playground from "../playgrounds/combobox"

export const doc: ComponentDoc = {
  slug: "combobox",
  name: "Combobox",
  description: "A searchable select built from Popover and Command. Single or multiple, groups, descriptions, icons and animated badges.",
  category: "Inputs",
  isNew: true,
  dependencies: ["motion", "lucide-react", "radix-ui", "cmdk"],
  registryDependencies: ["popover", "command"],
  demos: [
    { name: "default", component: Default },
    { name: "multiple", title: "Multiple", description: "Selected items become badges you can remove inline.", component: Multiple },
    { name: "grouped", title: "Groups", component: Grouped },
  ],
  playground: Playground,
  usage: {
    imports: `import { Combobox } from "@/components/ui/combobox"`,
    code: `<Combobox
  options={[
    { value: "next", label: "Next.js" },
    { value: "astro", label: "Astro" },
  ]}
  placeholder="Select a framework"
/>`,
  },
  api: [
    {
      component: "Combobox",
      props: [
        { name: "options", type: "{ value, label, description?, icon?, group?, disabled?, keywords? }[]", required: true, description: "The choices." },
        { name: "multiple", type: "boolean", default: "false", description: "Switch `value` to `string[]`." },
        { name: "value / defaultValue", type: "string | string[]", description: "Selected value(s)." },
        { name: "onValueChange", type: "(value) => void", description: "Called on selection." },
        { name: "placeholder", type: "string", default: '"Select…"', description: "Trigger text when empty." },
        { name: "searchPlaceholder", type: "string", default: '"Search…"', description: "Search field placeholder." },
        { name: "emptyText", type: "ReactNode", default: '"No results."', description: "Shown when nothing matches." },
        { name: "maxBadges", type: "number", default: "3", description: "With `multiple`, badges shown before +n." },
      ],
    },
  ],
}
