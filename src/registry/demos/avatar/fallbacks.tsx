"use client"

import { Avatar, AvatarFallback, AvatarImage, avatarGradient } from "@/components/ui/avatar"

const team = [
  { name: "Léa Martin", email: "lea@acme.com", role: "Owner" },
  { name: "Noah Kim", email: "noah@acme.com", role: "Admin" },
  { name: "Ines Duarte", email: "ines@acme.com", role: "Member" },
]

export default function AvatarFallbacks() {
  return (
    <div className="w-full max-w-sm divide-y rounded-xl border bg-card">
      {team.map((m) => (
        <div key={m.email} className="flex items-center gap-3 p-3">
          {/* avatarGradient donne un dégradé unique et stable par email, comme sur vercel */}
          <Avatar>
            <AvatarImage src={avatarGradient(m.email)} alt={m.name} />
            <AvatarFallback>{m.name[0]}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{m.name}</div>
            <div className="truncate text-xs text-muted-foreground">{m.email}</div>
          </div>
          <span className="text-xs text-muted-foreground">{m.role}</span>
        </div>
      ))}
    </div>
  )
}
