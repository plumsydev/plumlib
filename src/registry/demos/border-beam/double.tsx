"use client"

import { Sparkles } from "lucide-react"
import { BorderBeam } from "@/components/ui/border-beam"
import { Button } from "@/components/ui/button"

export default function BorderBeamDouble() {
  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border bg-card p-6">
      <div className="flex size-9 items-center justify-center rounded-lg border bg-background">
        <Sparkles className="size-4" />
      </div>
      <h3 className="mt-4 font-semibold">Upgrade to Pro</h3>
      <p className="mt-1 text-sm text-muted-foreground">Unlimited projects, preview deployments and priority builds.</p>
      <Button className="mt-5" size="sm">Upgrade · $20/mo</Button>
      {/* 2 faisceaux qui tournent en sens inverse, couleur de marque très diluée */}
      <BorderBeam duration={8} size={160} colorFrom="var(--brand)" />
      <BorderBeam duration={8} size={160} delay={4} reverse colorFrom="var(--foreground)" />
    </div>
  )
}
