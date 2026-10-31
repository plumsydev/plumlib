import type { Metadata } from "next"
import { CodeBlock } from "@/components/site/code-block"
import { Callout, Code, DocsHeader, DocsPage, H2, H3, P, Step, Steps } from "@/components/site/prose"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { readSource } from "@/lib/source"

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
        { id: "requirements", title: "Requirements" },
        { id: "with-the-cli", title: "With the CLI" },
        { id: "providers", title: "Providers" },
        { id: "manual", title: "Manual setup" },
        { id: "vite", title: "Vite", level: 3 },
        { id: "fonts", title: "Fonts" },
      ]}
      prev={{ title: "Introduction", href: "/docs" }}
      next={{ title: "Theming", href: "/docs/theming" }}
    >
      <DocsHeader
        title="Installation"
        description="One command sets everything up. No config files to write, no other UI kit required."
      />

      <H2 id="requirements">Requirements</H2>
      <P>
        React 19 and Tailwind CSS v4. That&apos;s it — Plum UI works with Next.js, Vite, React Router, Astro and
        TanStack Start.
      </P>

      <H2 id="with-the-cli">With the CLI</H2>
      <Steps>
        <Step title="Create a project">
          <Tabs defaultValue="next">
            <TabsList variant="underline">
              <TabsTrigger value="next">Next.js</TabsTrigger>
              <TabsTrigger value="vite">Vite</TabsTrigger>
            </TabsList>
            <TabsContent value="next">
              <CodeBlock lang="bash" code="npx create-next-app@latest my-app --ts --tailwind --app --src-dir" />
            </TabsContent>
            <TabsContent value="vite">
              <CodeBlock lang="bash" code={`npm create vite@latest my-app -- --template react-ts\ncd my-app && npm install tailwindcss @tailwindcss/vite`} />
              <P className="text-sm text-muted-foreground">
                Then follow the <a href="#vite" className="underline underline-offset-4">Vite notes</a> below for the
                Tailwind plugin and the <Code>@/</Code> alias.
              </P>
            </TabsContent>
          </Tabs>
        </Step>
        <Step title="Initialize Plum UI">
          <CodeBlock lang="bash" code="npx plumui init" />
          <P>
            The CLI detects your package manager, your import alias and your global stylesheet, then writes{" "}
            <Code>plum.json</Code>, the <Code>cn()</Code> helper, the shared spring presets and the theme, and links
            the theme right after your Tailwind import.
          </P>
          <CodeBlock
            lang="json"
            title="plum.json"
            code={`{
  "registry": "https://ui.plumsy.dev/registry",
  "paths": {
    "ui": "src/components/ui",
    "lib": "src/lib",
    "css": "src/app/globals.css"
  },
  "aliases": {
    "ui": "@/components/ui",
    "lib": "@/lib"
  }
}`}
          />
        </Step>
        <Step title="Add components">
          <CodeBlock lang="bash" code="npx plumui add button dialog toast" />
          <P>Dependencies between components are resolved for you: adding a dialog also brings the button it uses.</P>
        </Step>
        <Step title="Use them">
          <CodeBlock
            code={`import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button variant="brand">Ship it</Button>
}`}
          />
        </Step>
      </Steps>

      <H2 id="providers">Providers</H2>
      <P>
        Mount the toaster once, share one tooltip delay across the app, and let Motion follow the user&apos;s reduced
        motion setting.
      </P>
      <CodeBlock
        title="app/layout.tsx"
        code={`import { MotionConfig } from "motion/react"
import { Toaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MotionConfig reducedMotion="user">
          <TooltipProvider delayDuration={300}>
            {children}
            <Toaster />
          </TooltipProvider>
        </MotionConfig>
      </body>
    </html>
  )
}`}
      />
      <Callout title="Drawer">
        For the drawer to push the page back, wrap your app in <code>&lt;div vaul-drawer-wrapper=&quot;&quot; className=&quot;bg-background&quot;&gt;</code>.
      </Callout>

      <H2 id="manual">Manual setup</H2>
      <Steps>
        <Step title="Install the base dependencies">
          <CodeBlock lang="bash" code="npm install clsx tailwind-merge class-variance-authority radix-ui motion lucide-react" />
        </Step>
        <Step title="Add the cn() helper">
          <CodeBlock code={utils} title="lib/utils.ts" lang="ts" />
        </Step>
        <Step title="Add the shared springs">
          <CodeBlock code={motion} title="lib/motion.ts" lang="ts" />
        </Step>
        <Step title="Add the theme">
          <P>
            Import it right after Tailwind. It holds the tokens, dark mode, easings and the animation utilities (
            <Code>pl-pop</Code>, <Code>pl-dialog</Code>, <Code>pl-slide</Code>…).
          </P>
          <CodeBlock code={`@import "tailwindcss";\n@import "./plum.css";`} lang="css" title="app/globals.css" />
          <div className="mt-3">
            <CodeBlock code={theme} lang="css" title="app/plum.css" collapsible />
          </div>
        </Step>
        <Step title="Copy any component">
          <P>Every component page has a Manual tab with the full source.</P>
        </Step>
      </Steps>

      <H3 id="vite">Vite</H3>
      <P>Add the Tailwind plugin and an <Code>@/</Code> alias so imports resolve:</P>
      <CodeBlock
        lang="ts"
        title="vite.config.ts"
        code={`import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
})`}
      />
      <div className="mt-3">
        <CodeBlock
          lang="json"
          title="tsconfig.json"
          code={`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}`}
        />
      </div>

      <H2 id="fonts">Fonts</H2>
      <P>
        Designed around <strong className="font-medium">Geist</strong> and <strong className="font-medium">Geist Mono</strong>,
        but any neutral grotesk works.
      </P>
      <CodeBlock
        title="app/layout.tsx"
        code={`import { Geist, Geist_Mono } from "next/font/google"

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

// <body className={\`\${sans.variable} \${mono.variable} font-sans\`}>`}
      />
    </DocsPage>
  )
}
