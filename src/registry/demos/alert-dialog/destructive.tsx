"use client"

import * as React from "react"
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
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"

const PROJECT = "acme-web"

export default function AlertDialogDestructive() {
  const [value, setValue] = React.useState("")

  return (
    <AlertDialog onOpenChange={() => setValue("")}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 /> Delete project
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {PROJECT}?</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently removes the project, its 128 deployments and all environment variables. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted-foreground">
            Type <span className="font-mono font-medium text-foreground">{PROJECT}</span> to confirm
          </span>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            aria-invalid={value.length > 0 && !PROJECT.startsWith(value)}
            className="font-mono"
            />
        </label>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" disabled={value !== PROJECT}>
            Delete forever
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
