"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site"
import { spring } from "@/lib/motion"
import { Button } from "@/components/ui/button"
import { Wordmark } from "./logo"
import { ThemeToggle } from "./theme-toggle"
import { CommandMenu } from "./command-menu"
import { MobileNav } from "./mobile-nav"
import { GitHubIcon } from "./icons"
import type { NavGroup } from "@/registry/nav-types"

const links = [
  { title: "Docs", href: "/docs", match: (p: string) => p === "/docs" || p.startsWith("/docs/installation") },
  { title: "Components", href: "/docs/components/button", match: (p: string) => p.startsWith("/docs/components") },
  { title: "Blocks", href: "/blocks", match: (p: string) => p.startsWith("/blocks") },
  { title: "Theming", href: "/docs/theming", match: (p: string) => p.startsWith("/docs/theming") },
  { title: "Motion", href: "/docs/motion", match: (p: string) => p.startsWith("/docs/motion") },
]

export function SiteHeader({ nav }: { nav: NavGroup[] }) {
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = React.useState(false)
  const [hovered, setHovered] = React.useState<string | null>(null)

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8))

  return (
    <header
      data-scrolled={scrolled}
      className="sticky top-0 z-40 h-(--header-h) border-b border-transparent bg-background/0 transition-[background-color,border-color,backdrop-filter] duration-300 data-[scrolled=true]:border-border data-[scrolled=true]:bg-background/75 data-[scrolled=true]:backdrop-blur-xl"
    >
      <div className="mx-auto flex h-full max-w-[1400px] items-center gap-4 px-4 sm:px-6">
        <MobileNav nav={nav} />
        <Link href="/" aria-label={siteConfig.name}>
          <Wordmark />
        </Link>

        <nav className="ml-4 hidden items-center md:flex" onMouseLeave={() => setHovered(null)}>
          {links.map((link) => {
            const active = link.match(pathname)
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                className={cn(
                  "relative px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                  active && "text-foreground"
                )}
              >
                {hovered === link.href && (
                  <motion.span layoutId="nav-hover" transition={spring.snappy} className="absolute inset-0 rounded-md bg-accent" />
                )}
                <span className="relative">{link.title}</span>
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <CommandMenu nav={nav} />
          <Button variant="ghost" size="icon-sm" asChild>
            <a href={siteConfig.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
