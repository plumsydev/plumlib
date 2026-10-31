"use client"

import { Marquee } from "@/components/ui/marquee"
import { Playground, jsxProps } from "@/components/site/playground"

const words = ["Northwind", "Acme", "Globex", "Initech", "Hooli", "Umbrella"]

export default function MarqueePlayground() {
  return (
    <Playground
      controls={{
        speed: { type: "number", default: 40, min: 5, max: 200, step: 5 },
        reverse: { type: "boolean", default: false },
        vertical: { type: "boolean", default: false },
        pauseOnHover: { type: "boolean", default: true },
        fade: { type: "boolean", default: true },
      }}
      render={(p) => (
        <Marquee key={String(p.vertical)} {...p} className={p.vertical ? "h-56 [--gap:1.25rem]" : "w-full [--gap:2.5rem]"}>
          {words.map((w) => (
            <span key={w} className="text-lg font-semibold tracking-tight text-foreground/60">{w}</span>
          ))}
        </Marquee>
      )}
      code={(p) => `import { Marquee } from "@/components/ui/marquee"

<Marquee${jsxProps(p, { speed: 40, pauseOnHover: true, fade: true })}${p.pauseOnHover ? "" : " pauseOnHover={false}"}${p.fade ? "" : " fade={false}"}>
  <span>Northwind</span>
  <span>Acme</span>
  …
</Marquee>`}
    />
  )
}
