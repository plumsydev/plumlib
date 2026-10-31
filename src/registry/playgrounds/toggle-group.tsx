"use client"

import { AlignCenter, AlignLeft, AlignRight } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Playground, jsxProps } from "@/components/site/playground"

export default function ToggleGroupPlayground() {
  return (
    <Playground
      controls={{
        type: { type: "select", options: ["single", "multiple"], default: "single" },
        variant: { type: "select", options: ["default", "outline", "ghost"], default: "default" },
        size: { type: "select", options: ["sm", "default", "lg"], default: "default" },
        disabled: { type: "boolean", default: false },
      }}
      render={({ type, ...p }) =>
        type === "single" ? (
          <ToggleGroup key="s" type="single" defaultValue="left" {...p}>
            <ToggleGroupItem value="left" aria-label="Align left"><AlignLeft /></ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center"><AlignCenter /></ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right"><AlignRight /></ToggleGroupItem>
          </ToggleGroup>
        ) : (
          <ToggleGroup key="m" type="multiple" defaultValue={["left"]} {...p}>
            <ToggleGroupItem value="left" aria-label="Align left"><AlignLeft /></ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center"><AlignCenter /></ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right"><AlignRight /></ToggleGroupItem>
          </ToggleGroup>
        )
      }
      code={({ type, ...p }) => `<ToggleGroup type="${type}" defaultValue={${type === "single" ? '"left"' : '["left"]'}}${jsxProps(p, { variant: "default", size: "default" })}>
  <ToggleGroupItem value="left" aria-label="Align left">
    <AlignLeft />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align center">
    <AlignCenter />
  </ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right">
    <AlignRight />
  </ToggleGroupItem>
</ToggleGroup>`}
    />
  )
}
