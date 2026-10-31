"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>
        Get started <ArrowRight />
      </Button>
      <Button variant="outline">Documentation</Button>
    </div>
  )
}
