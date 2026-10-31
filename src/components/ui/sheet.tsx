"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "radix-ui"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

function Sheet(props: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger(props: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose(props: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal(props: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn("pl-overlay fixed inset-0 z-50 bg-overlay backdrop-blur-[2px]", className)}
      {...props}
    />
  )
}

const sideClasses = {
  right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
  left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
  top: "inset-x-0 top-0 h-auto border-b",
  bottom: "inset-x-0 bottom-0 h-auto border-t",
} as const

// version flottante, décollée du bord avec des coins arrondis façon vercel
const insetClasses = {
  right: "inset-y-2 right-2 h-auto w-[calc(75%-1rem)] rounded-xl border sm:max-w-sm",
  left: "inset-y-2 left-2 h-auto w-[calc(75%-1rem)] rounded-xl border sm:max-w-sm",
  top: "inset-x-2 top-2 h-auto rounded-xl border",
  bottom: "inset-x-2 bottom-2 h-auto rounded-xl border",
} as const

function SheetContent({
  className,
  children,
  side = "right",
  inset = false,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: keyof typeof sideClasses
  inset?: boolean
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        data-side={side}
        data-inset={inset || undefined}
        className={cn(
          "pl-slide fixed z-50 flex flex-col gap-4 bg-popover text-popover-foreground shadow-xl outline-none",
          // en mode inset on glisse un poil plus loin pr sortir aussi la marge
          "data-[inset]:data-[side=right]:[--pl-sx:calc(100%+1rem)] data-[inset]:data-[side=left]:[--pl-sx:calc(-100%-1rem)] data-[inset]:data-[side=top]:[--pl-sy:calc(-100%-1rem)] data-[inset]:data-[side=bottom]:[--pl-sy:calc(100%+1rem)]",
          inset ? insetClasses[side] : sideClasses[side],
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            className={cn(
              "absolute right-4 top-4 inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground",
              "transition-[color,background-color,transform,translate,scale,rotate] duration-200 hover:bg-accent hover:text-foreground active:scale-90",
              "outline-none focus-visible:ring-[3px] focus-visible:ring-ring [&_svg]:size-4"
            )}
          >
            <X />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-body" className={cn("flex-1 overflow-y-auto px-6 [scrollbar-width:thin]", className)} {...props} />
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-header" className={cn("flex flex-col gap-1.5 p-6 pb-0 pr-12", className)} {...props} />
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-footer" className={cn("mt-auto flex flex-col gap-2 p-6 pt-0", className)} {...props} />
}

function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-base font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

function SheetDescription({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export { Sheet, SheetBody, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger }
