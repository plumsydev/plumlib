import type { Metadata } from "next"
import { CodeBlock } from "@/components/site/code-block"
import { Code, DocsHeader, DocsPage, H2, P } from "@/components/site/prose"
import { EasingDemo } from "@/components/site/easing-demo"

export const metadata: Metadata = { title: "Motion" }

const utilities = [
  ["pl-pop", "Menus, popovers, tooltips, hover cards. Scales from the trigger with a 4px nudge away from it."],
  ["pl-overlay", "Fades backdrops in and out."],
  ["pl-dialog", "Centered modals: rises, unblurs and scales into place."],
  ["pl-slide", "Sheets. Set data-side to top, right, bottom or left."],
  ["pl-collapse", "Accordion and collapsible content, animating to the measured height."],
]

export default function MotionPage() {
  return (
    <DocsPage
      toc={[
        { id: "principles", title: "Principles" },
        { id: "curves", title: "Curves" },
        { id: "utilities", title: "CSS utilities" },
        { id: "springs", title: "Springs" },
        { id: "reduced-motion", title: "Reduced motion" },
      ]}
      prev={{ title: "Theming", href: "/docs/theming" }}
      next={{ title: "CLI & Registry", href: "/docs/cli" }}
    >
      <DocsHeader
        title="Motion"
        description="A small, opinionated motion system: two kinds of curves, five CSS utilities and four spring presets. That's all you need."
      />

      <H2 id="principles">Principles</H2>
      <ul className="my-4 list-disc space-y-2 pl-5 leading-7 text-foreground/85 marker:text-muted-foreground">
        <li><strong className="font-medium text-foreground">Fast in, faster out.</strong> Entrances take 200–400ms, exits half that. Nobody waits for a menu to leave.</li>
        <li><strong className="font-medium text-foreground">Origin matters.</strong> Popovers grow from their trigger, sheets come from their edge, toasts from their corner.</li>
        <li><strong className="font-medium text-foreground">Springs for direct manipulation.</strong> Anything that follows a pointer or swaps position uses a spring so it can be interrupted mid-flight.</li>
        <li><strong className="font-medium text-foreground">CSS when possible.</strong> Radix exposes <Code>data-state</Code>; keyframes do the rest with zero JavaScript.</li>
      </ul>

      <H2 id="curves">Curves</H2>
      <P>Hit play. The difference between linear and expo is the difference between &ldquo;works&rdquo; and &ldquo;feels good&rdquo;.</P>
      <EasingDemo />
      <CodeBlock
        lang="css"
        code={`--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
--ease-in-quart: cubic-bezier(0.5, 0, 0.75, 0);
--ease-spring: linear(0, 0.009, 0.035 2.1%, 0.141 4.4%, …, 1);`}
      />
      <P>They&apos;re regular Tailwind utilities: <Code>ease-out-expo</Code>, <Code>ease-spring</Code>…</P>

      <H2 id="utilities">CSS utilities</H2>
      <P>Drop these on any Radix content element. They read <Code>data-state</Code> and <Code>data-side</Code> and handle enter and exit.</P>
      <div className="my-4 divide-y rounded-xl border">
        {utilities.map(([name, desc]) => (
          <div key={name} className="flex flex-col gap-1 p-4 sm:flex-row sm:gap-6">
            <code className="w-28 shrink-0 font-mono text-[13px] font-medium text-brand">{name}</code>
            <p className="text-sm leading-6 text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
      <CodeBlock
        code={`<PopoverPrimitive.Content
  className="pl-pop origin-(--radix-popover-content-transform-origin) …"
/>`}
      />

      <H2 id="springs">Springs</H2>
      <P>
        Components that use Motion import shared presets from <Code>lib/motion.ts</Code>. Tune them once, and the
        whole library follows.
      </P>
      <CodeBlock
        code={`import { motion } from "motion/react"
import { spring } from "@/lib/motion"

<motion.span layoutId="indicator" transition={spring.snappy} />`}
      />

      <H2 id="reduced-motion">Reduced motion</H2>
      <P>
        The theme collapses every CSS animation and transition when the user asks for reduced motion. For Motion
        components, wrap your app in <Code>MotionConfig</Code> to do the same:
      </P>
      <CodeBlock
        code={`import { MotionConfig } from "motion/react"

<MotionConfig reducedMotion="user">{children}</MotionConfig>`}
      />
    </DocsPage>
  )
}
