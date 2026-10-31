import type { Metadata } from "next"
import { CodeBlock } from "@/components/site/code-block"
import { Callout, Code, DocsHeader, DocsPage, H2, P } from "@/components/site/prose"
import { registryUrl, siteConfig } from "@/lib/site"

export const metadata: Metadata = { title: "CLI & Registry" }

export default function CliPage() {
  return (
    <DocsPage
      toc={[
        { id: "add-components", title: "Add components" },
        { id: "namespace", title: "Namespace" },
        { id: "registry-format", title: "Registry format" },
        { id: "updating", title: "Updating" },
      ]}
      prev={{ title: "Motion", href: "/docs/motion" }}
      next={{ title: "Button", href: "/docs/components/button" }}
    >
      <DocsHeader
        title="CLI & Registry"
        description="No custom CLI to learn. Plum UI publishes a shadcn-compatible registry, so the official shadcn CLI installs components, their npm dependencies and the components they build on."
      />

      <H2 id="add-components">Add components</H2>
      <P>Point the CLI at any item URL:</P>
      <CodeBlock lang="bash" code={`npx shadcn@latest add ${registryUrl("dialog")}`} />
      <P>
        This writes <Code>components/ui/dialog.tsx</Code>, installs <Code>radix-ui</Code>, and pulls in{" "}
        <Code>button</Code> because the dialog uses it. Files that already exist are never overwritten without asking.
      </P>

      <H2 id="namespace">Namespace</H2>
      <P>Register the registry once in <Code>components.json</Code> to use short names:</P>
      <CodeBlock
        lang="json"
        title="components.json"
        code={`{
  "registries": {
    "@plum": "${siteConfig.url}/r/{name}.json"
  }
}`}
      />
      <div className="mt-3">
        <CodeBlock lang="bash" code={`npx shadcn@latest add @plum/tabs @plum/toast @plum/command`} />
      </div>
      <Callout title="Available items">
        Every component slug, plus <code>theme</code> (tokens, keyframes and utilities) and <code>motion-presets</code>{" "}
        (the shared springs). The full list lives at <code>/r/index.json</code>.
      </Callout>

      <H2 id="registry-format">Registry format</H2>
      <P>Each item is a plain JSON file following the shadcn registry schema:</P>
      <CodeBlock
        lang="json"
        title="r/switch.json"
        code={`{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "switch",
  "type": "registry:ui",
  "dependencies": ["motion", "radix-ui"],
  "registryDependencies": ["utils", "${registryUrl("motion-presets")}"],
  "files": [
    { "path": "components/ui/switch.tsx", "type": "registry:ui", "content": "…" }
  ]
}`}
      />
      <P>
        The files are generated from the source of this very site by <Code>scripts/build-registry.mjs</Code> — what you
        see in the docs is exactly what you get.
      </P>

      <H2 id="updating">Updating</H2>
      <P>
        Since you own the code, updates are opt-in. Re-run <Code>add</Code> with <Code>--overwrite</Code> to take the
        latest version, or use <Code>npx shadcn@latest diff</Code> to review changes first.
      </P>
    </DocsPage>
  )
}
