"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Trash2 } from "lucide-react"
import { NumberInput } from "@/components/ui/number-input"
import { AnimatedNumber } from "@/components/ui/animated-number"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

const initial = [
  { id: "hoodie", name: "Heavyweight hoodie", variant: "Charcoal · L", price: 89, qty: 1 },
  { id: "cap", name: "Six-panel cap", variant: "Ecru", price: 34, qty: 2 },
  { id: "socks", name: "Merino socks", variant: "3-pack", price: 24, qty: 1 },
]

export default function NumberInputCart() {
  const [items, setItems] = React.useState(initial)
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <div className="w-full max-w-md rounded-xl border bg-card">
      <ul className="divide-y">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.li
              key={item.id}
              layout
              exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
              className="flex items-center gap-3 overflow-hidden px-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.variant} · ${item.price}</p>
              </div>
              <NumberInput
                size="sm"
                value={item.qty}
                min={1}
                max={9}
                onValueChange={(qty) => setItems((list) => list.map((i) => (i.id === item.id ? { ...i, qty } : i)))}
                containerClassName="w-28"
                aria-label={`${item.name} quantity`}
              />
              <Button
                size="icon-sm"
                variant="ghost"
                aria-label={`Remove ${item.name}`}
                onClick={() => setItems((list) => list.filter((i) => i.id !== item.id))}
              >
                <Trash2 />
              </Button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <div className="flex items-center justify-between border-t px-4 py-3">
        <div className="text-sm">
          <span className="text-muted-foreground">Total </span>
          <AnimatedNumber value={total} format={{ style: "currency", currency: "USD" }} className="font-semibold" />
        </div>
        <Button
          size="sm"
          disabled={!items.length}
          onClick={() => toast.success("Order placed", { description: `${items.reduce((n, i) => n + i.qty, 0)} items on their way.` })}
        >
          Checkout
        </Button>
      </div>
    </div>
  )
}
