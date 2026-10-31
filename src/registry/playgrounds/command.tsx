"use client"

import { Calendar, CreditCard, Settings, Smile, User } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"
import { Playground } from "@/components/site/playground"

export default function CommandPlayground() {
  return (
    <Playground
      controls={{
        placeholder: { type: "text", default: "Type a command or search…" },
        shortcuts: { type: "boolean", default: true },
        icons: { type: "boolean", default: true },
        loop: { type: "boolean", default: true },
      }}
      render={({ placeholder, shortcuts, icons, loop }) => (
        <Command loop={loop} className="w-80 border shadow-lg">
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>{icons && <Calendar />} Calendar</CommandItem>
              <CommandItem>{icons && <Smile />} Search emoji</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                {icons && <User />} Profile {shortcuts && <CommandShortcut>⌘P</CommandShortcut>}
              </CommandItem>
              <CommandItem>
                {icons && <CreditCard />} Billing {shortcuts && <CommandShortcut>⌘B</CommandShortcut>}
              </CommandItem>
              <CommandItem>
                {icons && <Settings />} Settings {shortcuts && <CommandShortcut>⌘,</CommandShortcut>}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      )}
      code={({ placeholder, shortcuts, icons, loop }) => `<Command${loop ? " loop" : ""}>
  <CommandInput placeholder="${placeholder}" />
  <CommandList>
    <CommandEmpty>No results.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>${icons ? "<Calendar /> " : ""}Calendar</CommandItem>
      <CommandItem>${icons ? "<Smile /> " : ""}Search emoji</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>
        ${icons ? "<User /> " : ""}Profile${shortcuts ? "\n        <CommandShortcut>⌘P</CommandShortcut>" : ""}
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
    />
  )
}
