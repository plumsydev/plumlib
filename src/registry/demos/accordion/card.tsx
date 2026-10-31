"use client"

import { CreditCard, KeyRound, ShieldCheck } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const items = [
  { icon: ShieldCheck, title: "Two-factor authentication", body: "Require a TOTP code or passkey on every new sign-in." },
  { icon: KeyRound, title: "API tokens", body: "Scoped tokens expire after 90 days by default. Rotate them from the CLI." },
  { icon: CreditCard, title: "Payment methods", body: "Cards are stored by our payment processor, never on our servers." },
]

export default function AccordionCard() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-md rounded-xl border bg-card px-4 shadow-xs">
      {items.map(({ icon: Icon, title, body }) => (
        <AccordionItem key={title} value={title}>
          <AccordionTrigger className="items-center">
            <span className="flex items-center gap-3">
              <span className="flex size-7 items-center justify-center rounded-md border bg-background">
                <Icon className="size-3.5" />
              </span>
              {title}
            </span>
          </AccordionTrigger>
          <AccordionContent className="pl-10">{body}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
