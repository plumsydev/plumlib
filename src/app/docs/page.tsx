import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { components, getComponentsByCategory } from "@/registry"
import { Button } from "@/components/ui/button"
import { DocsHeader, DocsPage, H2, P } from "@/components/site/prose"

export const metadata: Metadata = { title: "Introduction" }

const principles = [
  {
    title: "You own the code",
    body: "Components are copied into your project, not installed from a package. Read them, fork them, delete what you don't need.",
  },
  {
    title: "Motion with intent",
    body: "Every animation communicates state — where something came from, what changed, what's next. Nothing moves just to move.",
  },
  {
    title: "Accessible by default",
    body: "Built on Radix primitives: focus management, keyboard navigation and ARIA come for free, and reduced motion is respected.",
  },
  {
    title: "Tokens, not magic",
    body: "A single CSS file of OKLCH tokens drives every color, radius, shadow and easing. Change the brand in one line.",
  },
]

export default function IntroductionPage() {
  return (
    <DocsPage
      toc={[
        { id: "principles", title: "Principles" },
        { id: "components", title: "Components" },
        { id: "faq", title: "FAQ" },
      ]}
      next={{ title: "Installation", href: "/docs/installation" }}
    >
      <DocsHeader
        title="Introduction"
        description="Plum UI is a set of animated, accessible React components you copy into your app. Built on Radix, Tailwind CSS v4 and Motion, installed with its own CLI."
      />

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/docs/installation">
            Install Plum UI <ArrowRight />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs/components/button">Browse components</Link>
        </Button>
      </div>

      <P className="mt-8">
        This is not a component library you depend on. It&apos;s a collection of well-made pieces you take ownership of.
        Run <code className="font-mono text-[0.9em]">npx plum-ui add</code>, and the component lands in your repo as a
        readable file. Every piece is animated by design, keyboard accessible, themed by a single CSS file — and
        yours to change.
      </P>

      <H2 id="principles">Principles</H2>
      <div className="grid gap-3 sm:grid-cols-2">
        {principles.map((p) => (
          <div key={p.title} className="rounded-xl border bg-card p-5 transition-colors hover:border-foreground/15">
            <h3 className="font-medium">{p.title}</h3>
            <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>

      <H2 id="components">{components.length} components</H2>
      <div className="space-y-8">
        {getComponentsByCategory().map((group) => (
          <div key={group.category}>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">{group.category}</h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {group.items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/docs/components/${item.slug}`}
                  className="group flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-sm transition-[background-color,border-color] duration-200 hover:border-foreground/15 hover:bg-accent/50"
                >
                  {item.name}
                  <ArrowRight className="size-3.5 -translate-x-1 text-muted-foreground opacity-0 transition-all duration-300 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <H2 id="faq">FAQ</H2>
      <div className="divide-y rounded-xl border">
        {[
          ["Why copy-paste instead of an npm package?", "Because the moment you need to tweak a component, a package becomes a fight. Here the code is yours from day one."],
          ["Do I need another UI kit?", "No. Plum UI is complete on its own: its CLI, registry, theme and components have no dependency on any other kit. If your project already uses shadcn/ui, the token names match and its CLI can install Plum components too."],
          ["Which frameworks are supported?", "Anything that runs React 19 and Tailwind CSS v4: Next.js, Vite, Remix, Astro islands, TanStack Start."],
          ["What about bundle size?", "You only ship what you copy. Motion is tree-shaken, and many animations are pure CSS driven by Radix data attributes."],
        ].map(([q, a]) => (
          <div key={q} className="p-5">
            <h3 className="font-medium">{q}</h3>
            <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{a}</p>
          </div>
        ))}
      </div>
    </DocsPage>
  )
}
