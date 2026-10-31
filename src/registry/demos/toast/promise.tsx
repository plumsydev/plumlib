"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

// fausse requête qui rate une fois sur trois pr voir les deux issues
const deploy = () =>
  new Promise<{ url: string }>((resolve, reject) =>
    setTimeout(() => (Math.random() > 0.33 ? resolve({ url: "acme-7f3a.app" }) : reject(new Error("Build failed"))), 2000)
  )

export default function ToastPromise() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.promise(deploy, {
          loading: "Deploying…",
          success: (data) => `Deployed to ${data.url}`,
          error: (err) => (err instanceof Error ? err.message : "Something went wrong"),
        })
      }
    >
      Deploy
    </Button>
  )
}
