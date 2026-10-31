"use client"

import { Terminal } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AlertDemo() {
  return (
    <Alert className="max-w-md">
      <Terminal />
      <AlertTitle>New CLI version available</AlertTitle>
      <AlertDescription>Run `pnpm dlx plum@latest` to get faster installs and the new diff command.</AlertDescription>
    </Alert>
  )
}
