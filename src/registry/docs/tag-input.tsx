import type { ComponentDoc } from "../types"
import Default from "../demos/tag-input/default"
import Emails from "../demos/tag-input/emails"
import Suggestions from "../demos/tag-input/suggestions"
import Playground from "../playgrounds/tag-input"

export const doc: ComponentDoc = {
  slug: "tag-input",
  name: "Tag Input",
  description: "Turn typing into tags. They spring in, reflow smoothly, and Backspace asks twice before deleting.",
  category: "Inputs",
  isNew: true,
  dependencies: ["motion", "lucide-react"],
  demos: [
    { name: "default", component: Default },
    { name: "emails", title: "Validation", description: "`validate` rejects bad entries, `max` caps the count and `onReject` reports why.", component: Emails },
    { name: "suggestions", title: "Suggestions", description: "Controlled value plus a list of quick picks.", component: Suggestions },
  ],
  playground: Playground,
  usage: {
    imports: `import { TagInput } from "@/components/ui/tag-input"`,
    code: `<TagInput defaultValue={["react"]} placeholder="Add a tag…" />`,
  },
  api: [
    {
      component: "TagInput",
      description: "Extends the native input for everything but `value`, `defaultValue` and `onChange`.",
      props: [
        { name: "value", type: "string[]", description: "Controlled tags." },
        { name: "defaultValue", type: "string[]", default: "[]", description: "Initial tags when uncontrolled." },
        { name: "onValueChange", type: "(tags: string[]) => void", description: "Called when tags are added or removed." },
        { name: "max", type: "number", default: "Infinity", description: "Maximum number of tags." },
        { name: "validate", type: "(tag: string) => string | boolean | undefined", description: "Return false or an error message to refuse a tag." },
        { name: "onReject", type: "(tag: string, reason: string) => void", description: "Called when a tag is refused." },
        { name: "separators", type: "string[]", default: '["Enter", ","]', description: "Keys that commit the current text." },
      ],
    },
  ],
  notes: [
    "Duplicates aren't added: the existing tag flashes instead.",
    "Pasting text containing commas, tabs or new lines adds every part at once.",
  ],
}
