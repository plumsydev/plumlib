"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

export default function ToastDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event created", {
          description: "Design review — Thursday, Nov 6 at 14:00",
          action: { label: "Undo", onClick: () => toast("Event removed") },
        })
      }
    >
      Show toast
    </Button>
  )
}
