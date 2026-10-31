"use client"

import { Avatar, AvatarFallback, AvatarImage, AvatarStatus, avatarGradient } from "@/components/ui/avatar"

export default function AvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="lg">
        <AvatarImage src={avatarGradient("lea@acme.com")} alt="Léa Martin" />
        <AvatarFallback>LM</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        {/* image cassée => le fallback prend le relai tout seul */}
        <AvatarImage src="/does-not-exist.png" alt="Noah Kim" />
        <AvatarFallback className="bg-info/15 text-info">NK</AvatarFallback>
      </Avatar>
      <Avatar size="lg" className="overflow-visible">
        <AvatarImage src={avatarGradient("sam@acme.com")} alt="Sam Ortiz" className="rounded-full" />
        <AvatarFallback>SO</AvatarFallback>
        <AvatarStatus status="online" />
      </Avatar>
    </div>
  )
}
