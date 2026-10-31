"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const releases = [
  { version: "2.4.0", date: "Oct 28", items: ["Command palette now ranks recent actions first", "New `xl` button size", "Toasts pause while the tab is hidden"] },
  { version: "2.3.2", date: "Oct 14", items: ["Fixed focus ring clipping inside scroll areas", "Sheet respects `prefers-reduced-motion`"] },
  { version: "2.3.0", date: "Oct 02", items: ["Drawer component, built on vaul", "Context menu supports nested submenus", "Smaller bundle for the tooltip"] },
  { version: "2.2.0", date: "Sep 19", items: ["OKLCH color tokens across the board", "Dark mode borders are now translucent", "Dialog content animates with a subtle blur"] },
  { version: "2.1.0", date: "Sep 03", items: ["Tabs indicator follows the active trigger", "Kbd component", "Docs search with ⌘K"] },
]

export default function DialogScrollable() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">What&apos;s new</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[min(560px,85vh)] grid-rows-[auto_minmax(0,1fr)_auto] gap-0 p-0 sm:max-w-md">
        <DialogHeader className="border-b p-6 pb-4">
          <DialogTitle>Changelog</DialogTitle>
          <DialogDescription>Everything that shipped in the last few weeks.</DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto px-6 py-5">
          <ol className="relative grid gap-6 border-l pl-5">
            {releases.map((r) => (
              <li key={r.version} className="relative">
                <span className="absolute -left-[1.6875rem] top-1.5 size-2.5 rounded-full border-2 border-popover bg-foreground/70" />
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-sm font-medium">v{r.version}</span>
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
                <ul className="mt-1.5 grid gap-1 text-sm text-muted-foreground">
                  {r.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
        <DialogFooter className="border-t p-4">
          <DialogClose asChild>
            <Button size="sm">Got it</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
