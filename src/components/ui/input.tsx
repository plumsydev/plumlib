import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  [
    "flex w-full min-w-0 rounded-md border border-input bg-background text-foreground shadow-xs dark:bg-input/20",
    "placeholder:text-muted-foreground selection:bg-brand/25",
    "transition-[color,box-shadow,border-color,background-color] duration-200 ease-out-quart outline-none",
    "hover:border-foreground/20 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
  ],
  {
    variants: {
      size: {
        sm: "h-8 px-2.5 text-sm",
        default: "h-9 px-3 text-base md:text-sm",
        lg: "h-10 px-3.5 text-base",
      },
    },
    defaultVariants: { size: "default" },
  }
)

type InputProps = Omit<React.ComponentProps<"input">, "size"> & VariantProps<typeof inputVariants>

function Input({ className, type, size, ...props }: InputProps) {
  return <input type={type} data-slot="input" className={cn(inputVariants({ size }), className)} {...props} />
}

// le groupe gère le focus ring à la place de l'input, comme ça les icônes sont dedans
function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        "group/input relative flex w-full items-center rounded-md border border-input bg-background shadow-xs dark:bg-input/20",
        "transition-[color,box-shadow,border-color] duration-200 ease-out-quart",
        "hover:border-foreground/20 has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-[3px] has-[input:focus-visible]:ring-ring",
        "has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:ring-destructive/20",
        "has-[input:disabled]:opacity-50",
        "[&>[data-slot=input]]:border-0 [&>[data-slot=input]]:bg-transparent [&>[data-slot=input]]:shadow-none [&>[data-slot=input]]:ring-0 dark:[&>[data-slot=input]]:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function InputAddon({
  className,
  align = "start",
  ...props
}: React.ComponentProps<"div"> & { align?: "start" | "end" }) {
  return (
    <div
      data-slot="input-addon"
      data-align={align}
      className={cn(
        "flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200",
        "group-has-[input:focus-visible]/input:text-foreground [&_svg:not([class*='size-'])]:size-4",
        align === "start" ? "order-first pl-3 -mr-1" : "order-last pr-3 -ml-1",
        className
      )}
      {...props}
    />
  )
}

export { Input, InputGroup, InputAddon, inputVariants, type InputProps }
