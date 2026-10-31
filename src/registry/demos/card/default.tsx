"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Production deploy</CardTitle>
        <CardDescription>main · 4f2c91a · 2 minutes ago</CardDescription>
        <CardAction>
          <Badge variant="success" dot>Ready</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-muted-foreground">Build</div>
          <div className="font-medium tabular-nums">38s</div>
        </div>
        <div>
          <div className="text-muted-foreground">Region</div>
          <div className="font-medium">cdg1</div>
        </div>
        <div>
          <div className="text-muted-foreground">Size</div>
          <div className="font-medium tabular-nums">412 kB</div>
        </div>
      </CardContent>
      <CardFooter className="gap-2 border-t">
        <Button size="sm" variant="outline" className="flex-1">Logs</Button>
        <Button size="sm" className="flex-1">Visit</Button>
      </CardFooter>
    </Card>
  )
}
