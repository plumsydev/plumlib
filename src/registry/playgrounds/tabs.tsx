"use client"

import { BarChart3, Bell, Settings } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Playground } from "@/components/site/playground"

const tabs = [
  { value: "overview", label: "Overview", icon: BarChart3, body: "Traffic is up 18% this week, mostly from organic search." },
  { value: "alerts", label: "Alerts", icon: Bell, body: "2 open alerts: elevated error rate on /api/checkout." },
  { value: "settings", label: "Settings", icon: Settings, body: "Project name, domains and environment variables." },
]

export default function TabsPlayground() {
  return (
    <Playground
      controls={{
        variant: { type: "select", options: ["pill", "underline"], default: "pill" },
        icons: { type: "boolean", default: false },
        disabled: { type: "boolean", default: false, label: "disable last" },
      }}
      render={({ variant, icons, disabled }) => (
        <Tabs defaultValue="overview" className="w-full max-w-sm">
          <TabsList variant={variant}>
            {tabs.map((t, i) => (
              <TabsTrigger key={t.value} value={t.value} disabled={disabled && i === tabs.length - 1}>
                {icons && <t.icon />}
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((t) => (
            <TabsContent key={t.value} value={t.value} className="rounded-lg border p-4 text-sm text-muted-foreground">
              {t.body}
            </TabsContent>
          ))}
        </Tabs>
      )}
      code={({ variant, icons, disabled }) => `<Tabs defaultValue="overview">
  <TabsList${variant === "pill" ? "" : ` variant="${variant}"`}>
    <TabsTrigger value="overview">${icons ? "<BarChart3 /> " : ""}Overview</TabsTrigger>
    <TabsTrigger value="alerts">${icons ? "<Bell /> " : ""}Alerts</TabsTrigger>
    <TabsTrigger value="settings"${disabled ? " disabled" : ""}>${icons ? "<Settings /> " : ""}Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
</Tabs>`}
    />
  )
}
