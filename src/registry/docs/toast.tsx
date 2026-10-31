import type { ComponentDoc } from "../types"
import Default from "../demos/toast/default"
import Types from "../demos/toast/types"
import PromiseDemo from "../demos/toast/promise"
import Stack from "../demos/toast/stack"
import Undo from "../demos/toast/undo"
import ToastPlayground from "../playgrounds/toast"

export const doc: ComponentDoc = {
  slug: "toast",
  name: "Toast",
  description:
    "Notifications that stack, spread out on hover and swipe away. One function call from anywhere — no context, no hooks.",
  category: "Feedback",
  dependencies: ["motion", "lucide-react"],
  demos: [
    { name: "default", component: Default },
    { name: "types", title: "Types", component: Types },
    {
      name: "promise",
      title: "Promise",
      description: "One toast follows the promise from loading to success or error, morphing its icon in place.",
      component: PromiseDemo,
    },
    { name: "stack", title: "Stacking", description: "Toasts pile up compactly and fan out while hovered. Timers pause meanwhile.", component: Stack },
    {
      name: "undo",
      title: "Undo",
      description: "Archive a message and bring it back from the toast. Custom icon via `icon`.",
      component: Undo,
    },
  ],
  playground: ToastPlayground,
  usage: {
    imports: `import { toast, Toaster } from "@/components/ui/toast"`,
    code: `// once, in your root layout
<Toaster position="bottom-right" />

// anywhere
toast.success("Saved", { description: "Your changes are live." })`,
  },
  api: [
    {
      component: "Toaster",
      description: "Renders the stack. Mount it once.",
      props: [
        { name: "position", type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"', default: '"bottom-right"', description: "Corner the stack lives in." },
        { name: "visibleToasts", type: "number", default: "3", description: "Max toasts visible at once. Extra ones wait behind." },
        { name: "duration", type: "number", default: "4000", description: "Default time before auto-dismiss, in ms." },
        { name: "closeButton", type: "boolean", default: "false", description: "Show a close button on hover." },
        { name: "richColors", type: "boolean", default: "false", description: "Tints success, error, info and warning toasts." },
        { name: "expand", type: "boolean", default: "false", description: "Always show the stack spread out instead of on hover." },
        { name: "id", type: "string", description: "Only shows toasts sent with the matching `toasterId`. Lets you mount several toasters." },
      ],
    },
    {
      component: "toast(title, options?)",
      description: "Also `toast.success`, `.error`, `.info`, `.warning`, `.loading`. Returns the toast id.",
      props: [
        { name: "description", type: "ReactNode", description: "Secondary line under the title." },
        { name: "action", type: "{ label: string; onClick: () => void }", description: "Inline action button. Clicking it also dismisses." },
        { name: "duration", type: "number", description: "Overrides the Toaster duration. `Infinity` keeps it open." },
        { name: "id", type: "string | number", description: "Pass an existing id to update that toast in place." },
        { name: "dismissible", type: "boolean", default: "true", description: "Allow swipe to dismiss." },
        { name: "onDismiss", type: "() => void", description: "Called when the toast is dismissed." },
        { name: "cancel", type: "{ label: string; onClick?: () => void }", description: "Secondary, quieter button next to the action." },
        { name: "icon", type: "ReactNode", description: "Replaces the icon of the toast type." },
        { name: "closeButton", type: "boolean", description: "Overrides the Toaster setting for this toast." },
        { name: "toasterId", type: "string", description: "Sends the toast to a specific `<Toaster id>`." },
      ],
    },
    {
      component: "toast.promise(promise, messages)",
      description: "Accepts a promise or a function returning one. Resolves with the original promise.",
      props: [
        { name: "loading", type: "ReactNode", required: true, description: "Shown while pending." },
        { name: "success", type: "ReactNode | (data) => ReactNode", required: true, description: "Shown on resolve." },
        { name: "error", type: "ReactNode | (error) => ReactNode", required: true, description: "Shown on reject." },
      ],
    },
    {
      component: "toast.dismiss(id?)",
      description: "Dismiss one toast, or all of them when called without an id.",
      props: [],
    },
  ],
  notes: [
    "The store lives outside React, so `toast()` works from event handlers, server action callbacks and plain modules.",
    "The stack is announced to screen readers through a polite live region.",
  ],
}
