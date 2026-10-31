"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Copy, FileCode2, FileImage, FileText, Pencil, Star, Trash2 } from "lucide-react"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { toast } from "@/components/ui/toast"
import { spring } from "@/lib/motion"
import { cn } from "@/lib/utils"

type File = { id: number; name: string; kind: "code" | "image" | "doc"; starred: boolean }

const icons = { code: FileCode2, image: FileImage, doc: FileText }

export default function ContextMenuFiles() {
  const [files, setFiles] = React.useState<File[]>([
    { id: 1, name: "deploy.ts", kind: "code", starred: true },
    { id: 2, name: "hero.png", kind: "image", starred: false },
    { id: 3, name: "roadmap.md", kind: "doc", starred: false },
    { id: 4, name: "routes.ts", kind: "code", starred: false },
    { id: 5, name: "og-image.png", kind: "image", starred: false },
  ])
  const [renaming, setRenaming] = React.useState<number | null>(null)
  const next = React.useRef(6)

  const update = (id: number, patch: Partial<File>) => setFiles((all) => all.map((f) => (f.id === id ? { ...f, ...patch } : f)))

  return (
    <div className="grid w-full max-w-md grid-cols-3 gap-2 sm:grid-cols-5">
      <AnimatePresence initial={false}>
        {files.map((f) => {
          const Icon = icons[f.kind]
          return (
            <motion.div
              key={f.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={spring.smooth}
            >
              <ContextMenu>
                <ContextMenuTrigger
                  className={cn(
                    "relative flex flex-col items-center gap-1.5 rounded-lg border border-transparent p-2 text-center transition-colors",
                    "hover:bg-accent data-[state=open]:border-border data-[state=open]:bg-accent"
                  )}
                >
                  {f.starred && <Star className="absolute top-1.5 right-1.5 size-3 fill-warning text-warning" />}
                  <Icon className="size-8 text-muted-foreground" strokeWidth={1.4} />
                  {renaming === f.id ? (
                    <input
                      autoFocus
                      defaultValue={f.name}
                      onBlur={(e) => {
                        update(f.id, { name: e.target.value || f.name })
                        setRenaming(null)
                      }}
                      onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
                      className="w-full rounded border bg-background px-1 text-center text-xs outline-none focus:ring-2 focus:ring-ring"
                    />
                  ) : (
                    <span className="w-full truncate text-xs">{f.name}</span>
                  )}
                </ContextMenuTrigger>
                <ContextMenuContent className="w-52">
                  <ContextMenuItem onSelect={() => setTimeout(() => setRenaming(f.id), 50)}>
                    <Pencil /> Rename <ContextMenuShortcut>F2</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem
                    onSelect={() => {
                      const copy = { ...f, id: next.current++, name: f.name.replace(/(\.\w+)$/, " copy$1"), starred: false }
                      setFiles((all) => [...all, copy])
                    }}
                  >
                    <Copy /> Duplicate <ContextMenuShortcut>⌘D</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuCheckboxItem checked={f.starred} onCheckedChange={(c) => update(f.id, { starred: c })}>
                    Starred
                  </ContextMenuCheckboxItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem
                    variant="destructive"
                    onSelect={() => {
                      setFiles((all) => all.filter((x) => x.id !== f.id))
                      toast(`Moved ${f.name} to trash`, {
                        action: { label: "Undo", onClick: () => setFiles((all) => [...all, f].sort((a, b) => a.id - b.id)) },
                      })
                    }}
                  >
                    <Trash2 /> Delete <ContextMenuShortcut>⌫</ContextMenuShortcut>
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
