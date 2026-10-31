"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { gettingStarted } from "@/lib/docs-nav"
import { cn } from "@/lib/utils"
import type { NavGroup } from "@/registry/nav-types"

export function MobileNav({ nav }: { nav: NavGroup[] }) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  // on ferme qd on change de page, logique
  React.useEffect(() => setOpen(false), [pathname])

  const sections = [
    { category: "Getting started", items: gettingStarted.map((i) => ({ href: i.href, name: i.title })) },
    ...nav.map((g) => ({ category: g.category, items: g.items.map((i) => ({ href: `/docs/components/${i.slug}`, name: i.name })) })),
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="-ml-1.5 md:hidden" aria-label="Open menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle>Plum UI</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100dvh-4rem)]">
          <div className="space-y-6 px-3 py-4">
            {sections.map((s) => (
              <div key={s.category}>
                <div className="px-2 pb-1.5 text-xs font-medium text-muted-foreground">{s.category}</div>
                {s.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent",
                      pathname === item.href ? "bg-accent font-medium" : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
