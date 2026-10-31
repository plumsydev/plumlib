"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { motion } from "motion/react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn("flex h-full w-full flex-col overflow-hidden rounded-xl bg-popover text-popover-foreground", className)}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command palette",
  description = "Search for a command to run",
  children,
  className,
  showCloseButton = false,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      {/* conteneur fixe transparent pr que la palette reste collée en haut qd la liste rétrécit */}
      <DialogContent
        className="pointer-events-none h-[min(460px,75vh)] max-w-xl content-start gap-0 border-0 bg-transparent p-0 shadow-none"
        showCloseButton={showCloseButton}
      >
        {/* le titre doit vivre ds le content sinon radix râle ds la console */}
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Command
          className={cn(
            "pointer-events-auto h-auto border shadow-xl [&_[cmdk-input-wrapper]]:h-12 [&_[cmdk-input]]:h-12",
            className
          )}
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" cmdk-input-wrapper="" className="flex h-11 items-center gap-2.5 border-b px-3.5">
      <Search className="size-4 shrink-0 text-muted-foreground" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "flex h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

type Rect = { top: number; left: number; width: number; height: number }

function CommandList({ className, children, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [rect, setRect] = React.useState<Rect | null>(null)

  // on piste l'item sélectionné pr faire glisser le highlight dessous, cmdk pose data-selected tt seul
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const item = el.querySelector<HTMLElement>('[cmdk-item][data-selected="true"]')
      if (!item) return setRect(null)
      const next = { top: item.offsetTop, left: item.offsetLeft, width: item.offsetWidth, height: item.offsetHeight }
      setRect((prev) =>
        prev && prev.top === next.top && prev.left === next.left && prev.width === next.width && prev.height === next.height
          ? prev
          : next
      )
    }
    update()
    const observer = new MutationObserver(update)
    observer.observe(el, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-selected", "hidden"] })
    return () => observer.disconnect()
  }, [])

  return (
    <CommandPrimitive.List
      ref={ref}
      data-slot="command-list"
      className={cn(
        "relative h-[min(320px,var(--cmdk-list-height))] max-h-80 scroll-py-1 overflow-y-auto overflow-x-hidden overscroll-contain",
        "transition-[height] duration-200 ease-out-quart",
        className
      )}
      {...props}
    >
      {rect && (
        <motion.div
          aria-hidden
          initial={false}
          animate={rect}
          transition={spring.snappy}
          className="pointer-events-none absolute rounded-md bg-accent"
        />
      )}
      {children}
    </CommandPrimitive.List>
  )
}

function CommandEmpty({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("py-10 text-center text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-1.5 text-foreground",
        "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-1 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("-mx-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        // le fond est ds CommandList, l'item reste transparent et passe au dessus
        "relative z-10 flex cursor-default select-none items-center gap-2.5 rounded-md px-2 py-2 text-sm outline-none",
        "text-foreground/80 transition-colors duration-150 data-[selected=true]:text-foreground",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn("ml-auto font-mono text-[0.6875rem] tracking-widest text-muted-foreground/80", className)}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
}
