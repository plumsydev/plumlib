"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"

export type TocItem = { id: string; title: string; level?: 2 | 3 }

export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = React.useState(items[0]?.id)

  React.useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[]
    // la section la plus haute visible gagne, simple et ça marche
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-80px 0px -65% 0px" }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <div className="sticky top-(--header-h) hidden h-[calc(100dvh-var(--header-h))] w-52 shrink-0 py-10 xl:block">
      <p className="mb-3 text-xs font-medium text-muted-foreground/80">On this page</p>
      <ul className="relative space-y-0.5 border-l">
        {items.map((item) => (
          <li key={item.id} className="relative">
            {active === item.id && (
              <motion.span layoutId="toc-marker" transition={spring.snappy} className="absolute top-0 -left-px h-full w-px bg-foreground" />
            )}
            <a
              href={`#${item.id}`}
              className={cn(
                "block py-1 text-[13px] text-muted-foreground transition-colors hover:text-foreground",
                item.level === 3 ? "pl-6" : "pl-3.5",
                active === item.id && "text-foreground"
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
