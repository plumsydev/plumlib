"use client"

import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Playground } from "@/components/site/playground"

export default function AlertDialogPlayground() {
  return (
    <Playground
      controls={{
        variant: { type: "select", options: ["default", "destructive", "brand"], default: "destructive" },
        media: { type: "boolean", default: true },
        title: { type: "text", default: "Delete 3 deployments?" },
        action: { type: "text", default: "Delete" },
      }}
      render={({ variant, media, title, action }) => (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Open alert</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              {media && (
                <AlertDialogMedia variant={variant === "destructive" ? "destructive" : "default"}>
                  <Trash2 />
                </AlertDialogMedia>
              )}
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant={variant}>{action}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      code={({ variant, media, title, action }) => `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Open alert</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>${
      media
        ? `
      <AlertDialogMedia${variant === "destructive" ? ' variant="destructive"' : ""}>
        <Trash2 />
      </AlertDialogMedia>`
        : ""
    }
      <AlertDialogTitle>${title}</AlertDialogTitle>
      <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction${variant !== "default" ? ` variant="${variant}"` : ""}>${action}</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
    />
  )
}
