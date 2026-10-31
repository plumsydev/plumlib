"use client"

import { Avatar, AvatarFallback, AvatarImage, AvatarStatus } from "@/components/ui/avatar"

export default function AvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/96?img=32" alt="Léa Martin" />
        <AvatarFallback>LM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="/does-not-exist.png" alt="Noah Kim" />
        <AvatarFallback>NK</AvatarFallback>
      </Avatar>
      <div className="relative">
        <Avatar className="overflow-visible">
          <AvatarImage src="https://i.pravatar.cc/96?img=12" alt="Sam Ortiz" className="rounded-full" />
          <AvatarFallback>SO</AvatarFallback>
          <AvatarStatus status="online" />
        </Avatar>
      </div>
    </div>
  )
}
