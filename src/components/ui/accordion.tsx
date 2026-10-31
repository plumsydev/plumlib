"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { ChevronDown } from "lucide-react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { easeOutExpo } from "@/lib/motion"

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium",
          "outline-none transition-colors duration-200 hover:text-foreground/80 focus-visible:ring-[3px] focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown
          aria-hidden
          className="pointer-events-none mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-400 ease-out-expo group-data-[state=open]:rotate-180 group-hover:text-foreground"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content data-slot="accordion-content" className="pl-collapse text-sm" {...props}>
      {/* le contenu arrive en léger flou pdt que la hauteur s'ouvre, ça fait tt de suite plus cher */}
      <motion.div
        initial={{ opacity: 0, y: -4, filter: "blur(3px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.4, ease: easeOutExpo }}
        className={cn("pb-4 text-muted-foreground", className)}
      >
        {children}
      </motion.div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
