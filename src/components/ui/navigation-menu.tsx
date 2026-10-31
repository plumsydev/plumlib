"use client"

import * as React from "react"
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"

// partagé entre la liste et les triggers pr faire glisser le fond de survol
const HoverContext = React.createContext<{ id: string; hovered: string | null; setHovered: (v: string | null) => void } | null>(null)

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & { viewport?: boolean }) {
  const [hovered, setHovered] = React.useState<string | null>(null)
  const id = React.useId()
  return (
    <HoverContext.Provider value={{ id, hovered, setHovered }}>
      <NavigationMenuPrimitive.Root
        data-slot="navigation-menu"
        data-viewport={viewport}
        className={cn("group/navigation-menu relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
        {...props}
      >
        {children}
        {viewport && <NavigationMenuViewport />}
      </NavigationMenuPrimitive.Root>
    </HoverContext.Provider>
  )
}

function NavigationMenuList({ className, onMouseLeave, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  const ctx = React.useContext(HoverContext)
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      onMouseLeave={(e) => {
        ctx?.setHovered(null)
        onMouseLeave?.(e)
      }}
      className={cn("group flex flex-1 list-none items-center justify-center gap-0.5", className)}
      {...props}
    />
  )
}

function NavigationMenuItem({ className, value, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  const ctx = React.useContext(HoverContext)
  const fallback = React.useId()
  const key = value ?? fallback
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      value={value}
      onMouseEnter={() => ctx?.setHovered(key)}
      className={cn("relative", className)}
      {...props}
    >
      {ctx?.hovered === key && (
        <motion.span
          layoutId={`${ctx.id}-hover`}
          transition={spring.snappy}
          className="pointer-events-none absolute inset-0 rounded-md bg-accent"
        />
      )}
      {props.children}
    </NavigationMenuPrimitive.Item>
  )
}

const navigationMenuTriggerStyle = cva(
  [
    "group relative inline-flex h-9 w-max cursor-pointer items-center justify-center gap-1 rounded-md px-3 py-2 text-sm font-medium",
    "text-muted-foreground transition-colors duration-200 outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring",
    "data-[state=open]:text-foreground data-[active]:text-foreground disabled:pointer-events-none disabled:opacity-50",
  ]
)

function NavigationMenuTrigger({ className, children, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), className)}
      {...props}
    >
      {children}
      <ChevronDown
        aria-hidden
        className="relative top-px size-3.5 transition-transform duration-300 ease-out-expo group-data-[state=open]:rotate-180"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "top-0 left-0 w-full p-2 md:absolute md:w-auto",
        // le contenu arrive du coté d'où vient la souris, radix nous file la direction ds data-motion
        "data-[motion=from-end]:[--pl-x:2.5rem] data-[motion=from-start]:[--pl-x:-2.5rem] data-[motion=to-end]:[--pl-x:2.5rem] data-[motion=to-start]:[--pl-x:-2.5rem]",
        "data-[motion^=from-]:animate-[pl-pop-in_0.4s_var(--ease-out-expo)] data-[motion^=to-]:animate-[pl-pop-out_0.2s_var(--ease-in-quart)_forwards]",
        "group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:rounded-xl group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:shadow-lg",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className="absolute top-full left-0 isolate z-50 flex justify-center">
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "pl-pop relative mt-2 origin-top overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-xl",
          // la boite morphe en taille d'un menu à l'autre
          "h-(--radix-navigation-menu-viewport-height) w-full transition-[width,height] duration-400 ease-out-expo md:w-(--radix-navigation-menu-viewport-width)",
          className
        )}
        {...props}
      />
    </div>
  )
}

function NavigationMenuLink({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "flex flex-col gap-1 rounded-lg p-3 text-sm transition-colors duration-150 outline-none",
        "hover:bg-accent focus:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring data-[active=true]:bg-accent/60",
        "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuIndicator({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "top-full z-[1] flex h-2 items-end justify-center overflow-hidden transition-[width,transform,translate,scale,rotate] duration-300 ease-out-expo",
        "data-[state=visible]:animate-[pl-fade-in_0.2s] data-[state=hidden]:animate-[pl-fade-out_0.15s_forwards]",
        className
      )}
      {...props}
    >
      <div className="relative top-[60%] size-2.5 rotate-45 rounded-tl-sm border-t border-l bg-popover" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}
