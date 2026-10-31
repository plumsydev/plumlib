"use client"

import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar"

const people = [
  { img: 5, name: "AR" },
  { img: 15, name: "JB" },
  { img: 26, name: "MC" },
  { img: 47, name: "TD" },
  { img: 52, name: "EL" },
  { img: 60, name: "KP" },
  { img: 68, name: "OS" },
]

export default function AvatarGroupDemo() {
  return (
    <AvatarGroup max={5}>
      {people.map((p) => (
        <Avatar key={p.img}>
          <AvatarImage src={`https://i.pravatar.cc/96?img=${p.img}`} alt={p.name} />
          <AvatarFallback>{p.name}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  )
}
