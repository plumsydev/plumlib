"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function AccordionDemo() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1" className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It follows the WAI-ARIA accordion pattern, with full keyboard support and proper focus management.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can I restyle it?</AccordionTrigger>
        <AccordionContent>
          Every part is a plain component in your codebase. Change the classes, swap the icon, it&apos;s yours.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Does it respect reduced motion?</AccordionTrigger>
        <AccordionContent>
          Animations collapse to an instant transition when the user prefers reduced motion.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
