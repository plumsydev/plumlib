"use client"

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

const events = [
  { time: "14:02", text: "Deployment promoted to production" },
  { time: "13:58", text: "Build completed in 41s" },
  { time: "13:57", text: "Preview deployment created" },
  { time: "13:57", text: "Pushed 3 commits to main" },
]

export default function DrawerDirection() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">Activity</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Activity</DrawerTitle>
          <DrawerDescription>Swipe right to close.</DrawerDescription>
        </DrawerHeader>
        <ol className="grid gap-4 px-4 text-sm">
          {events.map((e, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-10 shrink-0 font-mono text-xs leading-5 text-muted-foreground">{e.time}</span>
              <span>{e.text}</span>
            </li>
          ))}
        </ol>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
