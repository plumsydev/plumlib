"use client"

import { CreditCard, LogOut, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Playground, jsxProps } from "@/components/site/playground"

const items = [
  { icon: User, name: "User", label: "Profile", keys: "⇧⌘P" },
  { icon: CreditCard, name: "CreditCard", label: "Billing", keys: "⌘B" },
  { icon: Settings, name: "Settings", label: "Settings", keys: "⌘," },
]

export default function DropdownMenuPlayground() {
  return (
    <Playground
      controls={{
        side: { type: "select", options: ["top", "right", "bottom", "left"], default: "bottom" },
        align: { type: "select", options: ["start", "center", "end"], default: "center" },
        icons: { type: "boolean", default: true },
        shortcuts: { type: "boolean", default: true },
        label: { type: "boolean", default: true },
      }}
      render={({ side, align, icons, shortcuts, label }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side={side} align={align} className="w-52">
            {label && (
              <>
                <DropdownMenuLabel>maya@acme.com</DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            )}
            {items.map((i) => (
              <DropdownMenuItem key={i.label}>
                {icons && <i.icon />}
                {i.label}
                {shortcuts && <DropdownMenuShortcut>{i.keys}</DropdownMenuShortcut>}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              {icons && <LogOut />} Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      code={({ side, align, icons, shortcuts, label }) => `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent${jsxProps({ side, align }, { side: "bottom", align: "center" })}>${
    label ? `\n    <DropdownMenuLabel>maya@acme.com</DropdownMenuLabel>\n    <DropdownMenuSeparator />` : ""
  }${items
    .map(
      (i) =>
        `\n    <DropdownMenuItem>\n      ${icons ? `<${i.name} /> ` : ""}${i.label}${shortcuts ? `\n      <DropdownMenuShortcut>${i.keys}</DropdownMenuShortcut>` : ""}\n    </DropdownMenuItem>`
    )
    .join("")}
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">${icons ? "<LogOut /> " : ""}Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
    />
  )
}
