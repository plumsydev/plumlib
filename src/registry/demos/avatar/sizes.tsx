"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const sizes = ["xs", "sm", "default", "lg", "xl"] as const

export default function AvatarSizes() {
  return (
    <div className="flex items-end gap-3">
      {sizes.map((s) => (
        <Avatar key={s} size={s}>
          <AvatarImage src="https://i.pravatar.cc/128?img=44" alt="Ava Chen" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
      ))}
    </div>
  )
}
