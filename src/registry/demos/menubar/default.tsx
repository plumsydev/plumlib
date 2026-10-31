"use client"

import * as React from "react"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { toast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"

const code = [
  "export async function deploy(project: string) {",
  "  const build = await createBuild(project)",
  "  await build.wait()",
  "  return promote(build.id)",
  "}",
]

export default function MenubarDemo() {
  const [lineNumbers, setLineNumbers] = React.useState(true)
  const [wrap, setWrap] = React.useState(false)
  const [minimap, setMinimap] = React.useState(true)
  const [size, setSize] = React.useState("13")

  return (
    <div className="w-full max-w-lg space-y-3">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onSelect={() => toast("New file created")}>
              New file <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Open… <MenubarShortcut>⌘O</MenubarShortcut>
            </MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger>Open recent</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>deploy.ts</MenubarItem>
                <MenubarItem>routes/api.ts</MenubarItem>
                <MenubarItem>README.md</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem onSelect={() => toast.success("Saved deploy.ts")}>
              Save <MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Find <MenubarShortcut>⌘F</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>Replace</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked={lineNumbers} onCheckedChange={setLineNumbers}>
              Line numbers
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked={wrap} onCheckedChange={setWrap}>
              Word wrap
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked={minimap} onCheckedChange={setMinimap}>
              Minimap
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarLabel inset>Font size</MenubarLabel>
            <MenubarRadioGroup value={size} onValueChange={setSize}>
              {["12", "13", "15"].map((s) => (
                <MenubarRadioItem key={s} value={s}>
                  {s}px
                </MenubarRadioItem>
              ))}
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <div className="flex overflow-hidden rounded-lg border bg-muted/30 font-mono" style={{ fontSize: `${size}px` }}>
        <pre className={cn("flex-1 overflow-x-auto p-3 leading-relaxed transition-all", wrap && "whitespace-pre-wrap")}>
          {code.map((line, i) => (
            <div key={i} className="flex">
              <span
                className={cn(
                  "inline-block overflow-hidden text-right text-muted-foreground/60 transition-[width,margin] duration-300 ease-out-expo select-none",
                  lineNumbers ? "mr-4 w-5" : "mr-0 w-0"
                )}
              >
                {i + 1}
              </span>
              <span>{line}</span>
            </div>
          ))}
        </pre>
        <div className={cn("shrink-0 border-l bg-muted/50 transition-[width,opacity] duration-300 ease-out-expo", minimap ? "w-12 opacity-100" : "w-0 opacity-0")}>
          <div className="space-y-1 p-2">
            {code.map((l, i) => (
              <div key={i} className="h-0.5 rounded bg-foreground/20" style={{ width: `${Math.min(100, l.length * 2)}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
