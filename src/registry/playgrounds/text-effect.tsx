"use client"

import { TextEffect } from "@/components/ui/text-effect"
import { Playground, jsxProps } from "@/components/site/playground"

export default function TextEffectPlayground() {
  return (
    <Playground
      controls={{
        text: { type: "text", default: "Interfaces that feel alive" },
        per: { type: "select", options: ["word", "char", "line"], default: "word" },
        preset: { type: "select", options: ["fade", "blur", "slide", "scale"], default: "blur" },
        stagger: { type: "number", default: 0.08, min: 0.01, max: 0.3, step: 0.01 },
        delay: { type: "number", default: 0, min: 0, max: 1, step: 0.05 },
      }}
      // la key rejoue l'anim à chaque modif de prop
      render={({ text, ...p }) => (
        <TextEffect key={JSON.stringify(p) + text} as="h3" className="text-center text-3xl font-semibold tracking-tight" {...p}>
          {text}
        </TextEffect>
      )}
      code={({ text, ...p }) => `import { TextEffect } from "@/components/ui/text-effect"

<TextEffect${jsxProps(p, { per: "word", preset: "blur", stagger: 0.08, delay: 0 })}>
  ${text}
</TextEffect>`}
    />
  )
}
