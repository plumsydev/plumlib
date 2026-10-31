"use client"

import { Bell, CreditCard, KeyRound, Palette, Settings, Shield, User, Users, Webhook } from "lucide-react"
import { Tree, type TreeNode } from "@/components/ui/tree"

const nav: TreeNode[] = [
  {
    id: "account",
    name: "Account",
    icon: <User />,
    children: [
      { id: "profile", name: "Profile", icon: <User /> },
      { id: "appearance", name: "Appearance", icon: <Palette /> },
      { id: "notifications", name: "Notifications", icon: <Bell /> },
    ],
  },
  {
    id: "workspace",
    name: "Workspace",
    icon: <Settings />,
    children: [
      { id: "members", name: "Members", icon: <Users /> },
      { id: "billing", name: "Billing", icon: <CreditCard /> },
      {
        id: "security",
        name: "Security",
        icon: <Shield />,
        children: [
          { id: "tokens", name: "API tokens", icon: <KeyRound /> },
          { id: "webhooks", name: "Webhooks", icon: <Webhook /> },
          { id: "sso", name: "SAML SSO", icon: <Shield />, disabled: true },
        ],
      },
    ],
  },
]

export default function TreeCustomIcons() {
  return (
    <div className="w-full max-w-60">
      <Tree data={nav} guides={false} defaultExpanded={["account", "workspace"]} defaultSelected="members" aria-label="Settings" />
      <p className="mt-3 px-2 text-xs text-muted-foreground">Try ↑ ↓ ← → and Enter.</p>
    </div>
  )
}
