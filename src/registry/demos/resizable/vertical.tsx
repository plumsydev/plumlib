"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

export default function ResizableVertical() {
  return (
    <ResizablePanelGroup direction="vertical" className="h-80 w-full max-w-md overflow-hidden rounded-xl border bg-card">
      <ResizablePanel defaultSize={65} minSize={30}>
        <pre className="h-full overflow-auto p-4 font-mono text-xs leading-6 text-muted-foreground">
          <span className="text-brand">export default</span> function <span className="text-foreground">Page</span>() {"{"}
          {"\n"}  <span className="text-brand">return</span> &lt;<span className="text-foreground">Dashboard</span> /&gt;
          {"\n"}{"}"}
        </pre>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={15}>
        <div className="h-full bg-muted/40 p-3 font-mono text-xs leading-6">
          <div className="text-muted-foreground">$ pnpm dev</div>
          <div>▲ Ready on http://localhost:3000</div>
          <div className="text-success">✓ Compiled in 312ms</div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
