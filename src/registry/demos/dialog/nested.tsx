"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"

export default function DialogNested() {
  const [open, setOpen] = React.useState(false)
  const [confirm, setConfirm] = React.useState(false)
  const [text, setText] = React.useState("")

  // si y a du texte on demande avant de fermer, le dialog parent recule derrière la confirmation
  const requestClose = (next: boolean) => {
    if (!next && text.trim()) return setConfirm(true)
    setOpen(next)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={requestClose}>
        <DialogTrigger asChild>
          <Button variant="outline">Leave feedback</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Feedback</DialogTitle>
            <DialogDescription>Type something, then try to close this dialog.</DialogDescription>
          </DialogHeader>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="The new dashboard is great, but…" rows={4} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button
              disabled={!text.trim()}
              onClick={() => {
                toast.success("Thanks for the feedback")
                setText("")
                setOpen(false)
              }}
            >
              Send
            </Button>
          </DialogFooter>

          <AlertDialog open={confirm} onOpenChange={setConfirm}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Discard your feedback?</AlertDialogTitle>
                <AlertDialogDescription>You will lose what you typed.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep editing</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => {
                    setText("")
                    setOpen(false)
                  }}
                >
                  Discard
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DialogContent>
      </Dialog>
    </>
  )
}
