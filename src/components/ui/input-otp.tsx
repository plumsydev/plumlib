"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & { containerClassName?: string }) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn("flex items-center gap-2 has-disabled:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="input-otp-group" className={cn("flex items-center", className)} {...props} />
}

function InputOTPSlot({ index, className, ...props }: React.ComponentProps<"div"> & { index: number }) {
  const ctx = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = ctx?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive || undefined}
      data-filled={char ? true : undefined}
      className={cn(
        "relative flex h-10 w-9 items-center justify-center border-y border-r border-input bg-background text-base font-medium tabular-nums shadow-xs dark:bg-input/20",
        "first:rounded-l-md first:border-l last:rounded-r-md",
        "transition-[border-color,box-shadow,background-color] duration-200 ease-out-quart outline-none",
        "data-[active]:z-10 data-[active]:border-ring data-[active]:ring-[3px] data-[active]:ring-ring",
        "aria-invalid:border-destructive data-[active]:aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {char && (
          // le chiffre arrive avec un petit saut, ça rend la saisie satisfaisante
          <motion.span
            key={char}
            initial={{ opacity: 0, y: 8, scale: 0.6, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, scale: 0.6, filter: "blur(3px)" }}
            transition={spring.snappy}
          >
            {char}
          </motion.span>
        )}
      </AnimatePresence>
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.div
            className="h-4 w-px bg-foreground"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: "linear" }}
          />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator(props: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" className="text-muted-foreground" {...props}>
      <div className="h-px w-2.5 rounded-full bg-current" />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
