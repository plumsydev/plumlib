"use client"

import * as React from "react"
import { motion, useReducedMotion, type Variants } from "motion/react"
import { cn } from "@/lib/utils"

type Preset = "fade" | "blur" | "slide" | "scale"
type Per = "word" | "char" | "line"

const tags = {
  p: motion.p,
  span: motion.span,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
}

const presets: Record<Preset, Variants> = {
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)", y: "0.15em" },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  slide: { hidden: { opacity: 0, y: "0.6em" }, visible: { opacity: 1, y: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } },
}

const transitions: Record<Preset, object> = {
  fade: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  blur: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  slide: { type: "spring", stiffness: 260, damping: 26 },
  scale: { type: "spring", stiffness: 380, damping: 20 },
}

type TextEffectProps = {
  children: string
  per?: Per
  preset?: Preset
  as?: keyof typeof tags
  /** délai avant le 1er segment, en secondes */
  delay?: number
  /** écart entre 2 segments, en secondes (par défaut dépend de per) */
  stagger?: number
  /** "mount" joue direct, "inView" attend que le texte soit visible */
  trigger?: "mount" | "inView"
  once?: boolean
  className?: string
  segmentClassName?: string
  onComplete?: () => void
}

const defaultStagger: Record<Per, number> = { char: 0.03, word: 0.08, line: 0.16 }

function TextEffect({
  children,
  per = "word",
  preset = "blur",
  as = "p",
  delay = 0,
  stagger,
  trigger = "mount",
  once = true,
  className,
  segmentClassName,
  onComplete,
}: TextEffectProps) {
  const reduce = useReducedMotion()
  const Tag = tags[as]
  const segmentVariants = reduce ? presets.fade : presets[preset]
  const transition = reduce ? { duration: 0.2 } : transitions[preset]

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : (stagger ?? defaultStagger[per]), delayChildren: delay } },
  }

  const play = trigger === "inView" ? { whileInView: "visible", viewport: { once, margin: "-40px" } } : { animate: "visible" }

  const segment = (text: string, key: React.Key) => (
    <motion.span
      key={key}
      variants={segmentVariants}
      transition={transition}
      className={cn("inline-block whitespace-pre will-change-[transform,opacity,filter]", segmentClassName)}
    >
      {text}
    </motion.span>
  )

  let content: React.ReactNode
  if (per === "line") {
    content = children.split("\n").map((line, i) => (
      <motion.span
        key={i}
        variants={segmentVariants}
        transition={transition}
        className={cn("block will-change-[transform,opacity,filter]", segmentClassName)}
      >
        {line}
      </motion.span>
    ))
  } else if (per === "word") {
    content = children.split(/(\s+)/).map((part, i) => (/^\s+$/.test(part) ? part : segment(part, i)))
  } else {
    // on garde chaque mot groupé sinon le navigateur coupe au milieu des lettres
    content = children.split(/(\s+)/).map((word, wi) =>
      /^\s+$/.test(word) ? (
        word
      ) : (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => segment(char, ci))}
        </span>
      )
    )
  }

  return (
    <Tag
      data-slot="text-effect"
      aria-label={children}
      initial="hidden"
      variants={container}
      onAnimationComplete={(def) => def === "visible" && onComplete?.()}
      className={cn("whitespace-pre-line", className)}
      {...play}
    >
      <span aria-hidden>{content}</span>
    </Tag>
  )
}

export { TextEffect, type TextEffectProps }
