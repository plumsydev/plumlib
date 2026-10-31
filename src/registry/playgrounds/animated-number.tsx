"use client"

import { AnimatedNumber } from "@/components/ui/animated-number"
import { Playground } from "@/components/site/playground"

const formats = {
  number: {},
  currency: { style: "currency", currency: "EUR" },
  percent: { style: "percent", maximumFractionDigits: 1 },
  compact: { notation: "compact", maximumFractionDigits: 1 },
} as const

export default function AnimatedNumberPlayground() {
  return (
    <Playground
      controls={{
        value: { type: "number", default: 1284, min: -5000, max: 50000, step: 7 },
        format: { type: "select", options: ["number", "currency", "percent", "compact"], default: "number" },
        locale: { type: "select", options: ["en-US", "fr-FR", "de-DE", "ja-JP"], default: "en-US" },
      }}
      render={({ value, format, locale }) => (
        <AnimatedNumber
          value={format === "percent" ? value / 10000 : value}
          format={formats[format]}
          locales={locale}
          className="text-5xl font-semibold tracking-tight"
        />
      )}
      code={({ value, format, locale }) =>
        `<AnimatedNumber value={${format === "percent" ? value / 10000 : value}}${format === "number" ? "" : ` format={${JSON.stringify(formats[format]).replace(/"(\w+)":/g, "$1: ")}}`}${locale === "en-US" ? "" : ` locales="${locale}"`} />`
      }
    />
  )
}
