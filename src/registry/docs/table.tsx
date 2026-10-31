import type { ComponentDoc } from "../types"
import Default from "../demos/table/default"
import Selectable from "../demos/table/selectable"
import Sortable from "../demos/table/sortable"
import TablePlayground from "../playgrounds/table"

export const doc: ComponentDoc = {
  slug: "table",
  name: "Table",
  description: "Semantic, responsive tables with soft row hover and an animated selection marker.",
  category: "Data Display",
  registryDependencies: ["badge"],
  demos: [
    { name: "default", component: Default },
    { name: "selectable", title: "Selectable rows", description: "Set `data-state=\"selected\"` on a row to highlight it and grow the accent bar.", component: Selectable },
    { name: "sortable", title: "Animated sorting", description: "Wrap rows with `motion.create(TableRow)` and `layout` to animate reordering.", component: Sortable },
  ],
  playground: TablePlayground,
  usage: {
    imports: `import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"`,
    code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV-2041</TableCell>
      <TableCell className="text-right">$1,250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  },
  api: [
    {
      component: "TableRow",
      description: "A styled `tr`.",
      props: [{ name: "data-state", type: '"selected"', description: "Highlights the row and reveals the accent bar." }],
    },
  ],
  notes: [
    "The table is wrapped in a horizontally scrollable container, so wide tables never break the layout on mobile.",
    "For sorting, filtering and pagination logic, pair it with TanStack Table.",
  ],
}
