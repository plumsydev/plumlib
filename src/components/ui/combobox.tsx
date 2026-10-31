"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

type ComboboxOption = {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  group?: string
  disabled?: boolean
  /** mots clés en plus pr la recherche */
  keywords?: string[]
}

type BaseProps = {
  options: ComboboxOption[]
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: React.ReactNode
  disabled?: boolean
  className?: string
  contentClassName?: string
  size?: "sm" | "default" | "lg"
  "aria-invalid"?: boolean
  id?: string
}

type SingleProps = BaseProps & {
  multiple?: false
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

type MultipleProps = BaseProps & {
  multiple: true
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  /** au dela on affiche "+n" au lieu des badges */
  maxBadges?: number
}

type ComboboxProps = SingleProps | MultipleProps

const draw = [0.65, 0, 0.35, 1] as const

function Combobox(props: ComboboxProps) {
  const {
    options,
    placeholder = "Select…",
    searchPlaceholder = "Search…",
    emptyText = "No results.",
    disabled,
    className,
    contentClassName,
    size = "default",
    id,
  } = props
  const [open, setOpen] = React.useState(false)
  const [inner, setInner] = React.useState<string | string[]>(props.defaultValue ?? (props.multiple ? [] : ""))
  const current = props.value ?? inner
  const selected = Array.isArray(current) ? current : current ? [current] : []
  const byValue = React.useMemo(() => new Map(options.map((o) => [o.value, o])), [options])

  const emit = (next: string | string[]) => {
    if (props.value === undefined) setInner(next)
    ;(props.onValueChange as ((v: string | string[]) => void) | undefined)?.(next)
  }

  const toggle = (value: string) => {
    if (props.multiple) {
      emit(selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value])
    } else {
      emit(value === current ? "" : value)
      setOpen(false)
    }
  }

  const groups = React.useMemo(() => {
    const map = new Map<string, ComboboxOption[]>()
    options.forEach((o) => map.set(o.group ?? "", [...(map.get(o.group ?? "") ?? []), o]))
    return [...map.entries()]
  }, [options])

  const maxBadges = props.multiple ? (props.maxBadges ?? 3) : 0
  const single = !props.multiple ? byValue.get(current as string) : undefined

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <button
          type="button"
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-invalid={props["aria-invalid"]}
          data-slot="combobox-trigger"
          data-size={size}
          className={cn(
            "group/combobox flex w-full min-w-0 cursor-pointer items-center justify-between gap-2 rounded-md border border-input bg-background px-3 text-left text-sm shadow-xs dark:bg-input/20",
            "transition-[border-color,box-shadow] duration-200 ease-out-quart outline-none",
            "hover:border-foreground/20 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring data-[state=open]:border-ring",
            "aria-invalid:border-destructive aria-invalid:ring-destructive/20 disabled:pointer-events-none disabled:opacity-50",
            "data-[size=sm]:min-h-8 data-[size=default]:min-h-9 data-[size=lg]:min-h-10",
            props.multiple && selected.length > 0 && "py-1 pl-1",
            className
          )}
        >
          <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
            {props.multiple ? (
              selected.length ? (
                <AnimatePresence initial={false} mode="popLayout">
                  {selected.slice(0, maxBadges).map((v) => (
                    <motion.span
                      key={v}
                      layout
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.12 } }}
                      transition={spring.snappy}
                      className="inline-flex h-6 items-center gap-1 rounded-md border bg-secondary pr-0.5 pl-2 text-xs font-medium"
                    >
                      {byValue.get(v)?.label ?? v}
                      <span
                        role="button"
                        tabIndex={-1}
                        aria-label={`Remove ${byValue.get(v)?.label ?? v}`}
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggle(v)
                        }}
                        className="grid size-4 place-items-center rounded-sm text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
                      >
                        <X className="size-3" />
                      </span>
                    </motion.span>
                  ))}
                  {selected.length > maxBadges && (
                    <motion.span
                      key="more"
                      layout
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={spring.snappy}
                      className="inline-flex h-6 items-center rounded-md px-1.5 text-xs text-muted-foreground"
                    >
                      +{selected.length - maxBadges}
                    </motion.span>
                  )}
                </AnimatePresence>
              ) : (
                <span className="truncate text-muted-foreground">{placeholder}</span>
              )
            ) : (
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={single?.value ?? "placeholder"}
                  initial={{ opacity: 0, y: 6, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -6, filter: "blur(2px)" }}
                  transition={spring.snappy}
                  className={cn("flex min-w-0 items-center gap-2 truncate", !single && "text-muted-foreground")}
                >
                  {single?.icon}
                  {single?.label ?? placeholder}
                </motion.span>
              </AnimatePresence>
            )}
          </span>
          <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground transition-[scale] duration-200 group-hover/combobox:scale-110" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn("w-(--radix-popover-trigger-width) min-w-56 overflow-hidden p-0", contentClassName)}
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            {groups.map(([group, items]) => (
              <CommandGroup key={group || "_"} heading={group || undefined}>
                {items.map((o) => {
                  const on = selected.includes(o.value)
                  return (
                    <CommandItem
                      key={o.value}
                      value={o.value}
                      keywords={[o.label, ...(o.keywords ?? [])]}
                      disabled={o.disabled}
                      onSelect={() => toggle(o.value)}
                    >
                      {props.multiple ? (
                        <span
                          className={cn(
                            "grid size-4 shrink-0 place-items-center rounded-[4px] border transition-[background-color,border-color] duration-200",
                            on ? "border-primary bg-primary text-primary-foreground" : "border-input"
                          )}
                        >
                          <svg viewBox="0 0 16 16" fill="none" className="size-3" aria-hidden>
                            <motion.path
                              d="M3.5 8.5L6.5 11.5L12.5 4.5"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              initial={false}
                              animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
                              transition={{ pathLength: { duration: 0.3, ease: draw }, opacity: { duration: 0.05 } }}
                            />
                          </svg>
                        </span>
                      ) : (
                        o.icon
                      )}
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate">{o.label}</span>
                        {o.description && <span className="truncate text-xs text-muted-foreground">{o.description}</span>}
                      </span>
                      {!props.multiple && (
                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.span
                              initial={{ scale: 0.4, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.4, opacity: 0 }}
                              transition={spring.bouncy}
                              className="ml-auto"
                            >
                              <Check className="size-4 text-foreground" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      )}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { Combobox, type ComboboxOption, type ComboboxProps }
