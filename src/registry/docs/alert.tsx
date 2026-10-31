import type { ComponentDoc } from "../types"
import Default from "../demos/alert/default"
import Variants from "../demos/alert/variants"
import Dismissible from "../demos/alert/dismissible"
import AlertPlayground from "../playgrounds/alert"

export const doc: ComponentDoc = {
  slug: "alert",
  name: "Alert",
  description: "A callout for important, non-blocking information — tinted semantic variants with an icon slot.",
  category: "Feedback",
  dependencies: ["class-variance-authority"],
  demos: [
    { name: "default", component: Default },
    { name: "variants", title: "Variants", component: Variants },
    { name: "dismissible", title: "Dismissible", description: "Add an `AlertAction` and animate it out with `AnimatePresence`.", component: Dismissible },
  ],
  playground: AlertPlayground,
  usage: {
    imports: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"`,
    code: `<Alert variant="success">
  <CheckCircle2 />
  <AlertTitle>Domain verified</AlertTitle>
  <AlertDescription>acme.com is now live.</AlertDescription>
</Alert>`,
  },
  api: [
    {
      component: "Alert",
      props: [
        { name: "variant", type: '"default" | "destructive" | "success" | "warning" | "info"', default: '"default"', description: "Semantic color." },
      ],
    },
    {
      component: "AlertAction",
      description: "Absolutely positioned top-right slot for a close button or link.",
      props: [],
    },
  ],
  notes: ["The first direct `svg` child becomes the icon column automatically — no wrapper needed."],
}
