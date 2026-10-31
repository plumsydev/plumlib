import type { Metadata } from "next"
import { CodeBlock } from "@/components/site/code-block"
import { Callout, Code, DocsHeader, DocsPage, H2, P } from "@/components/site/prose"
import { ThemePlayground } from "@/components/site/theme-playground"

export const metadata: Metadata = { title: "Theming" }

const tokens: { group: string; items: [string, string][] }[] = [
  {
    group: "Surfaces",
    items: [
      ["background", "Page background"],
      ["card", "Raised surfaces"],
      ["popover", "Menus, popovers, dialogs"],
      ["muted", "Subtle fills"],
      ["accent", "Hover and highlight"],
    ],
  },
  {
    group: "Actions",
    items: [
      ["primary", "Main buttons, selected states"],
      ["secondary", "Secondary buttons"],
      ["brand", "Your accent color, used sparingly"],
      ["destructive", "Dangerous actions"],
    ],
  },
  {
    group: "Status",
    items: [
      ["success", "Positive outcomes"],
      ["warning", "Needs attention"],
      ["info", "Neutral information"],
    ],
  },
  {
    group: "Lines",
    items: [
      ["border", "Dividers and outlines"],
      ["input", "Form control borders"],
      ["ring", "Focus rings"],
    ],
  },
]

export default function ThemingPage() {
  return (
    <DocsPage
      toc={[
        { id: "playground", title: "Playground" },
        { id: "tokens", title: "Tokens" },
        { id: "dark-mode", title: "Dark mode" },
        { id: "adding-tokens", title: "Adding tokens" },
      ]}
      prev={{ title: "Installation", href: "/docs/installation" }}
      next={{ title: "Motion", href: "/docs/motion" }}
    >
      <DocsHeader
        title="Theming"
        description="Everything is driven by CSS variables in OKLCH. Same token names as shadcn/ui, plus brand, status colors and motion curves."
      />

      <H2 id="playground">Playground</H2>
      <P>Pick a hue and a radius, then copy the variables into your theme file.</P>
      <ThemePlayground />

      <H2 id="tokens">Tokens</H2>
      <P>
        Each token comes in pairs where it makes sense: <Code>--primary</Code> is the fill,{" "}
        <Code>--primary-foreground</Code> is the text that sits on it. Tailwind utilities like <Code>bg-primary</Code>{" "}
        and <Code>text-muted-foreground</Code> map to them automatically.
      </P>
      <div className="space-y-6">
        {tokens.map((g) => (
          <div key={g.group}>
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">{g.group}</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {g.items.map(([name, desc]) => (
                <div key={name} className="flex items-center gap-3 rounded-lg border p-2.5">
                  <span
                    className="size-9 shrink-0 rounded-md border shadow-xs"
                    style={{ background: `var(--${name})` }}
                  />
                  <div className="min-w-0">
                    <code className="font-mono text-[13px] font-medium">--{name}</code>
                    <p className="truncate text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <H2 id="dark-mode">Dark mode</H2>
      <P>
        Dark tokens live under a <Code>.dark</Code> class. Use <Code>next-themes</Code> (or anything that toggles the
        class on <Code>html</Code>):
      </P>
      <CodeBlock lang="bash" code="pnpm add next-themes" />
      <div className="mt-3">
        <CodeBlock
          title="components/theme-provider.tsx"
          code={`"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  )
}`}
        />
      </div>
      <Callout title="Tip">
        Dark surfaces use lightness steps instead of shadows: <code>background</code> → <code>card</code> →{" "}
        <code>popover</code> each get a touch brighter, and borders are translucent white so they adapt to any surface.
      </Callout>

      <H2 id="adding-tokens">Adding tokens</H2>
      <P>Declare the variable for both themes, then expose it to Tailwind with <Code>@theme inline</Code>.</P>
      <CodeBlock
        lang="css"
        code={`:root { --highlight: oklch(0.9 0.12 95); }
.dark { --highlight: oklch(0.4 0.1 95); }

@theme inline {
  --color-highlight: var(--highlight);
}

/* bg-highlight, text-highlight, border-highlight… are now available */`}
      />
    </DocsPage>
  )
}
