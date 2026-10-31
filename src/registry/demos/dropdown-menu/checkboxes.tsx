"use client"

import * as React from "react"
import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const properties = ["Status", "Priority", "Assignee", "Labels", "Due date"]

export default function DropdownMenuCheckboxes() {
  const [visible, setVisible] = React.useState<string[]>(["Status", "Priority", "Assignee"])
  const [ordering, setOrdering] = React.useState("priority")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <SlidersHorizontal /> Display
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>Ordering</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={ordering} onValueChange={setOrdering}>
          <DropdownMenuRadioItem value="priority">Priority</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="updated">Last updated</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="created">Created</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Properties</DropdownMenuLabel>
        {properties.map((p) => (
          <DropdownMenuCheckboxItem
            key={p}
            checked={visible.includes(p)}
            // on garde le menu ouvert pr cocher plusieurs trucs d'affilée
            onSelect={(e) => e.preventDefault()}
            onCheckedChange={(checked) =>
              setVisible((v) => (checked ? [...v, p] : v.filter((x) => x !== p)))
            }
          >
            {p}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
