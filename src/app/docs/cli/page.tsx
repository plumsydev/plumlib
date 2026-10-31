import type { Metadata } from "next"
import { CodeBlock } from "@/components/site/code-block"
import { Callout, Code, DocsHeader, DocsPage, H2, H3, P } from "@/components/site/prose"
import { plumRegistryUrl, registryUrl, siteConfig } from "@/lib/site"

export const metadata: Metadata = { title: "CLI & Registry" }

const commands = [
  ["init", "Writes plum.json, utils, motion presets and the theme, links the theme, installs base packages."],
  ["add <name...>", "Adds components plus everything they build on, rewrites imports to your aliases, installs npm packages."],
  ["add --all", "Adds every component in the registry."],
  ["list", "Browses the registry by category, marking what you already have."],
  ["diff [name...]", "Shows how your local copies differ from the registry. No name compares everything."],
]

const flags = [
  ["-y, --yes", "Accept defaults, never prompt."],
  ["-o, --overwrite", "Replace files that already exist."],
  ["--dry-run", "Print what would be written."],
  ["--no-install", "Skip installing npm packages."],
  ["--cwd <dir>", "Run in another directory."],
  ["--registry <url>", "Use another registry. Also reads PLUM_REGISTRY."],
]

export default function CliPage() {
  return (
    <DocsPage
      toc={[
        { id: "commands", title: "Commands" },
        { id: "options", title: "Options" },
        { id: "registry", title: "Registry" },
        { id: "self-hosting", title: "Self-hosting", level: 3 },
        { id: "compatibility", title: "Compatibility" },
        { id: "shadcn", title: "shadcn CLI", level: 3 },
      ]}
      prev={{ title: "Motion", href: "/docs/motion" }}
      next={{ title: "Button", href: "/docs/components/button" }}
    >
      <DocsHeader
        title="CLI & Registry"
        description="plumui is a zero-dependency CLI that copies components into your project. It reads a plain JSON registry you can host anywhere."
      />

      <CodeBlock lang="bash" code="npx plumui@latest --help" />

      <H2 id="commands">Commands</H2>
      <div className="my-4 divide-y rounded-xl border">
        {commands.map(([cmd, desc]) => (
          <div key={cmd} className="flex flex-col gap-1 p-4 sm:flex-row sm:gap-6">
            <code className="w-36 shrink-0 font-mono text-[13px] font-medium text-brand">{cmd}</code>
            <p className="text-sm leading-6 text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
      <CodeBlock
        lang="bash"
        code={`npx plumui add combobox
# ◆ Resolving combobox
# │ also needs popover, command
# │ + src/components/ui/combobox.tsx
# │ + src/components/ui/popover.tsx
# │ + src/components/ui/command.tsx
# ✓ Added 3 files`}
      />

      <H2 id="options">Options</H2>
      <div className="my-4 divide-y rounded-xl border">
        {flags.map(([flag, desc]) => (
          <div key={flag} className="flex flex-col gap-1 p-4 sm:flex-row sm:gap-6">
            <code className="w-36 shrink-0 font-mono text-[13px] font-medium">{flag}</code>
            <p className="text-sm leading-6 text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      <H2 id="registry">Registry</H2>
      <P>
        Each component is one JSON file listing its npm packages, the other items it needs and its source. The index
        lives at <Code>/registry/index.json</Code>.
      </P>
      <CodeBlock
        lang="json"
        title={plumRegistryUrl("switch").replace(siteConfig.url, "")}
        code={`{
  "$schema": "${siteConfig.url}/schema/registry-item.json",
  "name": "switch",
  "type": "ui",
  "category": "Inputs",
  "dependencies": ["class-variance-authority", "radix-ui"],
  "registryDependencies": ["utils"],
  "files": [
    { "path": "ui/switch.tsx", "type": "ui", "content": "…" }
  ]
}`}
      />
      <P>
        The registry is generated from the source of this site by <Code>scripts/build-registry.mjs</Code>, so what you
        read in the docs is exactly what lands in your project.
      </P>

      <H3 id="self-hosting">Self-hosting</H3>
      <P>
        Fork the repo, change a component, deploy. Point the CLI at your copy and your whole team installs your
        flavour of Plum UI:
      </P>
      <CodeBlock lang="bash" code={`PLUM_REGISTRY=https://ui.acme.dev/registry npx plumui add button`} />

      <H2 id="compatibility">Compatibility</H2>
      <P>
        Plum UI stands on its own, but plays nicely with what you already have. Token names (<Code>--primary</Code>,{" "}
        <Code>--muted-foreground</Code>…) and file layout follow the conventions most Tailwind kits share, so existing
        components pick up the Plum theme without changes.
      </P>
      <H3 id="shadcn">shadcn CLI</H3>
      <P>Every item is also published in the shadcn registry format, so teams on that CLI can install Plum components too:</P>
      <CodeBlock lang="bash" code={`npx shadcn@latest add ${registryUrl("dialog")}`} />
      <Callout title="Same source">
        Both registries are generated from the same files. Use whichever CLI your project already runs.
      </Callout>
    </DocsPage>
  )
}
