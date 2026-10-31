"use client"

import { CopyButton } from "@/components/ui/copy-button"

export default function CopyButtonWithLabel() {
  return (
    <div className="flex items-center gap-3">
      <CopyButton value="pk_demo_7f3a9c2e1b" label="Copy key" variant="outline" />
      <CopyButton value="https://acme.dev/invite/x8Kq2" label="Copy invite link" />
    </div>
  )
}
