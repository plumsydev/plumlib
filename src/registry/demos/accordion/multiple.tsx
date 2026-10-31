"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  { q: "How does billing work?", a: "You're billed monthly per active seat. Seats added mid-cycle are prorated to the day." },
  { q: "Can I change plans later?", a: "Upgrade or downgrade anytime from Settings → Billing. Changes apply immediately." },
  { q: "Do you offer refunds?", a: "Annual plans can be refunded within 30 days, no questions asked." },
]

export default function AccordionMultiple() {
  return (
    <Accordion type="multiple" defaultValue={["0", "1"]} className="w-full max-w-md">
      {faqs.map((f, i) => (
        <AccordionItem key={f.q} value={String(i)}>
          <AccordionTrigger>{f.q}</AccordionTrigger>
          <AccordionContent>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
