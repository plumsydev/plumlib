"use client"

import * as React from "react"
import { AnimatePresence, motion, useAnimationControls } from "motion/react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"

type TagInputProps = Omit<React.ComponentProps<"input">, "value" | "defaultValue" | "onChange"> & {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (tags: string[]) => void
  /** nb max de tags */
  max?: number
  /** renvoie un message d'erreur pr refuser le tag, ou true/undefined pr l'accepter */
  validate?: (tag: string) => string | boolean | undefined
  /** touches qui valident le tag en cours */
  separators?: string[]
  /** appelé qd un tag est refusé, pratique pr un toast */
  onReject?: (tag: string, reason: string) => void
  containerClassName?: string
}

function TagInput({
  value: valueProp,
  defaultValue = [],
  onValueChange,
  max = Infinity,
  validate,
  separators = ["Enter", ","],
  onReject,
  placeholder = "Add a tag…",
  className,
  containerClassName,
  disabled,
  onKeyDown,
  onBlur,
  ...props
}: TagInputProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const tags = valueProp ?? inner
  const [draft, setDraft] = React.useState("")
  const [armed, setArmed] = React.useState(false)
  const [flash, setFlash] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const shake = useAnimationControls()

  const setTags = (next: string[]) => {
    if (valueProp === undefined) setInner(next)
    onValueChange?.(next)
  }

  const reject = (tag: string, reason: string) => {
    shake.start({ x: [0, -5, 5, -3, 3, 0], transition: { duration: 0.35 } })
    onReject?.(tag, reason)
  }

  const add = (raw: string[]) => {
    const next = [...tags]
    for (const r of raw) {
      const tag = r.trim()
      if (!tag) continue
      if (next.includes(tag)) {
        // doublon, on fait clignoter celui qui existe deja
        setFlash(tag)
        setTimeout(() => setFlash(null), 600)
        continue
      }
      if (next.length >= max) {
        reject(tag, `You can add up to ${max} tags`)
        break
      }
      const result = validate?.(tag)
      if (result === false || typeof result === "string") {
        reject(tag, typeof result === "string" ? result : "Invalid tag")
        continue
      }
      next.push(tag)
    }
    if (next.length !== tags.length) setTags(next)
    setDraft("")
  }

  const remove = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
    inputRef.current?.focus()
  }

  return (
    <motion.div
      animate={shake}
      data-slot="tag-input"
      data-disabled={disabled || undefined}
      onClick={() => inputRef.current?.focus()}
      className={cn(
        "flex min-h-9 w-full cursor-text flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-1.5 py-1.5 shadow-xs dark:bg-input/20",
        "transition-[border-color,box-shadow] duration-200 ease-out-quart",
        "hover:border-foreground/20 has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-[3px] has-[input:focus-visible]:ring-ring",
        "has-[input[aria-invalid=true]]:border-destructive has-[input[aria-invalid=true]]:ring-destructive/20",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        containerClassName
      )}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {tags.map((tag, i) => {
          const isArmed = armed && i === tags.length - 1
          return (
            <motion.span
              key={tag}
              layout
              initial={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
              animate={{
                opacity: 1,
                scale: flash === tag ? [1, 1.12, 1] : 1,
                filter: "blur(0px)",
              }}
              exit={{ opacity: 0, scale: 0.6, filter: "blur(4px)", transition: { duration: 0.15 } }}
              // un ressort sait pas faire 3 keyframes, le flash passe en tween
              transition={flash === tag ? { ...spring.snappy, scale: { duration: 0.4, ease: "easeOut" } } : spring.snappy}
              data-slot="tag"
              data-armed={isArmed || undefined}
              className={cn(
                "inline-flex h-6 items-center gap-1 rounded-md border bg-secondary pr-1 pl-2 text-xs font-medium text-secondary-foreground",
                "transition-[background-color,border-color,color] duration-200",
                isArmed && "border-destructive/40 bg-destructive/10 text-destructive",
                flash === tag && "border-brand/50 bg-brand/10 text-brand"
              )}
            >
              {tag}
              <button
                type="button"
                aria-label={`Remove ${tag}`}
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation()
                  remove(tag)
                }}
                className="grid size-4 cursor-pointer place-items-center rounded-sm text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
              >
                <X className="size-3" />
              </button>
            </motion.span>
          )
        })}
      </AnimatePresence>
      <input
        ref={inputRef}
        value={draft}
        disabled={disabled}
        placeholder={tags.length ? undefined : placeholder}
        onChange={(e) => {
          setArmed(false)
          setDraft(e.target.value)
        }}
        onPaste={(e) => {
          const text = e.clipboardData.getData("text")
          // collage multi, on découpe sur virgules tabs et retours ligne
          if (/[,\n\t]/.test(text)) {
            e.preventDefault()
            add(text.split(/[,\n\t]+/))
          }
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e)
          if (separators.includes(e.key) && draft.trim()) {
            e.preventDefault()
            add([draft])
          } else if (e.key === "Backspace" && !draft && tags.length) {
            // 1er backspace arme le dernier tag, le 2e le supprime, pas de suppression par accident
            e.preventDefault()
            if (armed) {
              setTags(tags.slice(0, -1))
              setArmed(false)
            } else setArmed(true)
          } else if (e.key === "Escape") setArmed(false)
        }}
        onBlur={(e) => {
          setArmed(false)
          if (draft.trim()) add([draft])
          onBlur?.(e)
        }}
        className={cn(
          "h-6 min-w-24 flex-1 bg-transparent px-1.5 text-sm outline-none placeholder:text-muted-foreground",
          className
        )}
        {...props}
      />
    </motion.div>
  )
}

export { TagInput, type TagInputProps }
