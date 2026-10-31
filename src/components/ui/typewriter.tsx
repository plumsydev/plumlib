"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

type TypewriterProps = {
  words: string[]
  /** ms par caractère tapé */
  typeSpeed?: number
  /** ms par caractère effacé */
  deleteSpeed?: number
  /** pause une fois le mot écrit, en ms */
  pause?: number
  loop?: boolean
  cursor?: boolean
  className?: string
  cursorClassName?: string
}

function Typewriter({
  words,
  typeSpeed = 70,
  deleteSpeed = 35,
  pause = 1600,
  loop = true,
  cursor = true,
  className,
  cursorClassName,
}: TypewriterProps) {
  const reduce = useReducedMotion()
  const [index, setIndex] = React.useState(0)
  const [text, setText] = React.useState("")
  const [deleting, setDeleting] = React.useState(false)
  const word = words[index % words.length] ?? ""
  const done = !loop && index === words.length - 1 && text === word

  React.useEffect(() => {
    if (reduce || done || !words.length) return
    let t: ReturnType<typeof setTimeout>
    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === "") {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    } else {
      // un poil d'aléatoire sur la frappe sinon ça fait robot
      const speed = deleting ? deleteSpeed : typeSpeed * (0.6 + Math.random() * 0.8)
      t = setTimeout(() => setText(word.slice(0, text.length + (deleting ? -1 : 1))), speed)
    }
    return () => clearTimeout(t)
  }, [text, deleting, word, words.length, typeSpeed, deleteSpeed, pause, reduce, done])

  // reduced motion => on fait juste défiler les mots en fondu
  React.useEffect(() => {
    if (!reduce || words.length < 2) return
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), pause + 1200)
    return () => clearInterval(t)
  }, [reduce, pause, words.length])

  if (reduce) {
    return (
      <span data-slot="typewriter" className={cn("relative inline-grid", className)}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {word}
          </motion.span>
        </AnimatePresence>
      </span>
    )
  }

  return (
    <span data-slot="typewriter" className={cn("inline-flex items-baseline", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden className="whitespace-pre">{text || "​"}</span>
      {cursor && (
        <motion.span
          aria-hidden
          // le caret reste plein pendant qu'on tape, il clignote qd ça attend
          animate={text === word || text === "" ? { opacity: [1, 1, 0, 0] } : { opacity: 1 }}
          transition={text === word || text === "" ? { duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] } : { duration: 0 }}
          className={cn("ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] self-baseline rounded-full bg-current", cursorClassName)}
        />
      )}
    </span>
  )
}

export { Typewriter, type TypewriterProps }
