"use client"

import { Typewriter } from "@/components/ui/typewriter"

export default function TypewriterDemo() {
  return (
    <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
      Build interfaces that feel
      <br />
      <Typewriter words={["fast.", "alive.", "inevitable.", "yours."]} className="text-muted-foreground" />
    </h2>
  )
}
