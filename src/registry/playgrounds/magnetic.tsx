"use client"

import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/ui/magnetic"
import { Playground, jsxProps } from "@/components/site/playground"

export default function MagneticPlayground() {
  return (
    <Playground
      controls={{
        strength: { type: "number", default: 0.35, min: 0, max: 1, step: 0.05 },
        range: { type: "number", default: 80, min: 10, max: 200, step: 5 },
        disabled: { type: "boolean", default: false },
      }}
      render={(p) => (
        <Magnetic {...p}>
          <Button size="lg" className="rounded-full">Hover near me</Button>
        </Magnetic>
      )}
      code={(p) => `import { Magnetic } from "@/components/ui/magnetic"

<Magnetic${jsxProps(p, { strength: 0.35, range: 80 })}>
  <Button>Hover near me</Button>
</Magnetic>`}
    />
  )
}
