import type { ComponentDoc } from "../types"
import Default from "../demos/dialog/default"
import Scrollable from "../demos/dialog/scrollable"

export const doc: ComponentDoc = {
  slug: "dialog",
  name: "Dialog",
  description: "A modal window layered over the page. Opens with a soft scale and blur, closes fast so it never gets in the way.",
  category: "Overlays",
  primitive: { name: "Radix Dialog", href: "https://www.radix-ui.com/primitives/docs/components/dialog" },
  dependencies: ["radix-ui", "lucide-react"],
  demos: [
    { name: "default", component: Default },
    {
      name: "scrollable",
      title: "Scrollable content",
      description: "Pin the header and footer and let the body scroll with a three-row grid.",
      component: Scrollable,
    },
  ],
  usage: {
    imports: `import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"`,
    code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>This action can be undone later.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button>Continue</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  },
  api: [
    {
      component: "Dialog",
      description: "Root. Controls the open state.",
      props: [
        { name: "open", type: "boolean", description: "Controlled open state." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Initial open state when uncontrolled." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the open state changes." },
        { name: "modal", type: "boolean", default: "true", description: "Blocks interaction with the rest of the page." },
      ],
    },
    {
      component: "DialogContent",
      description: "The panel. Rendered in a portal together with the overlay.",
      props: [
        { name: "showCloseButton", type: "boolean", default: "true", description: "Renders the close button in the top-right corner." },
        { name: "onEscapeKeyDown", type: "(event: KeyboardEvent) => void", description: "Call `event.preventDefault()` to keep the dialog open." },
        { name: "onInteractOutside", type: "(event: Event) => void", description: "Fires on pointer down or focus outside the content." },
      ],
    },
  ],
  notes: [
    "Always render a `DialogTitle`. Hide it with `sr-only` if the design has no visible title — screen readers still need it.",
    "Focus is trapped inside and returned to the trigger on close.",
  ],
}
