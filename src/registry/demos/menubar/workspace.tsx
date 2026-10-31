"use client"

import * as React from "react"
import { LogOut, Plus, Settings, Users } from "lucide-react"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { toast } from "@/components/ui/toast"

const workspaces = { acme: "Acme Inc.", plum: "Plum Labs", personal: "Personal" }

export default function MenubarWorkspace() {
  const [ws, setWs] = React.useState<keyof typeof workspaces>("acme")

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>{workspaces[ws]}</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>Workspaces</MenubarLabel>
          <MenubarRadioGroup value={ws} onValueChange={(v) => setWs(v as keyof typeof workspaces)}>
            {Object.entries(workspaces).map(([k, v]) => (
              <MenubarRadioItem key={k} value={k}>
                {v}
              </MenubarRadioItem>
            ))}
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem>
            <Plus /> New workspace
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Team</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Users /> Members <MenubarShortcut>G M</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <Settings /> Settings <MenubarShortcut>G S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem variant="destructive" onSelect={() => toast.error(`Left ${workspaces[ws]}`)}>
            <LogOut /> Leave workspace
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
