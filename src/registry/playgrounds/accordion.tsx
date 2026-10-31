"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Playground } from "@/components/site/playground"

const items = [
  ["Can I change plans later?", "Yes, upgrades apply immediately and downgrades at the end of the cycle."],
  ["Do you offer a free tier?", "Hobby projects are free forever, with generous limits."],
  ["Where is my data stored?", "In the region you pick when creating the project. EU and US are available."],
]

export default function AccordionPlayground() {
  return (
    <Playground
      controls={{
        type: { type: "select", options: ["single", "multiple"], default: "single" },
        collapsible: { type: "boolean", default: true },
        disabledLast: { type: "boolean", default: false, label: "disable last" },
      }}
      render={({ type, collapsible, disabledLast }) => {
        const body = items.map(([q, a], i) => (
          <AccordionItem key={q} value={`item-${i}`} disabled={disabledLast && i === items.length - 1}>
            <AccordionTrigger>{q}</AccordionTrigger>
            <AccordionContent>{a}</AccordionContent>
          </AccordionItem>
        ))
        return type === "single" ? (
          <Accordion key="single" type="single" collapsible={collapsible} defaultValue="item-0" className="w-full max-w-sm">
            {body}
          </Accordion>
        ) : (
          <Accordion key="multiple" type="multiple" defaultValue={["item-0"]} className="w-full max-w-sm">
            {body}
          </Accordion>
        )
      }}
      code={({ type, collapsible, disabledLast }) => `<Accordion type="${type}"${type === "single" && collapsible ? " collapsible" : ""}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Can I change plans later?</AccordionTrigger>
    <AccordionContent>Yes, upgrades apply immediately.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3"${disabledLast ? " disabled" : ""}>…</AccordionItem>
</Accordion>`}
    />
  )
}
