"use client"

import { Copy, Pencil, Trash2 } from "lucide-react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Playground } from "@/components/site/playground"

export default function ContextMenuPlayground() {
  return (
    <Playground
      controls={{
        shortcuts: { type: "boolean", default: true },
        submenu: { type: "boolean", default: true },
        destructive: { type: "boolean", default: true },
      }}
      render={({ shortcuts, submenu, destructive }) => (
        <ContextMenu>
          <ContextMenuTrigger className="flex h-36 w-64 items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground data-[state=open]:bg-accent/50">
            Right click here
          </ContextMenuTrigger>
          <ContextMenuContent className="w-52">
            <ContextMenuItem>
              <Pencil /> Rename {shortcuts && <ContextMenuShortcut>F2</ContextMenuShortcut>}
            </ContextMenuItem>
            <ContextMenuItem>
              <Copy /> Duplicate {shortcuts && <ContextMenuShortcut>⌘D</ContextMenuShortcut>}
            </ContextMenuItem>
            {submenu && (
              <ContextMenuSub>
                <ContextMenuSubTrigger>Move to</ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-40">
                  <ContextMenuItem>Engineering</ContextMenuItem>
                  <ContextMenuItem>Design</ContextMenuItem>
                  <ContextMenuItem>Archive</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
            )}
            {destructive && (
              <>
                <ContextMenuSeparator />
                <ContextMenuItem variant="destructive">
                  <Trash2 /> Delete {shortcuts && <ContextMenuShortcut>⌫</ContextMenuShortcut>}
                </ContextMenuItem>
              </>
            )}
          </ContextMenuContent>
        </ContextMenu>
      )}
      code={({ shortcuts, submenu, destructive }) => `<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>
      <Pencil /> Rename${shortcuts ? " <ContextMenuShortcut>F2</ContextMenuShortcut>" : ""}
    </ContextMenuItem>
    <ContextMenuItem>
      <Copy /> Duplicate${shortcuts ? " <ContextMenuShortcut>⌘D</ContextMenuShortcut>" : ""}
    </ContextMenuItem>${
      submenu
        ? `
    <ContextMenuSub>
      <ContextMenuSubTrigger>Move to</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem>Engineering</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>`
        : ""
    }${
      destructive
        ? `
    <ContextMenuSeparator />
    <ContextMenuItem variant="destructive">
      <Trash2 /> Delete
    </ContextMenuItem>`
        : ""
    }
  </ContextMenuContent>
</ContextMenu>`}
    />
  )
}
