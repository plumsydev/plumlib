import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRight } from "lucide-react"
import { components, getComponent } from "@/registry"
import { readComponent, readDemo } from "@/lib/source"
import { registryUrl } from "@/lib/site"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/site/code-block"
import { ComponentPreview } from "@/components/site/component-preview"
import { Inline } from "@/components/site/inline"
import { DocsHeader, DocsPage, H2, H3, P, PropsTable, Step, Steps, slugify } from "@/components/site/prose"
import type { TocItem } from "@/components/site/toc"

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const doc = getComponent((await params).slug)
  if (!doc) return {}
  return {
    title: doc.name,
    description: doc.description,
    openGraph: { title: `${doc.name} · Plum UI`, description: doc.description, url: `/docs/components/${doc.slug}` },
    twitter: { card: "summary_large_image", title: `${doc.name} · Plum UI`, description: doc.description },
  }
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getComponent(slug)
  if (!doc) notFound()

  const [main, ...examples] = doc.demos
  const index = components.findIndex((c) => c.slug === slug)
  const prev = components[index - 1]
  const next = components[index + 1]

  const [mainCode, source, exampleCodes] = await Promise.all([
    readDemo(slug, main.name),
    readComponent(slug),
    Promise.all(examples.map((e) => readDemo(slug, e.name))),
  ])

  const deps = doc.dependencies ?? []

  const toc: TocItem[] = [
    ...(doc.playground ? [{ id: "playground", title: "Playground" }] : []),
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
    ...(examples.length
      ? [{ id: "examples", title: "Examples" }, ...examples.map((e) => ({ id: slugify(e.title ?? e.name), title: e.title ?? e.name, level: 3 as const }))]
      : []),
    ...(doc.api?.length ? [{ id: "api-reference", title: "API Reference" }] : []),
    ...(doc.notes?.length ? [{ id: "notes", title: "Notes" }] : []),
  ]

  return (
    <DocsPage
      toc={toc}
      prev={prev && { title: prev.name, href: `/docs/components/${prev.slug}` }}
      next={next && { title: next.name, href: `/docs/components/${next.slug}` }}
    >
      <DocsHeader title={doc.name} description={doc.description}>
        <Badge variant="secondary">{doc.category}</Badge>
        {doc.primitive && (
          <Badge variant="outline" asChild>
            <a href={doc.primitive.href} target="_blank" rel="noreferrer">
              {doc.primitive.name} <ArrowUpRight />
            </a>
          </Badge>
        )}
      </DocsHeader>

      <ComponentPreview code={<CodeBlock code={mainCode} />}>
        <main.component />
      </ComponentPreview>

      {doc.playground && (
        <>
          <H2 id="playground">Playground</H2>
          <P className="-mt-1 text-sm text-muted-foreground">Tweak the props, the preview and the code follow.</P>
          <doc.playground />
        </>
      )}

      <H2 id="installation">Installation</H2>
      <Tabs defaultValue="cli">
        <TabsList>
          <TabsTrigger value="cli">CLI</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
          <TabsTrigger value="shadcn">shadcn CLI</TabsTrigger>
        </TabsList>
        <TabsContent value="cli" className="pt-2">
          <CodeBlock lang="bash" code={`npx plum-ui add ${slug}`} />
          {doc.registryDependencies?.length ? (
            <P className="text-sm text-muted-foreground">
              Also pulls in{" "}
              {doc.registryDependencies.map((d, i) => (
                <span key={d}>
                  {i > 0 && ", "}
                  <Link href={`/docs/components/${d}`} className="font-medium text-foreground underline underline-offset-4">
                    {d}
                  </Link>
                </span>
              ))}{" "}
              automatically.
            </P>
          ) : null}
        </TabsContent>
        <TabsContent value="manual" className="pt-2">
          <Steps>
            {deps.length > 0 && (
              <Step title="Install the dependencies">
                <CodeBlock lang="bash" code={`npm install ${deps.join(" ")}`} />
              </Step>
            )}
            {doc.registryDependencies?.length ? (
              <Step title="Add the components it builds on">
                <p className="text-sm leading-6">
                  {doc.registryDependencies.map((d, i) => (
                    <span key={d}>
                      {i > 0 && ", "}
                      <Link href={`/docs/components/${d}`} className="font-medium underline underline-offset-4">
                        {d}
                      </Link>
                    </span>
                  ))}
                </p>
              </Step>
            ) : null}
            <Step title="Copy the source into your project">
              <CodeBlock code={source} title={`components/ui/${slug}.tsx`} collapsible />
            </Step>
            <Step title="Update the import paths to match your setup">
              <p className="text-sm leading-6 text-muted-foreground">
                Everything imports from <code className="font-mono text-foreground">@/lib/utils</code> and{" "}
                <code className="font-mono text-foreground">@/components/ui</code> by default.
              </p>
            </Step>
          </Steps>
        </TabsContent>
        <TabsContent value="shadcn" className="pt-2">
          <CodeBlock lang="bash" code={`npx shadcn@latest add ${registryUrl(slug)}`} />
          <P className="text-sm text-muted-foreground">
            Already using the shadcn CLI? Plum UI publishes a mirror of every item in its registry format.
          </P>
        </TabsContent>
      </Tabs>

      <H2 id="usage">Usage</H2>
      <div className="space-y-3">
        <CodeBlock code={doc.usage.imports} />
        <CodeBlock code={doc.usage.code} />
      </div>

      {examples.length > 0 && (
        <>
          <H2 id="examples">Examples</H2>
          {examples.map((example, i) => {
            const title = example.title ?? example.name
            return (
              <section key={example.name}>
                <H3 id={slugify(title)}>{title}</H3>
                {example.description && (
                  <P className="-mt-1 text-sm text-muted-foreground">
                    <Inline text={example.description} />
                  </P>
                )}
                <ComponentPreview code={<CodeBlock code={exampleCodes[i]} />}>
                  <example.component />
                </ComponentPreview>
              </section>
            )
          })}
        </>
      )}

      {doc.api?.length ? (
        <>
          <H2 id="api-reference">API Reference</H2>
          {doc.api.map((part) => (
            <section key={part.component}>
              <H3 id={`api-${slugify(part.component)}`}>{part.component}</H3>
              {part.description && (
                <P className="-mt-1 text-sm text-muted-foreground">
                  <Inline text={part.description} />
                </P>
              )}
              {part.props.length > 0 && <PropsTable props={part.props} />}
            </section>
          ))}
        </>
      ) : null}

      {doc.notes?.length ? (
        <>
          <H2 id="notes">Notes</H2>
          <ul className="my-4 list-disc space-y-2 pl-5 text-foreground/85 marker:text-muted-foreground">
            {doc.notes.map((note) => (
              <li key={note} className="leading-7">
                <Inline text={note} />
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </DocsPage>
  )
}
