"use client"

import { Switch } from "@/components/ui/switch"

const settings = [
  { id: "s-comments", title: "Comments", desc: "When someone mentions you or replies.", on: true },
  { id: "s-deploys", title: "Deployments", desc: "Failed builds and promotions.", on: true },
  { id: "s-digest", title: "Weekly digest", desc: "A summary of your team’s activity.", on: false },
]

export default function SwitchSettings() {
  return (
    <div className="w-full max-w-sm divide-y rounded-lg border">
      {settings.map((s) => (
        <label key={s.id} htmlFor={s.id} className="flex cursor-pointer items-center justify-between gap-4 p-4">
          <span className="grid gap-1">
            <span className="text-sm font-medium">{s.title}</span>
            <span className="text-sm text-muted-foreground">{s.desc}</span>
          </span>
          <Switch id={s.id} defaultChecked={s.on} />
        </label>
      ))}
    </div>
  )
}
