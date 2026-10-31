"use client"

import * as React from "react"
import { ArrowUp, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TextEffect } from "@/components/ui/text-effect"
import { TextShimmer } from "@/components/ui/text-shimmer"

const answer =
  "Use a spring for anything the user drags or toggles, and an expo ease-out for things that appear on their own. Keep exits roughly half as long as entrances so the interface never feels like it's waiting on you."

export default function TextEffectStreaming() {
  const [state, setState] = React.useState<"idle" | "thinking" | "answer">("idle")

  const ask = () => {
    setState("thinking")
    setTimeout(() => setState("answer"), 1400)
  }

  return (
    <div className="w-full max-w-md space-y-4 rounded-xl border bg-card p-4 shadow-xs">
      <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-sm text-primary-foreground">
        When should I use a spring instead of an easing curve?
      </div>
      <div className="flex min-h-24 gap-2.5">
        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border bg-background">
          <Sparkles className="size-3.5" />
        </span>
        <div className="text-sm leading-6">
          {state === "idle" && <span className="text-muted-foreground">Press send to get an answer.</span>}
          {state === "thinking" && <TextShimmer>Thinking…</TextShimmer>}
          {state === "answer" && (
            <TextEffect per="word" preset="blur" stagger={0.025}>
              {answer}
            </TextEffect>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <Button size="sm" onClick={ask} disabled={state === "thinking"}>
          <ArrowUp /> {state === "answer" ? "Ask again" : "Send"}
        </Button>
      </div>
    </div>
  )
}
