"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Typewriter } from "@/components/ui/typewriter"

export default function TypewriterSearch() {
  const [value, setValue] = React.useState("")
  const [focused, setFocused] = React.useState(false)
  const showHint = !value && !focused

  return (
    <label className="relative flex h-11 w-full max-w-sm cursor-text items-center gap-2.5 rounded-xl border bg-background px-3.5 shadow-xs transition-[border-color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/30">
      <Search className="size-4 shrink-0 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label="Search"
        className="peer h-full flex-1 bg-transparent text-sm outline-none"
      />
      {/* le placeholder animé s'efface dès qu'on tape ou qu'on focus */}
      {showHint && (
        <span className="pointer-events-none absolute left-10 text-sm text-muted-foreground">
          Try{" "}
          <Typewriter words={["“refund policy”", "“invoice #4021”", "“change billing email”"]} typeSpeed={55} cursorClassName="opacity-60" />
        </span>
      )}
      {!showHint && !value && <span className="pointer-events-none absolute left-10 text-sm text-muted-foreground/60">Search…</span>}
    </label>
  )
}
