"use client"

import { Code2, Eye, Terminal } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabsIcons() {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">
          <Eye /> Preview
        </TabsTrigger>
        <TabsTrigger value="code">
          <Code2 /> Code
        </TabsTrigger>
        <TabsTrigger value="cli">
          <Terminal /> CLI
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
