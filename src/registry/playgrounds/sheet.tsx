"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetBody, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Playground, jsxProps } from "@/components/site/playground"

export default function SheetPlayground() {
  return (
    <Playground
      controls={{
        side: { type: "select", options: ["top", "right", "bottom", "left"], default: "right" },
        inset: { type: "boolean", default: false },
        showCloseButton: { type: "boolean", default: true },
      }}
      render={(p) => (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open sheet</Button>
          </SheetTrigger>
          <SheetContent {...p}>
            <SheetHeader>
              <SheetTitle>Environment variables</SheetTitle>
              <SheetDescription>Encrypted at rest, injected at build time.</SheetDescription>
            </SheetHeader>
            <SheetBody className="space-y-2 py-2 font-mono text-xs">
              {["DATABASE_URL", "STRIPE_SECRET_KEY", "RESEND_API_KEY"].map((k) => (
                <div key={k} className="flex justify-between rounded-md border px-3 py-2">
                  <span>{k}</span>
                  <span className="text-muted-foreground">••••••••</span>
                </div>
              ))}
            </SheetBody>
            <SheetFooter>
              <Button>Save</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
      code={(p) => `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open sheet</Button>
  </SheetTrigger>
  <SheetContent${jsxProps({ side: p.side, inset: p.inset }, { side: "right" })}${p.showCloseButton ? "" : " showCloseButton={false}"}>
    <SheetHeader>
      <SheetTitle>Environment variables</SheetTitle>
      <SheetDescription>Encrypted at rest, injected at build time.</SheetDescription>
    </SheetHeader>
    <SheetBody>…</SheetBody>
    <SheetFooter>
      <Button>Save</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`}
    />
  )
}
