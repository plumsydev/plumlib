"use client"

import { ArrowUpRight } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CardInteractive() {
  return (
    <a href="#" className="group block w-full max-w-sm rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring">
      <Card interactive>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Analytics
            <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
          </CardTitle>
          <CardDescription>Privacy-friendly insights, no cookie banner required.</CardDescription>
        </CardHeader>
      </Card>
    </a>
  )
}
