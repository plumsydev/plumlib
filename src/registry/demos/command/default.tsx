"use client"

import { CalendarPlus, CircleUser, CreditCard, FilePlus2, GitBranch, Inbox, Search, Settings } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export default function CommandDemo() {
  return (
    <Command className="w-full max-w-md border shadow-md">
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <FilePlus2 /> New issue <CommandShortcut>C</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CalendarPlus /> Schedule cycle
          </CommandItem>
          <CommandItem>
            <GitBranch /> Copy git branch name <CommandShortcut>⌘⇧.</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Search /> Search issues <CommandShortcut>/</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Navigation">
          <CommandItem>
            <Inbox /> Go to inbox <CommandShortcut>G I</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CircleUser /> Go to profile <CommandShortcut>G P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard /> Billing
          </CommandItem>
          <CommandItem>
            <Settings /> Settings <CommandShortcut>G S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
