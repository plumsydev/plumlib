import type { Metadata } from "next"
import { CodeBlock } from "@/components/site/code-block"
import { Callout, Code, DocsHeader, DocsPage, H2, P, Step, Steps } from "@/components/site/prose"
import { readSource } from "@/lib/source"
import { registryUrl, siteConfig } from "@/lib/site"

export const metadata: Metadata = { title: "Installation" }

export default async function InstallationPage() {
  const [theme, utils, motion] = await Promise.all([
    readSource("styles", "plum.css"),
    readSource("lib", "utils.ts"),
    readSource("lib", "motion.ts"),
  ])

  return (
    <DocsPage
      toc={[
        { id: "with-the-cli", title: "With the CLI" },
        { id: "manual", title: "Manual setup" },
        { id: "fonts", title: "Fonts" },
      ]}
      prev={{ title: "Introduction", href: "/docs" }}
      next={{ title: "Theming", href: "/docs/theming" }}
    >
      <DocsHeader
        title="Installation"
        description="Set up Plum UI in a React 19 + Tailwind CSS v4 project. Takes about two minutes."
      />

      <H2 id="with-the-cli">With the CLI</H2>
      <P>Plum UI ships a shadcn-compatible registry, so the official shadcn CLI does all the work.</P>
      <Steps>
        <Step title="Create a project">
          <CodeBlock lang="bash" code="npx create-next-app@latest my-app --ts --tailwind --app" />
        </Step>
        <Step title="Initialize shadcn">
          <P>This creates <Code>components.json</Code>, the <Code>cn()</Code> helper and the base CSS variables.</P>
          <CodeBlock lang="bash" code="npx shadcn@latest init" />
        </Step>
        <Step title="Register the Plum namespace">
          <P>Add the registry to <Code>components.json</Code> so you can use short names.</P>
          <CodeBlock
            lang="json"
            title="components.json"
            code={`{
  "registries": {
    "@plum": "${siteConfig.url}/r/{name}.json"
  }
}`}
          />
        </Step>
        <Step title="Add the theme and components">
          <CodeBlock lang="bash" code={`npx shadcn@latest add @plum/theme @plum/button @plum/dialog`} />
          <P className="text-sm text-muted-foreground">
            Or with a full URL, no config needed: <Code>npx shadcn@latest add {registryUrl("button")}</Code>
          </P>
        </Step>
      </Steps>

      <H2 id="manual">Manual setup</H2>
      <Steps>
        <Step title="Install the base dependencies">
          <CodeBlock lang="bash" code="pnpm add clsx tailwind-merge class-variance-authority radix-ui motion lucide-react" />
        </Step>
        <Step title="Add the cn() helper">
          <CodeBlock code={utils} title="lib/utils.ts" lang="ts" />
        </Step>
        <Step title="Add the shared springs">
          <P>Components that use Motion import their spring presets from here, so everything moves with the same feel.</P>
          <CodeBlock code={motion} title="lib/motion.ts" lang="ts" />
        </Step>
        <Step title="Add the theme">
          <P>
            Import it right after Tailwind in your global stylesheet. It contains tokens, dark mode, easings and the
            animation utilities (<Code>pl-pop</Code>, <Code>pl-dialog</Code>, <Code>pl-slide</Code>…).
          </P>
          <CodeBlock code={`@import "tailwindcss";\n@import "./plum.css";`} lang="css" title="app/globals.css" />
          <div className="mt-3">
            <CodeBlock code={theme} lang="css" title="app/plum.css" collapsible />
          </div>
        </Step>
        <Step title="Copy any component">
          <P>Every component page has a Manual tab with the full source. Drop it into <Code>components/ui</Code>.</P>
        </Step>
      </Steps>

      <H2 id="fonts">Fonts</H2>
      <P>
        Plum UI is designed around <strong className="font-medium">Geist</strong> and <strong className="font-medium">Geist Mono</strong>,
        but any neutral grotesk works. With Next.js:
      </P>
      <CodeBlock
        title="app/layout.tsx"
        code={`import { Geist, Geist_Mono } from "next/font/google"

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={\`\${sans.variable} \${mono.variable} font-sans\`}>{children}</body>
    </html>
  )
}`}
      />
      <Callout title="Toasts and tooltips">
        Mount <code>&lt;Toaster /&gt;</code> and wrap your app in <code>&lt;TooltipProvider&gt;</code> once, at the root.
      </Callout>
    </DocsPage>
  )
}
