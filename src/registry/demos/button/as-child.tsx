"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ButtonAsChild() {
  return (
    <Button asChild variant="outline">
      <Link href="/docs">Read the docs</Link>
    </Button>
  )
}
