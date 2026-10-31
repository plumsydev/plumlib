import Link from "next/link"
import { ArrowLeft, ArrowRight, Info, Link2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PropDef } from "@/registry/types"
import { Toc, type TocItem } from "./toc"
import { SiteFooter } from "./site-footer"

export function DocsPage({
  children,
  toc = [],
  prev,
  next,
}: {
  children: React.ReactNode
  toc?: TocItem[]
  prev?: { title: string; href: string }
  next?: { title: string; href: string }
}) {
  return (
    <div className="flex gap-10">
      <article className="min-w-0 flex-1 animate-fade-up py-10 lg:py-12">
        <div className="mx-auto max-w-3xl">
          {children}
          {(prev || next) && (
            <div className="mt-16 flex items-center justify-between gap-4 border-t pt-6">
              {prev ? <PagerLink {...prev} dir="prev" /> : <span />}
              {next ? <PagerLink {...next} dir="next" /> : <span />}
            </div>
          )}
        </div>
        <div className="mx-auto mt-16 max-w-3xl [&_footer]:border-t-0 [&_footer>div]:px-0">
          <SiteFooter />
        </div>
      </article>
      <Toc items={toc} />
    </div>
  )
}

function PagerLink({ title, href, dir }: { title: string; href: string; dir: "prev" | "next" }) {
  return (
    <Link
      href={href}
      className={cn("group flex flex-col gap-1 rounded-lg px-1 py-1 text-sm", dir === "next" && "items-end text-right")}
    >
      <span className="text-xs text-muted-foreground">{dir === "prev" ? "Previous" : "Next"}</span>
      <span className="flex items-center gap-1.5 font-medium">
        {dir === "prev" && <ArrowLeft className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:-translate-x-1" />}
        {title}
        {dir === "next" && <ArrowRight className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />}
      </span>
    </Link>
  )
}

export function DocsHeader({ title, description, children }: { title: string; description: string; children?: React.ReactNode }) {
  return (
    <header className="mb-10 space-y-3">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-[2.1rem]">{title}</h1>
      <p className="text-[17px] leading-relaxed text-pretty text-muted-foreground">{description}</p>
      {children && <div className="flex flex-wrap gap-2 pt-1">{children}</div>}
    </header>
  )
}

export function H2({ id, children, className }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <h2 id={id} className={cn("group mt-14 mb-4 flex scroll-mt-24 items-center gap-2 text-xl font-semibold tracking-tight first:mt-0", className)}>
      <a href={`#${id}`} className="flex items-center gap-2">
        {children}
        <Link2 className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </a>
    </h2>
  )
}

export function H3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="mt-10 mb-3 scroll-mt-24 text-base font-semibold tracking-tight">
      {children}
    </h3>
  )
}

export function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("my-4 leading-7 text-pretty text-foreground/85", className)}>{children}</p>
}

export function Code({ children }: { children: React.ReactNode }) {
  return <code className="rounded-md border bg-muted/60 px-1.5 py-0.5 font-mono text-[0.85em]">{children}</code>
}

export function Callout({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="my-6 flex gap-3 rounded-xl border bg-muted/30 p-4 text-sm leading-6">
      <Info className="mt-0.5 size-4 shrink-0 text-brand" />
      <div>
        {title && <div className="mb-0.5 font-medium">{title}</div>}
        <div className="text-foreground/80 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.85em]">{children}</div>
      </div>
    </div>
  )
}

export function Steps({ children }: { children: React.ReactNode }) {
  return <div className="my-6 ml-3.5 border-l pl-8 [counter-reset:step]">{children}</div>
}

export function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative pb-8 last:pb-0 [counter-increment:step]">
      <span className="absolute top-0 -left-[calc(2rem+0.875rem+0.5px)] flex size-7 items-center justify-center rounded-full border bg-background font-mono text-xs font-medium before:content-[counter(step)]" />
      <h4 className="mb-3 pt-0.5 font-medium">{title}</h4>
      <div className="text-foreground/85 [&>*:first-child]:mt-0">{children}</div>
    </div>
  )
}

export function PropsTable({ props }: { props: PropDef[] }) {
  return (
    <div className="my-4 overflow-x-auto rounded-xl border">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/40 text-xs text-muted-foreground">
          <tr>
            <th className="px-4 py-2.5 font-medium">Prop</th>
            <th className="px-4 py-2.5 font-medium">Type</th>
            <th className="px-4 py-2.5 font-medium">Default</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {props.map((p) => (
            <tr key={p.name} className="align-top transition-colors hover:bg-muted/30">
              <td className="px-4 py-3">
                <code className="font-mono text-[13px] font-medium text-brand">
                  {p.name}
                  {p.required && <span className="text-destructive">*</span>}
                </code>
                <p className="mt-1 max-w-56 text-[13px] leading-5 text-muted-foreground">{p.description}</p>
              </td>
              <td className="px-4 py-3">
                <code className="font-mono text-[12.5px] break-words text-foreground/80">{p.type}</code>
              </td>
              <td className="px-4 py-3">
                <code className="font-mono text-[12.5px] text-muted-foreground">{p.default ?? "—"}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}
