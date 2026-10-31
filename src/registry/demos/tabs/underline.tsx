"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tabs = [
  { value: "overview", label: "Overview", body: "Traffic is up 12% week over week, driven by organic search." },
  { value: "deployments", label: "Deployments", body: "142 deployments this month. Median build time: 41s." },
  { value: "logs", label: "Logs", body: "No errors in the last 24 hours." },
  { value: "settings", label: "Settings", body: "Manage domains, environment variables and integrations." },
]

export default function TabsUnderline() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList variant="underline" className="w-full justify-start">
        {tabs.map((t) => (
          <TabsTrigger key={t.value} value={t.value}>
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((t) => (
        <TabsContent key={t.value} value={t.value} className="pt-2 text-sm text-muted-foreground">
          {t.body}
        </TabsContent>
      ))}
    </Tabs>
  )
}
