"use client"

import { AlertTriangle, CheckCircle2, Info, Terminal, XCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Playground, jsxProps } from "@/components/site/playground"

const icons = { default: Terminal, destructive: XCircle, success: CheckCircle2, warning: AlertTriangle, info: Info }
const iconNames = { default: "Terminal", destructive: "XCircle", success: "CheckCircle2", warning: "AlertTriangle", info: "Info" }

export default function AlertPlayground() {
  return (
    <Playground
      controls={{
        variant: { type: "select", options: ["default", "destructive", "success", "warning", "info"], default: "default" },
        title: { type: "text", default: "Heads up" },
        description: { type: "text", default: "Your API key expires in 3 days." },
        icon: { type: "boolean", default: true },
      }}
      render={({ variant, title, description, icon }) => {
        const Icon = icons[variant]
        return (
          <Alert variant={variant} className="max-w-md">
            {icon && <Icon />}
            <AlertTitle>{title}</AlertTitle>
            {description && <AlertDescription>{description}</AlertDescription>}
          </Alert>
        )
      }}
      code={({ variant, title, description, icon }) => `<Alert${jsxProps({ variant }, { variant: "default" })}>
${icon ? `  <${iconNames[variant]} />\n` : ""}  <AlertTitle>${title}</AlertTitle>
  <AlertDescription>${description}</AlertDescription>
</Alert>`}
    />
  )
}
