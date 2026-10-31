import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "isolate flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-xl border-dashed p-6 text-center text-balance md:p-12",
        className
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-header" className={cn("flex max-w-sm flex-col items-center gap-2", className)} {...props} />
}

const emptyMediaVariants = cva("mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0", {
  variants: {
    variant: {
      default: "bg-transparent",
      icon: "relative size-11 rounded-xl border bg-card text-foreground shadow-sm [&_svg:not([class*='size-'])]:size-5",
      // trois cartes empilées qui s'éventaillent qd on survole le bloc
      stack: [
        "group/empty-media relative size-11 rounded-xl border bg-card text-foreground shadow-sm [&_svg:not([class*='size-'])]:size-5",
        "before:absolute before:inset-0 before:-z-10 before:rounded-xl before:border before:bg-card before:shadow-xs before:transition-transform before:duration-500 before:ease-out-expo before:-rotate-6 before:-translate-x-1",
        "after:absolute after:inset-0 after:-z-10 after:rounded-xl after:border after:bg-card after:shadow-xs after:transition-transform after:duration-500 after:ease-out-expo after:rotate-6 after:translate-x-1",
        "[[data-slot=empty]:hover_&]:before:-rotate-12 [[data-slot=empty]:hover_&]:before:-translate-x-3 [[data-slot=empty]:hover_&]:after:rotate-12 [[data-slot=empty]:hover_&]:after:translate-x-3",
      ],
    },
  },
  defaultVariants: { variant: "default" },
})

function EmptyMedia({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return <div data-slot="empty-media" data-variant={variant} className={cn(emptyMediaVariants({ variant }), className)} {...props} />
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-title" className={cn("text-base font-medium tracking-tight", className)} {...props} />
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn("flex w-full max-w-sm min-w-0 flex-col items-center gap-3 text-sm text-balance", className)}
      {...props}
    />
  )
}

export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia }
