"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, Copy, Share2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// le libellé du tooltip change après l'action, et le tooltip reste ouvert pr le montrer
function ActionButton({ icon: Icon, label, done, doneLabel, onAction }: { icon: typeof Copy; label: string; done: boolean; doneLabel: string; onAction: () => void }) {
  const [open, setOpen] = React.useState(false)
  return (
    <Tooltip open={open || done} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <Button size="icon-sm" variant="outline" aria-label={label} onClick={onAction}>
          {done ? <Check className="text-success" /> : <Icon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent showArrow>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={done ? "done" : "idle"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="block"
          >
            {done ? doneLabel : label}
          </motion.span>
        </AnimatePresence>
      </TooltipContent>
    </Tooltip>
  )
}

export default function TooltipInteractive() {
  const [copied, setCopied] = React.useState(false)
  const [starred, setStarred] = React.useState(false)
  const [shared, setShared] = React.useState(false)

  const flash = (set: (v: boolean) => void) => {
    set(true)
    setTimeout(() => set(false), 1400)
  }

  return (
    <TooltipProvider>
      <div className="flex gap-2">
        <ActionButton icon={Copy} label="Copy link" doneLabel="Copied" done={copied} onAction={() => flash(setCopied)} />
        <ActionButton icon={Star} label="Star repository" doneLabel="Starred" done={starred} onAction={() => flash(setStarred)} />
        <ActionButton icon={Share2} label="Share" doneLabel="Link sent" done={shared} onAction={() => flash(setShared)} />
      </div>
    </TooltipProvider>
  )
}
