"use client"

import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Playground, jsxProps } from "@/components/site/playground"

export default function DrawerPlayground() {
  return (
    <Playground
      controls={{
        direction: { type: "select", options: ["bottom", "top", "left", "right"], default: "bottom" },
        shouldScaleBackground: { type: "boolean", default: true, label: "scaleBackground" },
      }}
      render={(p) => (
        <Drawer key={p.direction} {...p}>
          <DrawerTrigger asChild>
            <Button variant="outline">Open drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Move to cycle</DrawerTitle>
              <DrawerDescription>Drag, swipe or press Esc to dismiss.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Cycle 24</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
      code={(p) => `<Drawer${jsxProps({ direction: p.direction }, { direction: "bottom" })}${p.shouldScaleBackground ? "" : " shouldScaleBackground={false}"}>
  <DrawerTrigger asChild>
    <Button variant="outline">Open drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Move to cycle</DrawerTitle>
      <DrawerDescription>Drag, swipe or press Esc to dismiss.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Cycle 24</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
    />
  )
}
