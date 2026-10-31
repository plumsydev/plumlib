import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { CodeBlock } from "@/components/site/code-block"
import { ComponentPreview } from "@/components/site/component-preview"
import { Badge } from "@/components/ui/badge"
import { blocks } from "@/blocks"
import { getNav } from "@/registry"
import { readSource } from "@/lib/source"

export const metadata: Metadata = {
  title: "Blocks",
  description: "Full, interactive screens built from Plum UI components. Copy them as a starting point.",
}

export default async function BlocksPage() {
  const sources = await Promise.all(blocks.map((b) => readSource("blocks", `${b.slug}.tsx`)))

  return (
    <div className="relative flex min-h-dvh flex-col">
      <SiteHeader nav={getNav()} />
      <main className="mx-auto w-full max-w-5xl flex-1 animate-fade-up px-4 py-14 sm:px-6 sm:py-20">
        <header className="mb-14 max-w-2xl">
          <p className="mb-3 font-mono text-xs tracking-wider text-muted-foreground uppercase">Blocks</p>
          <h1 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Whole screens, ready to copy.</h1>
          <p className="mt-4 text-lg text-pretty text-muted-foreground">
            Real flows assembled from the components — every one fully interactive. Use them as a starting point or
            as a reference for how the pieces fit.
          </p>
        </header>

        <div className="space-y-20">
          {blocks.map((block, i) => (
            <section key={block.slug} id={block.slug} className="scroll-mt-24">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-xl">
                  <h2 className="text-xl font-semibold tracking-tight">{block.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{block.description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {block.uses.map((u) => (
                    <Badge key={u} variant="outline" asChild>
                      <Link href={`/docs/components/${u}`}>{u}</Link>
                    </Badge>
                  ))}
                </div>
              </div>
              <ComponentPreview code={<CodeBlock code={sources[i]} title={`blocks/${block.slug}.tsx`} />}>
                <div className="flex w-full justify-center py-6">
                  <block.component />
                </div>
              </ComponentPreview>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
