"use client"

import * as React from "react"
import { AnimatePresence, motion, type Transition } from "motion/react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"

type AnimatedNumberProps = Omit<React.ComponentProps<"span">, "children"> & {
  value: number
  /** options Intl.NumberFormat, ex { style: "currency", currency: "EUR" } */
  format?: Intl.NumberFormatOptions
  locales?: Intl.LocalesArgument
  transition?: Transition
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

function AnimatedNumber({
  value,
  format,
  locales = "en-US",
  transition = spring.smooth,
  className,
  ...props
}: AnimatedNumberProps) {
  const formatter = React.useMemo(() => new Intl.NumberFormat(locales, format), [locales, format])
  const formatted = formatter.format(value)
  const chars = formatted.split("")

  return (
    <span
      data-slot="animated-number"
      aria-label={formatted}
      className={cn("inline-flex items-baseline tabular-nums", className)}
      {...props}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {chars.map((char, i) => {
          // clé = position depuis la droite, comme ça les unités restent les unités qd le nombre grossit
          const key = chars.length - i
          return /\d/.test(char) ? (
            <Digit key={`d${key}`} digit={Number(char)} transition={transition} />
          ) : (
            <motion.span
              key={`s${key}${char}`}
              aria-hidden
              layout="position"
              initial={{ opacity: 0, y: "-0.4em", filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: "0.4em", filter: "blur(2px)" }}
              transition={transition}
              className="inline-block whitespace-pre"
            >
              {char}
            </motion.span>
          )
        })}
      </AnimatePresence>
    </span>
  )
}

function Digit({ digit, transition }: { digit: number; transition: Transition }) {
  return (
    <motion.span
      aria-hidden
      layout="position"
      initial={{ opacity: 0, y: "-0.5em", filter: "blur(3px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: "0.5em", filter: "blur(3px)" }}
      transition={transition}
      className="relative inline-block overflow-hidden [mask-image:linear-gradient(transparent,black_12%,black_88%,transparent)]"
    >
      {/* un chiffre invisible qui donne la taille, la colonne roule par dessus */}
      <span className="invisible">0</span>
      <motion.span
        className="absolute inset-x-0 top-0 flex flex-col items-center"
        initial={false}
        animate={{ y: `${-digit * 10}%` }}
        transition={transition}
      >
        {DIGITS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </motion.span>
    </motion.span>
  )
}

export { AnimatedNumber, type AnimatedNumberProps }
