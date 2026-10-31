"use client"

import * as React from "react"
import { Globe, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/ui/copy-button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function PopoverDemo() {
  const [isPublic, setIsPublic] = React.useState(true)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Share</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="grid gap-3">
          <div>
            <div className="text-sm font-medium">Share this page</div>
            <p className="text-sm text-muted-foreground">Anyone with the link can view.</p>
          </div>
          <div className="flex items-center gap-2">
            <Input readOnly size="sm" value="acme.app/p/q4-roadmap" className="min-w-0 flex-1 bg-muted/50 font-mono text-xs text-muted-foreground" />
            <CopyButton value="https://acme.app/p/q4-roadmap" variant="outline" aria-label="Copy link" />
          </div>
          <button
            type="button"
            onClick={() => setIsPublic((v) => !v)}
            className="flex cursor-pointer items-center gap-2.5 rounded-md border px-2.5 py-2 text-left text-sm transition-colors hover:bg-accent"
          >
            {isPublic ? <Globe className="size-4 text-muted-foreground" /> : <Lock className="size-4 text-muted-foreground" />}
            <span className="flex-1">{isPublic ? "Public link" : "Only invited members"}</span>
            <span className="text-xs text-muted-foreground">Change</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
