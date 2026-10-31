"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Playground } from "@/components/site/playground"

const rows = [
  { id: "INV-2041", customer: "Northwind", status: "Paid", amount: 1240 },
  { id: "INV-2042", customer: "Lumen", status: "Pending", amount: 380 },
  { id: "INV-2043", customer: "Parcel", status: "Paid", amount: 2900 },
  { id: "INV-2044", customer: "Fieldnote", status: "Overdue", amount: 610 },
  { id: "INV-2045", customer: "Halcyon", status: "Paid", amount: 145 },
]

const tone = { Paid: "success", Pending: "secondary", Overdue: "destructive" } as const

function Demo({ selectable, striped, compact, rows: count }: { selectable: boolean; striped: boolean; compact: boolean; rows: number }) {
  const [selected, setSelected] = React.useState<string[]>(["INV-2042"])
  const list = rows.slice(0, count)
  const cell = compact ? "py-1.5" : undefined
  return (
    <div className="w-full max-w-lg rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            {selectable && (
              <TableHead className="w-8 pl-3">
                <Checkbox
                  checked={selected.length === list.length ? true : selected.length ? "indeterminate" : false}
                  onCheckedChange={(v) => setSelected(v === true ? list.map((r) => r.id) : [])}
                  aria-label="Select all"
                />
              </TableHead>
            )}
            <TableHead>Invoice</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((r, i) => (
            <TableRow
              key={r.id}
              data-state={selectable && selected.includes(r.id) ? "selected" : undefined}
              className={striped && i % 2 ? "bg-muted/30" : undefined}
            >
              {selectable && (
                <TableCell className={`pl-3 ${cell ?? ""}`}>
                  <Checkbox
                    checked={selected.includes(r.id)}
                    onCheckedChange={(v) => setSelected((s) => (v === true ? [...s, r.id] : s.filter((x) => x !== r.id)))}
                    aria-label={`Select ${r.id}`}
                  />
                </TableCell>
              )}
              <TableCell className={`font-mono text-xs ${cell ?? ""}`}>{r.id}</TableCell>
              <TableCell className={cell}>{r.customer}</TableCell>
              <TableCell className={cell}>
                <Badge variant={tone[r.status as keyof typeof tone]}>{r.status}</Badge>
              </TableCell>
              <TableCell className={`text-right tabular-nums ${cell ?? ""}`}>€{r.amount.toLocaleString("en-US")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default function TablePlayground() {
  return (
    <Playground
      controls={{
        selectable: { type: "boolean", default: true },
        striped: { type: "boolean", default: false },
        compact: { type: "boolean", default: false },
        rows: { type: "number", default: 4, min: 1, max: 5 },
      }}
      render={(v) => <Demo {...v} />}
      code={({ selectable }) => `<Table>
  <TableHeader>
    <TableRow>
${selectable ? "      <TableHead><Checkbox aria-label=\"Select all\" /></TableHead>\n" : ""}      <TableHead>Invoice</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow${selectable ? ' data-state="selected"' : ""}>
${selectable ? "      <TableCell><Checkbox checked /></TableCell>\n" : ""}      <TableCell>INV-2041</TableCell>
      <TableCell className="text-right">€1,240</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
    />
  )
}
