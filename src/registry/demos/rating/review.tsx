"use client"

import * as React from "react"
import { Rating } from "@/components/ui/rating"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

const breakdown = [
  [5, 68],
  [4, 21],
  [3, 7],
  [2, 2],
  [1, 2],
] as const

export default function RatingReview() {
  const [value, setValue] = React.useState(0)
  const [text, setText] = React.useState("")

  return (
    <div className="grid w-full max-w-xl gap-6 rounded-xl border bg-card p-5 sm:grid-cols-[11rem_1fr]">
      <div className="space-y-3">
        <div className="text-4xl font-semibold tracking-tight">4.6</div>
        <Rating value={4.6} readOnly size="sm" allowHalf />
        <p className="text-xs text-muted-foreground">2,184 reviews</p>
        <div className="space-y-1">
          {breakdown.map(([stars, pct]) => (
            <div key={stars} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-2 tabular-nums">{stars}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-warning" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault()
          toast.success("Thanks for the feedback", { description: `You rated it ${value} out of 5.` })
          setValue(0)
          setText("")
        }}
      >
        <div>
          <h3 className="text-sm font-medium">Write a review</h3>
          <p className="text-xs text-muted-foreground">How was the onboarding?</p>
        </div>
        <Rating value={value} onValueChange={setValue} />
        <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="What stood out?" autoResize />
        <Button type="submit" size="sm" disabled={!value}>
          Submit review
        </Button>
      </form>
    </div>
  )
}
