"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "@/components/ui/toast"

export default function DialogForm() {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("Ryan Bernard")
  const [handle, setHandle] = React.useState("ryan")
  const [saving, setSaving] = React.useState(false)
  const handleInvalid = !/^[a-z0-9-]{3,20}$/.test(handle)
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    if (handleInvalid) return
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSaving(false)
    setOpen(false)
    toast.success("Profile updated", { description: `plum.dev/@${handle}` })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Avatar className="size-5">
            <AvatarFallback className="text-[9px]">{initials}</AvatarFallback>
          </Avatar>
          Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent size="sm">
        <form onSubmit={save} className="grid gap-5">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Changes are visible to your whole team.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarFallback className="bg-brand/15 text-brand">{initials || "?"}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium">{name || "Your name"}</div>
              <div className="text-muted-foreground">@{handle || "handle"}</div>
            </div>
          </div>
          <Field>
            <FieldLabel>Name</FieldLabel>
            <FieldControl>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FieldControl>
          </Field>
          <Field invalid={handleInvalid}>
            <FieldLabel>Handle</FieldLabel>
            <FieldControl>
              <Input value={handle} onChange={(e) => setHandle(e.target.value.toLowerCase())} />
            </FieldControl>
            <FieldDescription>Lowercase letters, numbers and dashes.</FieldDescription>
            <FieldError>3 to 20 characters: a–z, 0–9 or -</FieldError>
          </Field>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" loading={saving} disabled={handleInvalid}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
