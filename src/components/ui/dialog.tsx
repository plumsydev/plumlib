"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

// un dialog ouvert par dessus un autre previent son parent, qui recule un peu comme une pile de cartes
const DialogNestingContext = React.createContext<((open: boolean) => void) | null>(null)

function useNestedOpen(open: boolean) {
  const notifyParent = React.useContext(DialogNestingContext)
  React.useEffect(() => {
    if (!notifyParent) return
    notifyParent(open)
    return () => notifyParent(false)
  }, [open, notifyParent])
}

function Dialog({ open: openProp, defaultOpen, onOpenChange, ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  const [inner, setInner] = React.useState(defaultOpen ?? false)
  const open = openProp ?? inner
  useNestedOpen(open)

  return (
    <DialogPrimitive.Root
      data-slot="dialog"
      open={open}
      onOpenChange={(value) => {
        if (openProp === undefined) setInner(value)
        onOpenChange?.(value)
      }}
      {...props}
    />
  )
}

function DialogTrigger(props: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal(props: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose(props: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn("pl-overlay fixed inset-0 z-50 bg-overlay backdrop-blur-[2px]", className)}
      {...props}
    />
  )
}

const sizes = {
  sm: "max-w-sm",
  default: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[calc(100%-2rem)] h-[calc(100dvh-2rem)]",
} as const

function DialogContent({
  className,
  children,
  size = "default",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & { size?: keyof typeof sizes; showCloseButton?: boolean }) {
  const [childOpen, setChildOpen] = React.useState(false)

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        data-size={size}
        data-nested-open={childOpen || undefined}
        className={cn(
          // transform et pas translate sinon ça se cumule avec les keyframes pl-dialog mdr
          "pl-dialog fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] gap-4 [transform:translate(-50%,-50%)]",
          "rounded-xl border bg-popover p-6 text-popover-foreground shadow-xl outline-none",
          // qd un enfant s'ouvre on recule avec scale et translate, qui se combinent avec transform sans le casser
          "transition-[scale,translate,filter] duration-500 ease-out-expo",
          "data-[nested-open]:-translate-y-4 data-[nested-open]:scale-[0.94] data-[nested-open]:brightness-[0.85]",
          sizes[size],
          className
        )}
        {...props}
      >
        <DialogNestingContext.Provider value={setChildOpen}>{children}</DialogNestingContext.Provider>
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className={cn(
              "absolute top-4 right-4 inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground",
              "transition-[color,background-color,transform,translate,scale,rotate] duration-200 hover:bg-accent hover:text-foreground active:scale-90",
              "outline-none focus-visible:ring-[3px] focus-visible:ring-ring [&_svg]:size-4"
            )}
          >
            <X />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-header" className={cn("flex flex-col gap-1.5 pr-6 text-left", className)} {...props} />
}

function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-body"
      className={cn("-mx-6 max-h-[60vh] overflow-y-auto border-y px-6 py-4 [scrollbar-width:thin]", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-base leading-none font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogNestingContext,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  useNestedOpen,
}
