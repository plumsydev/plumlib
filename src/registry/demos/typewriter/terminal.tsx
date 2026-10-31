"use client"

import { Typewriter } from "@/components/ui/typewriter"

export default function TypewriterTerminal() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border bg-card shadow-lg">
      <div className="flex h-9 items-center gap-1.5 border-b px-3.5">
        <span className="size-2.5 rounded-full bg-foreground/10" />
        <span className="size-2.5 rounded-full bg-foreground/10" />
        <span className="size-2.5 rounded-full bg-foreground/10" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">zsh</span>
      </div>
      <div className="p-4 font-mono text-[13px]">
        <span className="text-brand">❯ </span>
        <Typewriter
          words={["pnpm dlx plumui add dock", "git commit -m \"feat: add dock\"", "pnpm dev --turbo"]}
          typeSpeed={45}
          pause={1400}
          cursorClassName="w-[7px] rounded-none opacity-80"
        />
      </div>
    </div>
  )
}
