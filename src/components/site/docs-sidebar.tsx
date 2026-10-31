"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"
import { gettingStarted } from "@/lib/docs-nav"
import type { NavGroup } from "@/registry/nav-types"

export function DocsSidebar({ nav }: { nav: NavGroup[] }) {
  const pathname = usePathname()

  const sections = [
    { title: "Getting started", items: gettingStarted.map((i) => ({ href: i.href, name: i.title, isNew: false })) },
    ...nav.map((g) => ({
      title: g.category,
      items: g.items.map((i) => ({ href: `/docs/components/${i.slug}`, name: i.name, isNew: i.isNew })),
    })),
  ]

  return (
    <aside className="sticky top-(--header-h) hidden h-[calc(100dvh-var(--header-h))] w-56 shrink-0 overflow-y-auto overscroll-contain py-8 pr-2 [scrollbar-color:transparent_transparent] hover:[scrollbar-color:var(--border)_transparent] md:block">
      <nav className="space-y-7">
        {sections.map((section) => (
          <div key={section.title}>
            <h4 className="mb-1.5 px-2.5 text-xs font-medium tracking-wide text-muted-foreground/80">{section.title}</h4>
            <ul className="space-y-px">
              {section.items.map((item) => {
                const active = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[13.5px] text-muted-foreground transition-colors hover:text-foreground",
                        active && "font-medium text-foreground"
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="sidebar-active"
                          transition={spring.snappy}
                          className="absolute inset-0 rounded-md bg-accent"
                        />
                      )}
                      <span className="relative">{item.name}</span>
                      {item.isNew && (
                        <span className="relative ml-auto size-1.5 rounded-full bg-brand" aria-label="New" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
