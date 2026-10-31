import Link from "next/link"
import { siteConfig } from "@/lib/site"
import { Logo } from "./logo"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <Logo className="size-4 text-foreground" />
          <span>
            Built by{" "}
            <a href="https://plumsy.dev" className="font-medium text-foreground underline-offset-4 hover:underline">
              Plumsy
            </a>
            . Open source, MIT licensed.
          </span>
        </div>
        <div className="flex gap-5">
          <Link href="/docs" className="transition-colors hover:text-foreground">Docs</Link>
          <Link href="/docs/components/button" className="transition-colors hover:text-foreground">Components</Link>
          <a href={siteConfig.github} className="transition-colors hover:text-foreground">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
