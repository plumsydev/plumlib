"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Activity, GitBranch, Globe, Moon, Rocket, Settings, Sun, Monitor, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { easeOutExpo } from "@/lib/motion"
import { AnimatedNumber } from "@/components/ui/animated-number"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/components/ui/command"
import { CopyButton } from "@/components/ui/copy-button"
import { Field, FieldControl, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { toast } from "@/components/ui/toast"

function Tile({ children, className, index }: { children: React.ReactNode; className?: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: 0.05 * index, ease: easeOutExpo }}
      className={cn("rounded-2xl border bg-card p-5 shadow-xs", className)}
    >
      {children}
    </motion.div>
  )
}

function TileTitle({ children, hint }: { children: React.ReactNode; hint?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-2">
      <h3 className="text-sm font-medium">{children}</h3>
      {hint}
    </div>
  )
}

function DeployTile() {
  const [deploying, setDeploying] = React.useState(false)

  const deploy = () => {
    setDeploying(true)
    // fausse promesse qui réussit 4 fois sur 5, faut bien montrer l'erreur aussi
    const run = new Promise<string>((resolve, reject) =>
      setTimeout(() => (Math.random() > 0.2 ? resolve("plum-ui.vercel.app") : reject(new Error("Build failed"))), 2000)
    )
    toast.promise(run, {
      loading: "Deploying to production…",
      success: (url) => `Deployed to ${url}`,
      error: "Build failed — check the logs",
    })
    run.finally(() => setDeploying(false)).catch(() => {})
  }

  return (
    <Tile index={0} className="flex flex-col lg:col-span-5 lg:row-span-2">
      <TileTitle hint={<Badge variant="secondary"><GitBranch /> main</Badge>}>New project</TileTitle>
      <div className="flex flex-1 flex-col gap-4">
        <Field>
          <FieldLabel>Project name</FieldLabel>
          <FieldControl>
            <Input defaultValue="acme-dashboard" />
          </FieldControl>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel>Framework</FieldLabel>
            <Select defaultValue="next">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="next">Next.js</SelectItem>
                <SelectItem value="vite">Vite</SelectItem>
                <SelectItem value="remix">Remix</SelectItem>
                <SelectItem value="astro">Astro</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel>Region</FieldLabel>
            <Select defaultValue="cdg1">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cdg1">Paris</SelectItem>
                <SelectItem value="fra1">Frankfurt</SelectItem>
                <SelectItem value="iad1">Washington</SelectItem>
                <SelectItem value="hnd1">Tokyo</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <div className="divide-y rounded-lg border">
          {[
            { id: "preview", label: "Preview deployments", desc: "One URL per pull request", on: true },
            { id: "analytics", label: "Web analytics", desc: "Cookie-free, privacy friendly", on: false },
          ].map((row) => (
            <div key={row.id} className="flex items-center justify-between gap-4 px-3.5 py-3">
              <div>
                <Label htmlFor={`sc-${row.id}`} className="text-[13px]">{row.label}</Label>
                <p className="text-xs text-muted-foreground">{row.desc}</p>
              </div>
              <Switch id={`sc-${row.id}`} defaultChecked={row.on} />
            </div>
          ))}
        </div>
        <Button className="mt-auto w-full" loading={deploying} onClick={deploy}>
          {!deploying && <Rocket />}
          {deploying ? "Deploying" : "Deploy"}
        </Button>
      </div>
    </Tile>
  )
}

function UsageTile() {
  const [requests, setRequests] = React.useState(1284032)
  const [bars, setBars] = React.useState(() => Array.from({ length: 18 }, (_, i) => 30 + ((i * 37) % 60)))

  React.useEffect(() => {
    const id = setInterval(() => {
      setRequests((r) => r + Math.floor(Math.random() * 4800))
      setBars((b) => [...b.slice(1), 25 + Math.random() * 70])
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <Tile index={1} className="lg:col-span-4">
      <TileTitle hint={<Badge variant="success" dot>Live</Badge>}>Requests</TileTitle>
      <AnimatedNumber value={requests} className="text-3xl font-semibold tracking-tight" />
      <p className="mt-1 text-xs text-muted-foreground">this billing period</p>
      <div className="mt-4 flex h-14 items-end gap-1">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            animate={{ height: `${h}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            className="flex-1 rounded-sm bg-foreground/10 last:bg-brand"
          />
        ))}
      </div>
    </Tile>
  )
}

function TeamTile() {
  const team = [
    ["RB", "bg-brand/15 text-brand"],
    ["LM", "bg-info/15 text-info"],
    ["AK", "bg-success/15 text-success"],
    ["JD", "bg-warning/20 text-warning"],
    ["SN", ""],
    ["TC", ""],
  ]
  const link = "plum.dev/join/x8f2k"
  return (
    <Tile index={2} className="lg:col-span-3">
      <TileTitle hint={<Users className="size-4 text-muted-foreground" />}>Team</TileTitle>
      <AvatarGroup max={4}>
        {team.map(([initials, color]) => (
          <Avatar key={initials}>
            <AvatarFallback className={cn("text-xs font-medium", color)}>{initials}</AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>
      <div className="mt-4 flex items-center gap-1 rounded-md border bg-muted/40 py-1 pr-1 pl-3">
        <span className="flex-1 truncate font-mono text-xs text-muted-foreground">{link}</span>
        <CopyButton value={`https://${link}`} size="icon-xs" />
      </div>
    </Tile>
  )
}

function CommandTile() {
  return (
    <Tile index={3} className="p-0 lg:col-span-4">
      <Command className="rounded-2xl bg-transparent">
        <CommandInput placeholder="Type a command…" />
        <CommandList className="max-h-52">
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem><Rocket /> Deploy project <CommandShortcut>⌘D</CommandShortcut></CommandItem>
            <CommandItem><Activity /> View logs <CommandShortcut>⌘L</CommandShortcut></CommandItem>
            <CommandItem><Globe /> Add domain</CommandItem>
            <CommandItem><Settings /> Settings <CommandShortcut>⌘,</CommandShortcut></CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </Tile>
  )
}

function VerifyTile() {
  const [code, setCode] = React.useState("")
  return (
    <Tile index={4} className="lg:col-span-3">
      <TileTitle>Two-factor</TileTitle>
      <p className="mb-4 text-xs text-muted-foreground">Enter the code from your authenticator app.</p>
      <InputOTP
        maxLength={6}
        value={code}
        onChange={setCode}
        onComplete={(v) => {
          toast.success("Verified", { description: `Code ${v} accepted.` })
          setTimeout(() => setCode(""), 900)
        }}
      >
        <InputOTPGroup>
          {Array.from({ length: 6 }, (_, i) => (
            <InputOTPSlot key={i} index={i} className="size-9" />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </Tile>
  )
}

function ActivityTile() {
  const events = [
    { who: "Ryan", what: "promoted", target: "4f2c91a to production", time: "2m", badge: <Badge variant="success">Ready</Badge> },
    { who: "Léa", what: "opened", target: "feat: billing page", time: "18m", badge: <Badge variant="info">Preview</Badge> },
    { who: "Alex", what: "rolled back", target: "api to 9c1e0d4", time: "1h", badge: <Badge variant="warning">Rollback</Badge> },
  ]
  return (
    <Tile index={5} className="lg:col-span-7">
      <Tabs defaultValue="activity">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium">Overview</h3>
          <TabsList>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="activity" className="mt-2">
          <ul className="divide-y">
            {events.map((e) => (
              <li key={e.target} className="flex items-center gap-3 py-2.5 text-sm">
                <Avatar className="size-7">
                  <AvatarFallback className="text-[10px]">{e.who.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <p className="min-w-0 flex-1 truncate">
                  <span className="font-medium">{e.who}</span> <span className="text-muted-foreground">{e.what}</span> {e.target}
                </p>
                {e.badge}
                <span className="w-7 text-right text-xs text-muted-foreground tabular-nums">{e.time}</span>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="usage" className="mt-2 space-y-4 py-1">
          {[
            ["Bandwidth", 64, "64 / 100 GB"],
            ["Build minutes", 38, "2,280 / 6,000"],
            ["Edge requests", 82, "8.2M / 10M"],
          ].map(([label, value, detail]) => (
            <div key={label as string} className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span>{label}</span>
                <span className="text-xs text-muted-foreground tabular-nums">{detail}</span>
              </div>
              <Progress value={value as number} />
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </Tile>
  )
}

function AppearanceTile() {
  return (
    <Tile index={6} className="lg:col-span-5">
      <TileTitle>Appearance</TileTitle>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <Label className="text-[13px]">Theme</Label>
          <ToggleGroup type="single" variant="outline" size="sm" defaultValue="system" aria-label="Theme">
            <ToggleGroupItem value="light" aria-label="Light"><Sun /></ToggleGroupItem>
            <ToggleGroupItem value="dark" aria-label="Dark"><Moon /></ToggleGroupItem>
            <ToggleGroupItem value="system" aria-label="System"><Monitor /></ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="space-y-3">
          <Label className="text-[13px]">Interface density</Label>
          <Slider defaultValue={[40]} showTooltip formatValue={(v) => `${v}%`} aria-label="Density" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="sc-motion" className="text-[13px]">Reduce motion</Label>
          <Switch id="sc-motion" />
        </div>
      </div>
    </Tile>
  )
}

export function Showcase() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        <DeployTile />
        <UsageTile />
        <TeamTile />
        <CommandTile />
        <VerifyTile />
        <ActivityTile />
        <AppearanceTile />
      </div>
      <p className="mt-5 text-center text-xs text-muted-foreground">Everything above is live. Click around.</p>
    </section>
  )
}
