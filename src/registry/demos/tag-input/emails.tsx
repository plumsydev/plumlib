"use client"

import * as React from "react"
import { Send } from "lucide-react"
import { TagInput } from "@/components/ui/tag-input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toast"

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function TagInputEmails() {
  const [emails, setEmails] = React.useState<string[]>(["lea@acme.com"])

  return (
    <div className="w-full max-w-md space-y-2">
      <Label>Invite teammates</Label>
      <div className="flex items-start gap-2">
        <TagInput
          value={emails}
          onValueChange={setEmails}
          max={5}
          separators={["Enter", ",", " "]}
          validate={(v) => EMAIL.test(v) || "That doesn't look like an email"}
          onReject={(tag, reason) => toast.error(reason, { description: tag })}
          placeholder="name@company.com"
        />
        <Button
          disabled={!emails.length}
          onClick={() => {
            toast.success(`${emails.length} invite${emails.length > 1 ? "s" : ""} sent`)
            setEmails([])
          }}
        >
          <Send /> Invite
        </Button>
      </div>
      <p className="text-xs text-muted-foreground tabular-nums">{emails.length} / 5 seats used</p>
    </div>
  )
}
