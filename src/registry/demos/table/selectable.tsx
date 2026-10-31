"use client"

import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const members = [
  { name: "Léa Martin", email: "lea@acme.com", role: "Owner" },
  { name: "Noah Kim", email: "noah@acme.com", role: "Admin" },
  { name: "Sam Ortiz", email: "sam@acme.com", role: "Member" },
  { name: "Ava Chen", email: "ava@acme.com", role: "Member" },
]

export default function TableSelectable() {
  const [selected, setSelected] = React.useState<Set<string>>(new Set(["noah@acme.com"]))

  const toggle = (email: string) =>
    setSelected((s) => {
      const n = new Set(s)
      if (n.has(email)) n.delete(email)
      else n.add(email)
      return n
    })

  return (
    <div className="w-full max-w-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((m) => (
            <TableRow
              key={m.email}
              data-state={selected.has(m.email) ? "selected" : undefined}
              aria-selected={selected.has(m.email)}
              tabIndex={0}
              onClick={() => toggle(m.email)}
              onKeyDown={(e) => (e.key === " " || e.key === "Enter") && (e.preventDefault(), toggle(m.email))}
              className="cursor-pointer outline-none focus-visible:bg-muted/50"
            >
              <TableCell className="font-medium">{m.name}</TableCell>
              <TableCell className="text-muted-foreground">{m.email}</TableCell>
              <TableCell className="text-right">{m.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="mt-3 text-xs text-muted-foreground tabular-nums">{selected.size} of {members.length} selected</p>
    </div>
  )
}
