"use client"

import * as React from "react"
import { Pause, Play, Repeat, Shuffle } from "lucide-react"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { cn } from "@/lib/utils"

export default function MenubarPlayer() {
  const [playing, setPlaying] = React.useState(false)
  const [shuffle, setShuffle] = React.useState(false)
  const [repeat, setRepeat] = React.useState(true)
  const [speed, setSpeed] = React.useState("1")

  return (
    <div className="w-full max-w-md space-y-3">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Controls</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onSelect={() => setPlaying((p) => !p)}>
              {playing ? <Pause /> : <Play />} {playing ? "Pause" : "Play"} <MenubarShortcut>Space</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarCheckboxItem checked={shuffle} onCheckedChange={setShuffle}>
              Shuffle
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked={repeat} onCheckedChange={setRepeat}>
              Repeat
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Speed</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value={speed} onValueChange={setSpeed}>
              {["0.75", "1", "1.25", "1.5", "2"].map((s) => (
                <MenubarRadioItem key={s} value={s}>
                  {s}×
                </MenubarRadioItem>
              ))}
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <div className="flex items-center gap-3 rounded-xl border bg-card p-3">
        <div className="flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-brand/80 to-info/70" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium">Shipping Season — Ep. 42</div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="tabular-nums">{speed}×</span>
            <Shuffle className={cn("size-3 transition-colors", shuffle ? "text-foreground" : "opacity-30")} />
            <Repeat className={cn("size-3 transition-colors", repeat ? "text-foreground" : "opacity-30")} />
          </div>
        </div>
        {/* barres d'égaliseur qui dansent qd ça joue, vitesse liée au speed */}
        <div className="flex h-6 items-end gap-0.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-1 rounded-full bg-foreground/70"
              style={{
                height: playing ? undefined : "20%",
                animation: playing ? `pl-eq ${0.9 / Number(speed)}s ease-in-out ${i * 0.12}s infinite alternate` : "none",
              }}
            />
          ))}
        </div>
      </div>
      <style>{`@keyframes pl-eq { from { height: 20% } to { height: 100% } }`}</style>
    </div>
  )
}
