import type { ComponentDoc } from "../types"
import Default from "../demos/tree/default"
import Controlled from "../demos/tree/controlled"
import CustomIcons from "../demos/tree/custom-icons"
import TreePlayground from "../playgrounds/tree"

export const doc: ComponentDoc = {
  slug: "tree",
  name: "Tree",
  description: "A hierarchical list for files and nested navigation, with animated expansion, a gliding selection and full keyboard support.",
  category: "Data Display",
  dependencies: ["motion", "lucide-react"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "controlled", title: "Controlled", description: "Own `expanded` and `selected` to build toolbars and breadcrumbs around it.", component: Controlled },
    { name: "custom-icons", title: "Custom icons", description: "Pass `icon` per node and turn off `guides` for a settings menu.", component: CustomIcons },
  ],
  playground: TreePlayground,
  usage: {
    imports: `import { Tree, type TreeNode } from "@/components/ui/tree"`,
    code: `const data: TreeNode[] = [
  { id: "src", name: "src", children: [{ id: "src/main.tsx", name: "main.tsx" }] },
]

<Tree data={data} defaultExpanded={["src"]} />`,
  },
  api: [
    {
      component: "Tree",
      props: [
        { name: "data", type: "TreeNode[]", required: true, description: "`{ id, name, children?, icon?, disabled? }`." },
        { name: "expanded / defaultExpanded", type: "string[]", description: "Ids of open folders." },
        { name: "onExpandedChange", type: "(ids: string[]) => void", description: "Called when a folder opens or closes." },
        { name: "selected / defaultSelected", type: "string | null", description: "Id of the selected node." },
        { name: "onSelect", type: "(node: TreeNode) => void", description: "Called on click, Enter or Space." },
        { name: "guides", type: "boolean", default: "true", description: "Vertical lines linking nested levels." },
      ],
    },
  ],
  notes: [
    "Follows the WAI-ARIA tree pattern: ↑ ↓ move, → opens or enters, ← closes or goes to the parent, Home / End jump.",
    "File icons are picked from the extension when no `icon` is given.",
  ],
}
