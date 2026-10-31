"use client"

import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"

const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
    "transition-[background-color,color,box-shadow,scale,opacity] duration-200 ease-out-quart",
    "active:scale-[0.97] active:duration-75",
    "outline-none focus-visible:ring-[3px] focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50 aria-busy:pointer-events-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/88 inset-shadow-[0_1px_0_0_rgb(255_255_255/0.12)]",
        brand:
          "bg-brand text-brand-foreground shadow-sm hover:bg-brand/90 inset-shadow-[0_1px_0_0_rgb(255_255_255/0.2)]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/70",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/20 dark:hover:bg-input/40",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 focus-visible:ring-destructive/30",
        link: "text-foreground underline-offset-4 decoration-foreground/30 hover:underline hover:decoration-foreground active:scale-100",
      },
      size: {
        xs: "h-7 gap-1.5 rounded-sm px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-8 gap-1.5 px-3",
        default: "h-9 px-4",
        lg: "h-10 px-5",
        xl: "h-12 rounded-lg px-6 text-base",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-xs": "size-7 rounded-sm",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  // asChild => on laisse l'enfant gérer son contenu, pas de spinner ds un lien chelou
  if (asChild) {
    return (
      <Slot.Root data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props}>
        {children}
      </Slot.Root>
    )
  }

  return (
    <button
      data-slot="button"
      aria-busy={loading || undefined}
      disabled={disabled}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <AnimatePresence initial={false}>
        {loading && (
          <motion.span
            key="spinner"
            initial={{ width: 0, opacity: 0, scale: 0.6 }}
            animate={{ width: "auto", opacity: 1, scale: 1 }}
            exit={{ width: 0, opacity: 0, scale: 0.6 }}
            transition={spring.snappy}
            className="-mr-2 inline-flex overflow-hidden"
          >
            <ButtonSpinner />
            <span className="w-2 shrink-0" />
          </motion.span>
        )}
      </AnimatePresence>
      {children}
    </button>
  )
}

function ButtonSpinner() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 animate-spin" aria-hidden>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path d="M14.5 8A6.5 6.5 0 0 0 8 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export { Button, buttonVariants, type ButtonProps }
