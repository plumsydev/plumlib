import type { ComponentDoc } from "../types"
import Default from "../demos/alert-dialog/default"
import Destructive from "../demos/alert-dialog/destructive"
import Async from "../demos/alert-dialog/async"
import AlertDialogPlayground from "../playgrounds/alert-dialog"

export const doc: ComponentDoc = {
  slug: "alert-dialog",
  name: "Alert Dialog",
  description: "A modal that interrupts the user to confirm an important action. It can't be dismissed by clicking outside.",
  category: "Overlays",
  primitive: { name: "Radix Alert Dialog", href: "https://www.radix-ui.com/primitives/docs/components/alert-dialog" },
  dependencies: ["radix-ui", "motion"],
  registryDependencies: ["button", "dialog"],
  demos: [
    { name: "default", component: Default },
    {
      name: "destructive",
      title: "Destructive with confirmation",
      description: "Gate irreversible actions behind typing the resource name.",
      component: Destructive,
    },
    {
      name: "async",
      title: "Async action",
      description: "Keep the dialog open while the request runs. `AlertDialogMedia` pops in with a spring.",
      component: Async,
    },
  ],
  playground: AlertDialogPlayground,
  usage: {
    imports: `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"`,
    code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
  },
  api: [
    {
      component: "AlertDialog",
      props: [
        { name: "open", type: "boolean", description: "Controlled open state." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the open state changes." },
      ],
    },
    {
      component: "AlertDialogAction",
      description: "Confirms and closes the dialog. Styled as a button.",
      props: [{ name: "variant", type: '"default" | "destructive" | "brand"', default: '"default"', description: "Button style of the confirm action." }],
    },
    {
      component: "AlertDialogMedia",
      description: "Optional icon above the title. Pops in with a spring right after the panel.",
      props: [{ name: "variant", type: '"default" | "destructive" | "warning"', default: '"default"', description: "Tint of the icon circle." }],
    },
    {
      component: "AlertDialogCancel",
      description: "Closes the dialog. Receives focus when the dialog opens.",
      props: [],
    },
  ],
  notes: [
    "Focus lands on the cancel button by default, so a stray Enter never confirms a destructive action.",
    "For async confirmations, control `open` and use a regular `Button` instead of `AlertDialogAction`, which closes immediately.",
  ],
}
