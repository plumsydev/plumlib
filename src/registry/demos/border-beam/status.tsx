"use client"

import * as React from "react"
import { BorderBeam } from "@/components/ui/border-beam"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function BorderBeamStatus() {
  const [building, setBuilding] = React.useState(false)

  const build = () => {
    setBuilding(true)
    setTimeout(() => setBuilding(false), 4000)
  }

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <div className="relative w-full rounded-xl border bg-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">acme-web</div>
            <div className="font-mono text-xs text-muted-foreground">main · 4f2c91a</div>
          </div>
          {building ? <Badge variant="warning" dot>Building</Badge> : <Badge variant="success" dot>Ready</Badge>}
        </div>
        {/* le faisceau n'existe que pdt le build, il signale le travail en cours */}
        {building && <BorderBeam duration={2.2} size={70} colorFrom="var(--warning)" />}
      </div>
      <Button size="sm" variant="outline" onClick={build} disabled={building}>
        {building ? "Building…" : "Redeploy"}
      </Button>
    </div>
  )
}
