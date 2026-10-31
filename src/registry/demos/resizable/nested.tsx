"use client"

import * as React from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

function Pane({ label, size }: { label: string; size?: number }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1 text-sm">
      <span className="font-medium">{label}</span>
      {size !== undefined && <span className="font-mono text-xs text-muted-foreground tabular-nums">{Math.round(size)}%</span>}
    </div>
  )
}

export default function ResizableNested() {
  // onLayout remonte les tailles, pratique pr les sauvegarder ds le localStorage
  const [outer, setOuter] = React.useState([30, 70])
  const [inner, setInner] = React.useState([60, 40])

  return (
    <ResizablePanelGroup direction="horizontal" onLayout={setOuter} className="h-72 w-full max-w-xl overflow-hidden rounded-xl border bg-card">
      <ResizablePanel defaultSize={30} minSize={20}>
        <Pane label="Sidebar" size={outer[0]} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <ResizablePanelGroup direction="vertical" onLayout={setInner}>
          <ResizablePanel defaultSize={60} minSize={20}>
            <Pane label="Editor" size={inner[0]} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={40} minSize={20}>
            <Pane label="Terminal" size={inner[1]} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
