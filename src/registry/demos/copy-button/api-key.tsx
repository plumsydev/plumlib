"use client"

import * as React from "react"
import { Eye, EyeOff, RefreshCw } from "lucide-react"
import { CopyButton } from "@/components/ui/copy-button"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

const makeKey = () => "pk_live_" + Array.from({ length: 24 }, () => "abcdefghijkmnpqrstuvwxyz23456789"[Math.floor(Math.random() * 32)]).join("")

export default function CopyButtonApiKey() {
  const [key, setKey] = React.useState("pk_live_8f2kq9x4mzt7w3n6v5b2c1d0")
  const [shown, setShown] = React.useState(false)

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Production key</span>
        <span className="text-xs text-muted-foreground">Created Oct 12</span>
      </div>
      <div className="flex items-center gap-1 rounded-lg border bg-muted/40 py-1 pr-1 pl-3">
        <code className="flex-1 truncate font-mono text-sm">{shown ? key : key.slice(0, 8) + "•".repeat(18)}</code>
        <Button size="icon-sm" variant="ghost" aria-label={shown ? "Hide key" : "Reveal key"} onClick={() => setShown((s) => !s)}>
          {shown ? <EyeOff /> : <Eye />}
        </Button>
        <CopyButton value={key} onCopied={() => toast.success("API key copied", { description: "Keep it somewhere safe." })} />
      </div>
      <Button
        size="xs"
        variant="ghost"
        className="text-muted-foreground"
        onClick={() => {
          setKey(makeKey())
          setShown(true)
          toast.warning("Key rotated", { description: "The previous key stops working in 24 hours." })
        }}
      >
        <RefreshCw /> Rotate key
      </Button>
    </div>
  )
}
