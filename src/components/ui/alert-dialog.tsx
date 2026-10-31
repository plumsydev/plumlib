"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "radix-ui"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"
import { buttonVariants } from "@/components/ui/button"
import { useNestedOpen } from "@/components/ui/dialog"

function AlertDialog({ open: openProp, defaultOpen, onOpenChange, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  const [inner, setInner] = React.useState(defaultOpen ?? false)
  const open = openProp ?? inner
  // ouverte depuis un dialog => le dialog parent recule derrière
  useNestedOpen(open)

  return (
    <AlertDialogPrimitive.Root
      data-slot="alert-dialog"
      open={open}
      onOpenChange={(value) => {
        if (openProp === undefined) setInner(value)
        onOpenChange?.(value)
      }}
      {...props}
    />
  )
}

function AlertDialogTrigger(props: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
}

function AlertDialogPortal(props: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
}

function AlertDialogOverlay({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn("pl-overlay fixed inset-0 z-50 bg-overlay backdrop-blur-[2px]", className)}
      {...props}
    />
  )
}

function AlertDialogContent({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "pl-dialog fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-md gap-4 [transform:translate(-50%,-50%)]",
          "rounded-xl border bg-popover p-6 text-popover-foreground shadow-xl outline-none",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof motion.div> & { variant?: "default" | "destructive" | "warning" }) {
  return (
    <motion.div
      initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ ...spring.bouncy, delay: 0.08 }}
      data-slot="alert-dialog-media"
      data-variant={variant}
      className={cn(
        "mb-1 flex size-10 items-center justify-center rounded-full [&_svg]:size-5",
        "data-[variant=default]:bg-muted data-[variant=default]:text-foreground",
        "data-[variant=destructive]:bg-destructive/10 data-[variant=destructive]:text-destructive",
        "data-[variant=warning]:bg-warning/15 data-[variant=warning]:text-warning",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-dialog-header" className={cn("flex flex-col gap-1.5 text-left", className)} {...props} />
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  )
}

function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("text-base font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
}

function AlertDialogDescription({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> & { variant?: "default" | "destructive" | "brand" }) {
  return (
    <AlertDialogPrimitive.Action
      data-slot="alert-dialog-action"
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertDialogCancel({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      data-slot="alert-dialog-cancel"
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
