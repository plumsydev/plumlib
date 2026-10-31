"use client"

import { BorderBeam } from "@/components/ui/border-beam"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function BorderBeamDemo() {
  return (
    <div className="relative w-full max-w-sm rounded-2xl border bg-card p-6 shadow-sm">
      <h3 className="font-semibold">Sign in</h3>
      <p className="mt-1 text-sm text-muted-foreground">Welcome back. Pick up where you left off.</p>
      <form className="mt-5 grid gap-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-1.5">
          <Label htmlFor="bb-email">Email</Label>
          <Input id="bb-email" type="email" placeholder="ryan@plumsy.dev" />
        </div>
        <Button className="w-full">Continue with email</Button>
      </form>
      <BorderBeam duration={7} size={120} />
    </div>
  )
}
