"use client"

import * as React from "react"
import { Menubar as MenubarPrimitive } from "radix-ui"
import { ChevronRight } from "lucide-react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"

// la barre sait quel menu est ouvert, chaque menu connait sa valeur => le fond glisse de trigger en trigger
const BarContext = React.createContext<{ id: string; open: string }>({ id: "", open: "" })
const MenuValueContext = React.createContext("")

const contentClass =
  "z-50 min-w-[12rem] overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-xl outline-none"

const itemClass = cn(
  "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none",
  "transition-colors duration-100 focus:bg-accent focus:text-accent-foreground",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground"
)

function MenuCheck() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-3.5 text-foreground" aria-hidden>
      <motion.path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.32, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  )
}

function Menubar({
  className,
  value: valueProp,
  defaultValue,
  onValueChange,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  const [inner, setInner] = React.useState(defaultValue ?? "")
  const value = valueProp ?? inner
  const id = React.useId()
  return (
    <BarContext.Provider value={{ id, open: value }}>
      <MenubarPrimitive.Root
        data-slot="menubar"
        value={value}
        onValueChange={(v) => {
          if (valueProp === undefined) setInner(v)
          onValueChange?.(v)
        }}
        className={cn("flex h-10 items-center gap-0.5 rounded-lg border bg-background p-1 shadow-xs dark:bg-input/20", className)}
        {...props}
      />
    </BarContext.Provider>
  )
}

function MenubarMenu({ value, ...props }: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  const fallback = React.useId()
  const v = value ?? fallback
  return (
    <MenuValueContext.Provider value={v}>
      <MenubarPrimitive.Menu data-slot="menubar-menu" value={v} {...props} />
    </MenuValueContext.Provider>
  )
}

function MenubarTrigger({ className, children, ...props }: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  const bar = React.useContext(BarContext)
  const value = React.useContext(MenuValueContext)
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-md px-2.5 py-1 text-sm font-medium outline-none",
        "transition-colors duration-150 hover:bg-accent/60 focus-visible:ring-[3px] focus-visible:ring-ring data-[state=open]:hover:bg-transparent",
        className
      )}
      {...props}
    >
      {bar.open === value && (
        <motion.span layoutId={`${bar.id}-open`} transition={spring.snappy} className="absolute inset-0 rounded-md bg-accent" />
      )}
      <span className="relative">{children}</span>
    </MenubarPrimitive.Trigger>
  )
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn("pl-pop origin-(--radix-menubar-content-transform-origin)", contentClass, className)}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & { inset?: boolean; variant?: "default" | "destructive" }) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset || undefined}
      data-variant={variant}
      className={cn(
        itemClass,
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:[&_svg]:!text-destructive",
        className
      )}
      {...props}
    />
  )
}

function MenubarCheckboxItem({ className, children, ...props }: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem data-slot="menubar-checkbox-item" className={cn(itemClass, "pl-8", className)} {...props}>
      <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <MenuCheck />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

function MenubarRadioGroup(props: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
}

function MenubarRadioItem({ className, children, ...props }: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem data-slot="menubar-radio-item" className={cn(itemClass, "pl-8", className)} {...props}>
      <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 600, damping: 22 }}
            className="block size-1.5 rounded-full bg-foreground"
          />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

function MenubarLabel({ className, inset, ...props }: React.ComponentProps<typeof MenubarPrimitive.Label> & { inset?: boolean }) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset || undefined}
      className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground data-[inset]:pl-8", className)}
      {...props}
    />
  )
}

function MenubarSeparator({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return <MenubarPrimitive.Separator data-slot="menubar-separator" className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
}

function MenubarShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn("ml-auto pl-4 font-mono text-[0.6875rem] tracking-widest text-muted-foreground/80", className)}
      {...props}
    />
  )
}

function MenubarGroup(props: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

function MenubarSub(props: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & { inset?: boolean }) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset || undefined}
      className={cn(itemClass, "data-[state=open]:bg-accent", className)}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto size-4" />
    </MenubarPrimitive.SubTrigger>
  )
}

function MenubarSubContent({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.SubContent
        data-slot="menubar-sub-content"
        className={cn("pl-pop origin-(--radix-menubar-content-transform-origin)", contentClass, className)}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
}

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
}
