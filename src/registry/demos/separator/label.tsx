"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function SeparatorLabel() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <Button variant="outline">Continue with GitHub</Button>
      <Separator>or continue with email</Separator>
      <Button>Send magic link</Button>
    </div>
  )
}
