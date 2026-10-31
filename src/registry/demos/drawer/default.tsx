"use client"

import * as React from "react"
import { Check, CircleDashed } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"

const cycles = [
  { id: "c42", name: "Cycle 42", range: "Oct 28 – Nov 10", progress: "Current" },
  { id: "c43", name: "Cycle 43", range: "Nov 11 – Nov 24", progress: "Next" },
  { id: "c44", name: "Cycle 44", range: "Nov 25 – Dec 8", progress: "Upcoming" },
]

export default function DrawerDemo() {
  const [selected, setSelected] = React.useState("c42")

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <CircleDashed /> Move to cycle
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move 3 issues</DrawerTitle>
            <DrawerDescription>Pick the cycle these issues should land in.</DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-1.5 px-4">
            {cycles.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelected(c.id)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-[border-color,background-color] duration-200",
                  selected === c.id ? "border-foreground/25 bg-accent" : "hover:bg-accent/60"
                )}
              >
                <div className="flex-1">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.range}</div>
                </div>
                <span className="text-xs text-muted-foreground">{c.progress}</span>
                <Check className={cn("size-4 transition-[opacity,transform] duration-200", selected === c.id ? "scale-100 opacity-100" : "scale-50 opacity-0")} />
              </button>
            ))}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>Move issues</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
