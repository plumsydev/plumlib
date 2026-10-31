import type { ComponentDoc } from "../types"
import Default from "../demos/resizable/default"
import Vertical from "../demos/resizable/vertical"
import Nested from "../demos/resizable/nested"
import ResizablePlayground from "../playgrounds/resizable"

export const doc: ComponentDoc = {
  slug: "resizable",
  name: "Resizable",
  description: "Panels you can resize by dragging, with min and max sizes, keyboard control and a double-click reset that springs back.",
  category: "Data Display",
  dependencies: ["lucide-react"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "vertical", title: "Vertical", component: Vertical },
    { name: "nested", title: "Nested", description: "Groups nest freely. `onLayout` reports sizes so you can persist them.", component: Nested },
  ],
  playground: ResizablePlayground,
  usage: {
    imports: `import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"`,
    code: `<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={30} minSize={20}>Sidebar</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel>Content</ResizablePanel>
</ResizablePanelGroup>`,
  },
  api: [
    {
      component: "ResizablePanelGroup",
      props: [
        { name: "direction", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Layout axis." },
        { name: "onLayout", type: "(sizes: number[]) => void", description: "Sizes in percent after every change." },
      ],
    },
    {
      component: "ResizablePanel",
      props: [
        { name: "defaultSize", type: "number", description: "Initial size in percent. Panels without one share the rest." },
        { name: "minSize", type: "number", default: "0", description: "Minimum size in percent." },
        { name: "maxSize", type: "number", default: "100", description: "Maximum size in percent." },
      ],
    },
    {
      component: "ResizableHandle",
      props: [{ name: "withHandle", type: "boolean", default: "false", description: "Show a grip in the middle of the divider." }],
    },
  ],
  notes: [
    "Handles are focusable: arrows move by 2%, Shift + arrows by 10%, Enter resets.",
    "Panels and handles must be direct children of the group so it can pair neighbours.",
  ],
}
