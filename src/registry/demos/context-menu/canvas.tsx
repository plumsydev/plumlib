"use client"

import * as React from "react"
import { motion } from "motion/react"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { spring } from "@/lib/motion"

export default function ContextMenuCanvas() {
  const [grid, setGrid] = React.useState(true)
  const [rulers, setRulers] = React.useState(false)
  const [zoom, setZoom] = React.useState("1")

  return (
    <ContextMenu>
      <ContextMenuTrigger className="relative block h-56 w-full max-w-md overflow-hidden rounded-xl border bg-muted/30">
        <div className="absolute inset-0 transition-opacity duration-300" style={{ opacity: grid ? 1 : 0 }}>
          <div className="bg-dots absolute inset-0" />
        </div>
        <div
          className="absolute inset-x-0 top-0 h-5 border-b bg-background/80 font-mono text-[9px] text-muted-foreground transition-transform duration-300 ease-out-expo"
          style={{ transform: rulers ? "translateY(0)" : "translateY(-100%)" }}
        >
          <div className="flex h-full items-end gap-[38px] px-2">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i}>{i * 50}</span>
            ))}
          </div>
        </div>
        <motion.div animate={{ scale: Number(zoom) }} transition={spring.smooth} className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-3">
            <div className="size-16 rounded-xl bg-brand/80 shadow-lg" />
            <div className="size-16 rounded-full bg-info/70 shadow-lg" />
            <div className="h-16 w-24 rounded-xl border-2 border-dashed border-foreground/30" />
          </div>
        </motion.div>
        <span className="absolute right-3 bottom-2 text-xs text-muted-foreground">Right click the canvas</span>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuLabel>View</ContextMenuLabel>
        <ContextMenuCheckboxItem checked={grid} onCheckedChange={setGrid}>
          Show grid
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked={rulers} onCheckedChange={setRulers}>
          Show rulers
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>Zoom</ContextMenuLabel>
        <ContextMenuRadioGroup value={zoom} onValueChange={setZoom}>
          {[["0.6", "60%"], ["1", "100%"], ["1.4", "140%"]].map(([v, l]) => (
            <ContextMenuRadioItem key={v} value={v}>
              {l}
            </ContextMenuRadioItem>
          ))}
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
