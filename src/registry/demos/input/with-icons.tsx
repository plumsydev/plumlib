"use client"

import { Search } from "lucide-react"
import { Input, InputAddon, InputGroup } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"

export default function InputWithIcons() {
  return (
    <div className="grid w-full max-w-xs gap-3">
      <InputGroup>
        <InputAddon>
          <Search />
        </InputAddon>
        <Input placeholder="Search issues…" />
        <InputAddon align="end">
          <Kbd>⌘K</Kbd>
        </InputAddon>
      </InputGroup>
      <InputGroup>
        <InputAddon>https://</InputAddon>
        <Input placeholder="my-project" />
        <InputAddon align="end">.infraflow.app</InputAddon>
      </InputGroup>
    </div>
  )
}
