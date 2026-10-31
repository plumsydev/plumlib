"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Bell, CreditCard, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Field, FieldControl, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { spring } from "@/lib/motion"

const initial = {
  name: "Ryan B.",
  handle: "plumsy",
  bio: "Building interfaces that feel good.",
  timezone: "Europe/Paris",
  mentions: true,
  digest: false,
  product: true,
}

export default function SettingsBlock() {
  const [saved, setSaved] = React.useState(initial)
  const [form, setForm] = React.useState(initial)
  const [saving, setSaving] = React.useState(false)
  const set = <K extends keyof typeof initial>(k: K, v: (typeof initial)[K]) => setForm((f) => ({ ...f, [k]: v }))

  // la barre de sauvegarde apparait dès qu'un truc change, comme ds linear
  const dirty = JSON.stringify(form) !== JSON.stringify(saved)

  const save = () => {
    setSaving(true)
    setTimeout(() => {
      setSaved(form)
      setSaving(false)
      toast.success("Settings saved")
    }, 900)
  }

  return (
    <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border bg-card shadow-lg">
      <Tabs defaultValue="profile" className="gap-0">
        <div className="border-b px-5 pt-4">
          <h3 className="mb-3 font-semibold tracking-tight">Settings</h3>
          <TabsList variant="underline" className="border-b-0">
            <TabsTrigger value="profile"><User /> Profile</TabsTrigger>
            <TabsTrigger value="notifications"><Bell /> Notifications</TabsTrigger>
            <TabsTrigger value="billing"><CreditCard /> Billing</TabsTrigger>
          </TabsList>
        </div>

        <div className="min-h-[22rem] p-5 pb-20">
          <TabsContent value="profile" className="space-y-5">
            <div className="flex items-center gap-4">
              <Avatar className="size-14">
                <AvatarFallback className="bg-brand/15 text-lg font-medium text-brand">
                  {form.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{form.name || "Unnamed"}</div>
                <div className="text-sm text-muted-foreground">@{form.handle || "handle"}</div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel>Name</FieldLabel>
                <FieldControl>
                  <Input value={form.name} onChange={(e) => set("name", e.target.value)} />
                </FieldControl>
              </Field>
              <Field>
                <FieldLabel>Handle</FieldLabel>
                <FieldControl>
                  <Input value={form.handle} onChange={(e) => set("handle", e.target.value.replace(/\s/g, "").toLowerCase())} />
                </FieldControl>
              </Field>
            </div>
            <Field>
              <FieldLabel>Bio</FieldLabel>
              <FieldControl>
                <Textarea value={form.bio} onChange={(e) => set("bio", e.target.value)} rows={2} />
              </FieldControl>
              <FieldDescription>{160 - form.bio.length} characters left.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Timezone</FieldLabel>
              <Select value={form.timezone} onValueChange={(v) => set("timezone", v)}>
                <SelectTrigger className="w-full sm:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Paris">Paris (GMT+1)</SelectItem>
                  <SelectItem value="Europe/London">London (GMT)</SelectItem>
                  <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Tokyo (GMT+9)</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </TabsContent>

          <TabsContent value="notifications" className="divide-y rounded-xl border">
            {([
              ["mentions", "Mentions", "When someone @mentions you in a comment."],
              ["digest", "Weekly digest", "A Monday summary of what happened."],
              ["product", "Product updates", "New features, at most twice a month."],
            ] as const).map(([key, title, desc]) => (
              <div key={key} className="flex items-center justify-between gap-4 p-4">
                <div>
                  <Label htmlFor={`set-${key}`}>{title}</Label>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
                <Switch id={`set-${key}`} checked={form[key]} onCheckedChange={(v) => set(key, v)} />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <div className="rounded-xl border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Pro plan</div>
                  <div className="text-sm text-muted-foreground">$20 per seat / month · renews Dec 1</div>
                </div>
                <Button variant="outline" size="sm" onClick={() => toast("Opening the billing portal…")}>Manage</Button>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border p-4 text-sm">
              <CreditCard className="size-4 text-muted-foreground" />
              <span className="flex-1">Visa ending in 4242</span>
              <span className="text-muted-foreground">Expires 08/28</span>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <AnimatePresence>
        {dirty && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={spring.snappy}
            className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl border bg-popover px-4 py-2.5 shadow-xl"
          >
            <span className="text-sm">You have unsaved changes</span>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => setForm(saved)}>Reset</Button>
              <Button size="sm" loading={saving} onClick={save}>Save</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
