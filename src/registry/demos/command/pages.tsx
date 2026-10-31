"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronRight, Globe, Moon, Palette, Rocket, Sun, Users } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { toast } from "@/components/ui/toast"

type Page = "root" | "projects" | "theme"

const projects = ["acme-web", "billing-api", "docs", "status-page"]

export default function CommandPages() {
  const [pages, setPages] = React.useState<Page[]>(["root"])
  const [search, setSearch] = React.useState("")
  const page = pages[pages.length - 1]

  const go = (p: Page) => {
    setPages((all) => [...all, p])
    setSearch("")
  }

  return (
    <Command
      className="w-full max-w-md border shadow-lg"
      onKeyDown={(e) => {
        // backspace sur un champ vide => page précédente, comme raycast
        if ((e.key === "Backspace" && !search) || e.key === "Escape") {
          if (pages.length > 1) {
            e.preventDefault()
            setPages((all) => all.slice(0, -1))
          }
        }
      }}
    >
      <div className="flex h-9 items-center gap-1 border-b px-3 text-xs text-muted-foreground">
        <AnimatePresence initial={false} mode="popLayout">
          {pages.map((p, i) => (
            <motion.span
              key={p + i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              className="flex items-center gap-1 capitalize"
            >
              {i > 0 && <ChevronRight className="size-3" />}
              <span className={i === pages.length - 1 ? "text-foreground" : ""}>{p === "root" ? "Home" : p}</span>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      <CommandInput
        value={search}
        onValueChange={setSearch}
        placeholder={page === "root" ? "What do you need?" : page === "projects" ? "Deploy which project?" : "Pick a theme"}
      />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.18 }}
          >
            {page === "root" && (
              <CommandGroup heading="Actions">
                <CommandItem onSelect={() => go("projects")}>
                  <Rocket /> Deploy a project… <ChevronRight className="ml-auto" />
                </CommandItem>
                <CommandItem onSelect={() => go("theme")}>
                  <Palette /> Change theme… <ChevronRight className="ml-auto" />
                </CommandItem>
                <CommandItem onSelect={() => toast("Invite link copied")}>
                  <Users /> Invite teammate
                </CommandItem>
                <CommandItem onSelect={() => toast("Opening domains…")}>
                  <Globe /> Add domain
                </CommandItem>
              </CommandGroup>
            )}
            {page === "projects" && (
              <CommandGroup heading="Projects">
                {projects.map((p) => (
                  <CommandItem
                    key={p}
                    onSelect={() => {
                      toast.promise(new Promise((r) => setTimeout(r, 1500)), {
                        loading: `Deploying ${p}…`,
                        success: `${p} is live`,
                        error: "Deploy failed",
                      })
                      setPages(["root"])
                    }}
                  >
                    <Rocket /> {p}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {page === "theme" && (
              <CommandGroup heading="Theme">
                <CommandItem onSelect={() => { document.documentElement.classList.remove("dark"); setPages(["root"]) }}>
                  <Sun /> Light
                </CommandItem>
                <CommandItem onSelect={() => { document.documentElement.classList.add("dark"); setPages(["root"]) }}>
                  <Moon /> Dark
                </CommandItem>
              </CommandGroup>
            )}
          </motion.div>
        </AnimatePresence>
      </CommandList>
      <div className="flex items-center justify-between border-t px-3 py-2 text-[11px] text-muted-foreground">
        <span>↵ select</span>
        <span>{pages.length > 1 ? "⌫ back" : "↑↓ navigate"}</span>
      </div>
    </Command>
  )
}
