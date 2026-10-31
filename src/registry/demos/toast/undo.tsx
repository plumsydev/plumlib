"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Archive, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { spring } from "@/lib/motion"

const initial = [
  { id: 1, from: "Vercel", subject: "Your deployment is ready" },
  { id: 2, from: "Linear", subject: "3 issues assigned to you" },
  { id: 3, from: "GitHub", subject: "[plumlib] PR #48 approved" },
]

export default function ToastUndo() {
  const [mails, setMails] = React.useState(initial)

  const archive = (m: (typeof initial)[0]) => {
    setMails((all) => all.filter((x) => x.id !== m.id))
    toast("Conversation archived", {
      description: m.subject,
      icon: <Archive className="size-4 text-muted-foreground" />,
      action: { label: "Undo", onClick: () => setMails((all) => [...all, m].sort((a, b) => a.id - b.id)) },
    })
  }

  return (
    <div className="w-full max-w-sm space-y-2">
      <ul className="space-y-1.5">
        <AnimatePresence initial={false}>
          {mails.map((m) => (
            <motion.li
              key={m.id}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
              transition={spring.smooth}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2.5">
                <Mail className="size-4 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{m.from}</div>
                  <div className="truncate text-xs text-muted-foreground">{m.subject}</div>
                </div>
                <Button size="icon-xs" variant="ghost" aria-label="Archive" onClick={() => archive(m)}>
                  <Archive />
                </Button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {mails.length === 0 && (
        <Button variant="outline" size="sm" className="w-full" onClick={() => setMails(initial)}>
          Restore inbox
        </Button>
      )}
    </div>
  )
}
