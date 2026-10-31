"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Expandable,
  ExpandableClose,
  ExpandableContent,
  ExpandableDescription,
  ExpandableMedia,
  ExpandableSubtitle,
  ExpandableTitle,
  ExpandableTrigger,
} from "@/components/ui/expandable"

export default function ExpandableProfile() {
  const [following, setFollowing] = React.useState(false)
  return (
    <Expandable>
      <ExpandableTrigger className="flex-row items-center gap-3 p-3 pr-5" style={{ borderRadius: 999 }}>
        <ExpandableMedia className="size-10 shrink-0 rounded-full">
          <Avatar className="size-10">
            <AvatarFallback className="bg-brand/15 text-brand">LM</AvatarFallback>
          </Avatar>
        </ExpandableMedia>
        <div>
          <ExpandableTitle className="text-sm">Léa Martin</ExpandableTitle>
          <ExpandableSubtitle className="text-xs">Design engineer</ExpandableSubtitle>
        </div>
      </ExpandableTrigger>
      <ExpandableContent className="max-w-sm items-center p-8 text-center">
        <ExpandableClose />
        <ExpandableMedia className="size-20 rounded-full">
          <Avatar className="size-20">
            <AvatarFallback className="bg-brand/15 text-2xl text-brand">LM</AvatarFallback>
          </Avatar>
        </ExpandableMedia>
        <ExpandableTitle className="mt-4 text-lg">Léa Martin</ExpandableTitle>
        <ExpandableSubtitle>Design engineer</ExpandableSubtitle>
        <ExpandableDescription className="mt-4 space-y-5">
          <p>Builds interaction systems at Plum. Previously motion at a fintech you have heard of.</p>
          <div className="grid grid-cols-3 text-foreground">
            {[["Posts", "128"], ["Followers", following ? "4,821" : "4,820"], ["Following", "312"]].map(([k, v]) => (
              <div key={k}>
                <div className="font-semibold tabular-nums">{v}</div>
                <div className="text-xs text-muted-foreground">{k}</div>
              </div>
            ))}
          </div>
          <Button className="w-full" variant={following ? "outline" : "default"} onClick={() => setFollowing((f) => !f)}>
            {following ? "Following" : "Follow"}
          </Button>
        </ExpandableDescription>
      </ExpandableContent>
    </Expandable>
  )
}
