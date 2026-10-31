"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

export default function ResizableDemo() {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-72 w-full max-w-xl overflow-hidden rounded-xl border bg-card">
      <ResizablePanel defaultSize={24} minSize={15} maxSize={40}>
        <div className="flex h-full flex-col gap-1 p-3 text-sm">
          <span className="mb-1 text-xs font-medium text-muted-foreground">Inbox</span>
          {["All mail", "Starred", "Drafts", "Sent", "Archive"].map((l, i) => (
            <span key={l} className={i === 0 ? "rounded-md bg-accent px-2 py-1 font-medium" : "px-2 py-1 text-muted-foreground"}>
              {l}
            </span>
          ))}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={38} minSize={25}>
        <div className="divide-y text-sm">
          {["Weekly sync notes", "Invoice #2041", "Your build is ready", "Design review"].map((s, i) => (
            <div key={s} className={i === 0 ? "bg-muted/50 p-3" : "p-3"}>
              <div className="truncate font-medium">{s}</div>
              <div className="truncate text-xs text-muted-foreground">Tap to read the full thread</div>
            </div>
          ))}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={25}>
        <div className="flex h-full flex-col p-4">
          <div className="text-sm font-medium">Weekly sync notes</div>
          <div className="text-xs text-muted-foreground">From Léa · 9:41</div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Drag the handles to resize. Double-click one to snap the panels back to their default sizes.
          </p>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
