"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Playground } from "@/components/site/playground"

export default function CardPlayground() {
  return (
    <Playground
      controls={{
        interactive: { type: "boolean", default: true },
        action: { type: "boolean", default: true },
        footer: { type: "boolean", default: true },
        dividers: { type: "boolean", default: false },
        title: { type: "text", default: "Usage alerts" },
      }}
      render={({ interactive, action, footer, dividers, title }) => (
        <Card interactive={interactive} className="w-full max-w-sm">
          <CardHeader className={dividers ? "border-b" : undefined}>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Get notified before you hit your limits.</CardDescription>
            {action && (
              <CardAction>
                <Badge variant="brand">Pro</Badge>
              </CardAction>
            )}
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">We will email you at 80% and 100% of your monthly quota.</CardContent>
          {footer && (
            <CardFooter className={`gap-2 ${dividers ? "border-t" : ""}`}>
              <Button size="sm" variant="outline">
                Dismiss
              </Button>
              <Button size="sm">Enable</Button>
            </CardFooter>
          )}
        </Card>
      )}
      code={({ interactive, action, footer, dividers, title }) => `<Card${interactive ? " interactive" : ""}>
  <CardHeader${dividers ? ' className="border-b"' : ""}>
    <CardTitle>${title}</CardTitle>
    <CardDescription>Get notified before you hit your limits.</CardDescription>${action ? `\n    <CardAction><Badge variant="brand">Pro</Badge></CardAction>` : ""}
  </CardHeader>
  <CardContent>…</CardContent>${footer ? `\n  <CardFooter${dividers ? ' className="border-t"' : ""}>\n    <Button size="sm">Enable</Button>\n  </CardFooter>` : ""}
</Card>`}
    />
  )
}
