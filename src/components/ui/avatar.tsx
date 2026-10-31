"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const avatarVariants = cva("relative flex shrink-0 overflow-hidden rounded-full select-none", {
  variants: {
    size: {
      xs: "size-6 text-[10px]",
      sm: "size-8 text-xs",
      default: "size-10 text-sm",
      lg: "size-12 text-base",
      xl: "size-16 text-lg",
    },
  },
  defaultVariants: { size: "default" },
})

function Avatar({
  className,
  size,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & VariantProps<typeof avatarVariants>) {
  return <AvatarPrimitive.Root data-slot="avatar" className={cn(avatarVariants({ size }), className)} {...props} />
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      // radix rend l'image qu'une fois chargée donc on peut juste la faire apparaitre en douceur
      className={cn("aspect-square size-full animate-[pl-fade-in_0.4s_var(--ease-out-quart)] object-cover", className)}
      {...props}
    />
  )
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground",
        "animate-[pl-fade-in_0.3s_var(--ease-out-quart)]",
        className
      )}
      {...props}
    />
  )
}

function AvatarStatus({
  className,
  status = "online",
  ...props
}: React.ComponentProps<"span"> & { status?: "online" | "busy" | "away" | "offline" }) {
  return (
    <span
      data-slot="avatar-status"
      data-status={status}
      className={cn(
        "absolute right-0 bottom-0 size-[28%] min-h-2 min-w-2 rounded-full ring-2 ring-background",
        status === "online" && "bg-success",
        status === "busy" && "bg-destructive",
        status === "away" && "bg-warning",
        status === "offline" && "bg-muted-foreground/50",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({
  className,
  children,
  max,
  ...props
}: React.ComponentProps<"div"> & { max?: number }) {
  const items = React.Children.toArray(children)
  const visible = max ? items.slice(0, max) : items
  const rest = items.length - visible.length

  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatars flex items-center -space-x-2.5 hover:-space-x-1",
        "*:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        // les avatars s'écartent au survol comme un jeu de cartes
        "*:transition-[margin,transform] *:duration-400 *:ease-out-expo *:hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {visible}
      {rest > 0 && (
        <Avatar>
          <AvatarFallback className="bg-secondary text-xs text-secondary-foreground">+{rest}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

export { Avatar, AvatarImage, AvatarFallback, AvatarStatus, AvatarGroup, avatarVariants }
