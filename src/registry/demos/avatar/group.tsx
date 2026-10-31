"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage, avatarGradient } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const pool = ["Ana Ruiz", "Jules Bernard", "Mia Chen", "Tom Dubois", "Eva Lopez", "Kai Park", "Omar Said", "Lina Roy", "Yuki Sato"]
const initials = (n: string) => n.split(" ").map((p) => p[0]).join("")

export default function AvatarGroupDemo() {
  const [count, setCount] = React.useState(4)
  return (
    <div className="flex flex-col items-center gap-4">
      <AvatarGroup max={5}>
        {pool.slice(0, count).map((name) => (
          <Avatar key={name}>
            <AvatarImage src={avatarGradient(name)} alt={name} />
            <AvatarFallback>{initials(name)}</AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setCount((c) => Math.max(1, c - 1))}>
          Remove
        </Button>
        <Button size="sm" onClick={() => setCount((c) => Math.min(pool.length, c + 1))}>
          <Plus /> Invite
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">Hover the group to fan it out</p>
    </div>
  )
}
