"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const invoices = [
  { id: "INV-2041", customer: "Northwind", status: "Paid", method: "Card", amount: 1250 },
  { id: "INV-2042", customer: "Globex", status: "Pending", method: "Transfer", amount: 480 },
  { id: "INV-2043", customer: "Initech", status: "Paid", method: "Card", amount: 2900 },
  { id: "INV-2044", customer: "Umbrella", status: "Overdue", method: "Transfer", amount: 760 },
  { id: "INV-2045", customer: "Hooli", status: "Paid", method: "Card", amount: 1840 },
]

const status = { Paid: "success", Pending: "warning", Overdue: "destructive" } as const
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

export default function TableDemo() {
  return (
    <Table className="max-w-xl">
      <TableCaption>Invoices issued in October.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow key={inv.id}>
            <TableCell className="font-mono text-xs">{inv.id}</TableCell>
            <TableCell className="font-medium">{inv.customer}</TableCell>
            <TableCell>
              <Badge variant={status[inv.status as keyof typeof status]}>{inv.status}</Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">{inv.method}</TableCell>
            <TableCell className="text-right tabular-nums">{usd.format(inv.amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right tabular-nums">{usd.format(invoices.reduce((s, i) => s + i.amount, 0))}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
