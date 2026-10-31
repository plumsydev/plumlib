"use client"

import * as React from "react"
import { Laptop, Moon, Rocket, Sun, Terminal, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export default function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)

  // ⌘J pr pas se battre avec le ⌘K de la doc
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  const run = () => setOpen(false)

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)} className="gap-3 text-muted-foreground">
        Open palette
        <kbd className="rounded border bg-muted px-1.5 py-px font-mono text-[0.6875rem] text-foreground">⌘J</kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="What do you need?" />
        <CommandList>
          <CommandEmpty>Nothing matches that.</CommandEmpty>
          <CommandGroup heading="Project">
            <CommandItem onSelect={run}>
              <Rocket /> Deploy to production <CommandShortcut>⌘⏎</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={run}>
              <Terminal /> Open logs
            </CommandItem>
            <CommandItem onSelect={run}>
              <Users /> Manage members
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={run}>
              <Sun /> Light
            </CommandItem>
            <CommandItem onSelect={run}>
              <Moon /> Dark
            </CommandItem>
            <CommandItem onSelect={run}>
              <Laptop /> System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
