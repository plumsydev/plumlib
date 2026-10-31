"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

export default function ToastTypes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button variant="outline" size="sm" onClick={() => toast("Draft saved")}>
        Default
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast.success("Deployment is live", { description: "acme-web · production" })}>
        Success
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast.info("New version available", { description: "Refresh to get the latest." })}>
        Info
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast.warning("Usage at 90%", { description: "You are close to your monthly limit." })}>
        Warning
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast.error("Payment failed", { description: "Your card was declined." })}>
        Error
      </Button>
    </div>
  )
}
