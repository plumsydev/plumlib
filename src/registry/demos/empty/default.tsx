"use client"

import { FolderGit2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"

export default function EmptyDemo() {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="stack">
          <FolderGit2 />
        </EmptyMedia>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>Import a Git repository or start from a template to deploy your first project.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button size="sm">
            <Plus /> New project
          </Button>
          <Button size="sm" variant="outline">
            Browse templates
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  )
}
