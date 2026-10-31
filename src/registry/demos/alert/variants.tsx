"use client"

import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AlertVariants() {
  return (
    <div className="grid w-full max-w-md gap-3">
      <Alert variant="success">
        <CheckCircle2 />
        <AlertTitle>Domain verified</AlertTitle>
        <AlertDescription>acme.com is now serving traffic over HTTPS.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <Info />
        <AlertTitle>Scheduled maintenance</AlertTitle>
        <AlertDescription>Sunday 02:00–02:30 UTC. No downtime expected.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTriangle />
        <AlertTitle>Approaching usage limit</AlertTitle>
        <AlertDescription>You&apos;ve used 86% of your bandwidth this month.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <XCircle />
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>Update your card to keep your projects online.</AlertDescription>
      </Alert>
    </div>
  )
}
