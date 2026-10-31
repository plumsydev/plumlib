"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/ui/magnetic"

export default function MagneticDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <Magnetic>
        <Button size="lg" className="rounded-full">
          Start building <ArrowRight />
        </Button>
      </Magnetic>
      <Magnetic strength={0.25}>
        <Button size="lg" variant="outline" className="rounded-full">
          Talk to sales
        </Button>
      </Magnetic>
    </div>
  )
}
