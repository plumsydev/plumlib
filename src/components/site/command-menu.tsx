"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { ArrowRight, Circle, Moon, Search, Sun } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Kbd } from "@/components/ui/kbd"
import { gettingStarted } from "@/lib/docs-nav"
import type { NavGroup } from "@/registry/nav-types"

export function CommandMenu({ nav }: { nav: NavGroup[] }) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // pas qd on tape ds un champ sinon on vole le "/" aux gens
      const target = e.target as HTMLElement
      if (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  const run = (fn: () => void) => {
    setOpen(false)
    fn()
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex h-8 cursor-pointer items-center gap-2 rounded-md border bg-muted/40 pr-1.5 pl-2.5 text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:w-56 dark:bg-input/20"
      >
        <Search className="size-3.5" />
        <span className="hidden sm:inline">Search docs…</span>
        <Kbd className="ml-auto hidden sm:inline-flex">⌘K</Kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search components, guides…" />
        <CommandList>
          <CommandEmpty>Nothing found.</CommandEmpty>
          <CommandGroup heading="Getting started">
            {gettingStarted.map((item) => (
              <CommandItem key={item.href} value={item.title} onSelect={() => run(() => router.push(item.href))}>
                <ArrowRight />
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
          {nav.map((group) => (
            <CommandGroup key={group.category} heading={group.category}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.slug}
                  value={item.name}
                  keywords={[group.category]}
                  onSelect={() => run(() => router.push(`/docs/components/${item.slug}`))}
                >
                  <Circle className="!size-3" />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => run(() => setTheme("light"))}>
              <Sun /> Light
            </CommandItem>
            <CommandItem onSelect={() => run(() => setTheme("dark"))}>
              <Moon /> Dark
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
