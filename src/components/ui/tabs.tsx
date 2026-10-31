"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"

type TabsVariant = "pill" | "underline"

const TabsContext = React.createContext<{ value?: string; id: string }>({ id: "" })
const TabsListContext = React.createContext<TabsVariant>("pill")

function Tabs({
  className,
  value: valueProp,
  defaultValue,
  onValueChange,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  // on suit la valeur nous meme pr savoir ou poser l'indicateur
  const [inner, setInner] = React.useState(defaultValue)
  const value = valueProp ?? inner
  const id = React.useId()

  return (
    <TabsContext.Provider value={{ value, id }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        value={value}
        onValueChange={(v) => {
          if (valueProp === undefined) setInner(v)
          onValueChange?.(v)
        }}
        className={cn("flex flex-col gap-3 data-[orientation=vertical]:flex-row", className)}
        {...props}
      />
    </TabsContext.Provider>
  )
}

function TabsList({
  className,
  variant = "pill",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & { variant?: TabsVariant }) {
  return (
    <TabsListContext.Provider value={variant}>
      <TabsPrimitive.List
        data-slot="tabs-list"
        data-variant={variant}
        className={cn(
          "inline-flex w-fit items-center text-muted-foreground",
          variant === "pill" && "h-9 rounded-lg bg-muted p-[3px]",
          variant === "underline" && "h-10 gap-1 border-b",
          className
        )}
        {...props}
      />
    </TabsListContext.Provider>
  )
}

function TabsTrigger({ className, children, value, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const ctx = React.useContext(TabsContext)
  const variant = React.useContext(TabsListContext)
  const active = ctx.value === value

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      value={value}
      className={cn(
        "relative inline-flex h-full cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap px-3 text-sm font-medium",
        "outline-none transition-colors duration-200 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        variant === "pill" && "flex-1 rounded-md",
        variant === "underline" && "isolate rounded-md after:absolute after:inset-x-1 after:inset-y-1.5 after:-z-10 after:rounded-md after:transition-colors hover:after:bg-accent",
        className
      )}
      {...props}
    >
      {active && (
        <motion.span
          layoutId={`${ctx.id}-tab-indicator`}
          transition={spring.snappy}
          aria-hidden
          className={cn(
            "absolute",
            variant === "pill" && "inset-0 rounded-md bg-background shadow-sm dark:bg-input/40 dark:shadow-none dark:ring-1 dark:ring-input",
            variant === "underline" && "inset-x-2 -bottom-px h-0.5 rounded-full bg-foreground"
          )}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-1.5">{children}</span>
    </TabsPrimitive.Trigger>
  )
}

function TabsContent({ className, children, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    // asChild => le motion.div EST le content, donc space-y grid gap etc s'appliquent direct aux enfants
    <TabsPrimitive.Content asChild {...props}>
      <motion.div
        data-slot="tabs-content"
        initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn("flex-1 outline-none", className)}
      >
        {children}
      </motion.div>
    </TabsPrimitive.Content>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
