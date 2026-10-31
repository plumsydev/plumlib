"use client"

import { Avatar, AvatarFallback, AvatarGroup, AvatarStatus } from "@/components/ui/avatar"
import { Playground, jsxProps } from "@/components/site/playground"

const people = [
  ["LM", "bg-brand/15 text-brand"],
  ["SO", "bg-info/15 text-info"],
  ["ID", "bg-success/15 text-success"],
  ["TB", "bg-warning/20 text-warning"],
  ["AR", "bg-destructive/12 text-destructive"],
  ["KN", ""],
  ["MP", ""],
]

export default function AvatarPlayground() {
  return (
    <Playground
      controls={{
        size: { type: "select", options: ["xs", "sm", "default", "lg", "xl"], default: "lg" },
        status: { type: "select", options: ["none", "online", "busy", "away", "offline"], default: "online" },
        group: { type: "boolean", default: false },
        max: { type: "number", default: 4, min: 2, max: 7, label: "group max" },
      }}
      render={({ size, status, group, max }) =>
        group ? (
          <AvatarGroup max={max}>
            {people.map(([i, c]) => (
              <Avatar key={i} size={size}>
                <AvatarFallback className={c}>{i}</AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
        ) : (
          <Avatar size={size} className="overflow-visible">
            <AvatarFallback className="bg-brand/15 text-brand">LM</AvatarFallback>
            {status !== "none" && <AvatarStatus status={status} />}
          </Avatar>
        )
      }
      code={({ size, status, group, max }) =>
        group
          ? `<AvatarGroup max={${max}}>
  <Avatar${jsxProps({ size }, { size: "default" })}>
    <AvatarImage src="/lea.png" alt="Léa" />
    <AvatarFallback>LM</AvatarFallback>
  </Avatar>
  …
</AvatarGroup>`
          : `<Avatar${jsxProps({ size }, { size: "default" })}>
  <AvatarImage src="/lea.png" alt="Léa" />
  <AvatarFallback>LM</AvatarFallback>${status !== "none" ? `\n  <AvatarStatus status="${status}" />` : ""}
</Avatar>`
      }
    />
  )
}
