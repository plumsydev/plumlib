"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/toast"

export default function AlertDialogAsync() {
  const [open, setOpen] = React.useState(false)
  const [pending, setPending] = React.useState(false)

  // pas d'AlertDialogAction ici : elle fermerait direct, on veut attendre la requête
  const rollback = async () => {
    setPending(true)
    await new Promise((r) => setTimeout(r, 1600))
    setPending(false)
    setOpen(false)
    toast.success("Rolled back to 9c1e0d4", { description: "Production is serving the previous build." })
  }

  return (
    <AlertDialog open={open} onOpenChange={(v) => !pending && setOpen(v)}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <RotateCcw /> Roll back
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia variant="warning">
            <RotateCcw />
          </AlertDialogMedia>
          <AlertDialogTitle>Roll back production?</AlertDialogTitle>
          <AlertDialogDescription>
            Traffic moves to build 9c1e0d4 instantly. You can promote 4f2c91a again at any time.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <Button onClick={rollback} loading={pending}>
            {pending ? "Rolling back" : "Roll back"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
