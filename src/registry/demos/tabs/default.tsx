"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="rounded-xl border bg-card p-5 text-sm shadow-xs">
          <p className="font-medium">Profile</p>
          <p className="mt-1 text-muted-foreground">Your name and avatar are visible to everyone in the workspace.</p>
          <Button size="sm" className="mt-4">Edit profile</Button>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="rounded-xl border bg-card p-5 text-sm shadow-xs">
          <p className="font-medium">Password</p>
          <p className="mt-1 text-muted-foreground">Last changed 3 months ago. We recommend using a passkey instead.</p>
          <Button size="sm" variant="outline" className="mt-4">Add passkey</Button>
        </div>
      </TabsContent>
      <TabsContent value="team">
        <div className="rounded-xl border bg-card p-5 text-sm shadow-xs">
          <p className="font-medium">Team</p>
          <p className="mt-1 text-muted-foreground">8 members · 2 pending invites.</p>
          <Button size="sm" variant="outline" className="mt-4">Invite people</Button>
        </div>
      </TabsContent>
    </Tabs>
  )
}
