"use client"

import { FolderOpen, Inbox, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Playground, jsxProps } from "@/components/site/playground"

const icons = { inbox: Inbox, folder: FolderOpen, search: Search }

export default function EmptyPlayground() {
  return (
    <Playground
      controls={{
        media: { type: "select", options: ["default", "icon", "stack"], default: "stack" },
        icon: { type: "select", options: ["inbox", "folder", "search"], default: "folder" },
        title: { type: "text", default: "No projects yet" },
        action: { type: "boolean", default: true },
        border: { type: "boolean", default: true },
      }}
      render={({ media, icon, title, action, border }) => {
        const Icon = icons[icon]
        return (
          <Empty className={border ? "max-w-md border" : "max-w-md"}>
            <EmptyHeader>
              <EmptyMedia variant={media}>
                <Icon className={media === "default" ? "size-8 text-muted-foreground" : undefined} />
              </EmptyMedia>
              <EmptyTitle>{title}</EmptyTitle>
              <EmptyDescription>Create a project to deploy your first app. It takes about a minute.</EmptyDescription>
            </EmptyHeader>
            {action && (
              <EmptyContent>
                <Button size="sm">New project</Button>
              </EmptyContent>
            )}
          </Empty>
        )
      }}
      code={({ media, title, action, border }) => `<Empty${border ? ' className="border"' : ""}>
  <EmptyHeader>
    <EmptyMedia${jsxProps({ variant: media }, { variant: "default" })}>
      <FolderOpen />
    </EmptyMedia>
    <EmptyTitle>${title}</EmptyTitle>
    <EmptyDescription>Create a project to deploy your first app.</EmptyDescription>
  </EmptyHeader>${action ? `\n  <EmptyContent>\n    <Button size="sm">New project</Button>\n  </EmptyContent>` : ""}
</Empty>`}
    />
  )
}
