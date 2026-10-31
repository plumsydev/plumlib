"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { CalendarDays, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar, type DateRange } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type CommonProps = {
  placeholder?: string
  locale?: string
  formatOptions?: Intl.DateTimeFormatOptions
  minDate?: Date
  maxDate?: Date
  disabledDates?: (date: Date) => boolean
  disabled?: boolean
  clearable?: boolean
  align?: "start" | "center" | "end"
  className?: string
  "aria-invalid"?: boolean
}

const triggerClass = cn(
  "group inline-flex h-9 w-full min-w-0 cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 text-left text-sm shadow-xs",
  "transition-[border-color,box-shadow,background-color] duration-200 outline-none hover:bg-accent/50 dark:bg-input/20",
  "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring data-[state=open]:border-ring data-[state=open]:ring-[3px] data-[state=open]:ring-ring",
  "aria-invalid:border-destructive aria-invalid:ring-destructive/20 disabled:cursor-not-allowed disabled:opacity-50"
)

// le texte du trigger change en fondu, ça évite le saut sec qd on choisit une date
function TriggerLabel({ text, placeholder }: { text?: string; placeholder: string }) {
  return (
    <span className="relative flex-1 truncate">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text ?? "placeholder"}
          initial={{ opacity: 0, y: 6, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -6, filter: "blur(3px)" }}
          transition={{ duration: 0.2 }}
          className={cn("block truncate", !text && "text-muted-foreground")}
        >
          {text ?? placeholder}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function ClearButton({ onClear }: { onClear: () => void }) {
  return (
    <span
      role="button"
      tabIndex={-1}
      aria-label="Clear date"
      onPointerDown={(e) => {
        // pointerdown sinon le popover s'ouvre avant le clic
        e.preventDefault()
        e.stopPropagation()
        onClear()
      }}
      className="-mr-1 inline-flex size-5 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground [&_svg]:size-3.5"
    >
      <X />
    </span>
  )
}

function DatePicker({
  value: valueProp,
  defaultValue,
  onChange,
  placeholder = "Pick a date",
  locale = "en-US",
  formatOptions = { dateStyle: "medium" },
  minDate,
  maxDate,
  disabledDates,
  disabled,
  clearable = true,
  align = "start",
  className,
  ...props
}: CommonProps & { value?: Date; defaultValue?: Date; onChange?: (date: Date | undefined) => void }) {
  const [open, setOpen] = React.useState(false)
  const [inner, setInner] = React.useState(defaultValue)
  const value = valueProp !== undefined ? valueProp : inner
  const fmt = React.useMemo(() => new Intl.DateTimeFormat(locale, formatOptions), [locale, formatOptions])

  const change = (d: Date | undefined) => {
    if (valueProp === undefined) setInner(d)
    onChange?.(d)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <button type="button" data-slot="date-picker" className={cn(triggerClass, className)} {...props}>
          <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
          <TriggerLabel text={value ? fmt.format(value) : undefined} placeholder={placeholder} />
          {clearable && value ? (
            <ClearButton onClear={() => change(undefined)} />
          ) : (
            <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out-expo group-data-[state=open]:rotate-180" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(d) => {
            change(d)
            // petit délai pr voir la pastille se poser avant de fermer
            if (d) setTimeout(() => setOpen(false), 160)
          }}
          locale={locale}
          minDate={minDate}
          maxDate={maxDate}
          disabled={disabledDates}
        />
      </PopoverContent>
    </Popover>
  )
}

type Preset = { label: string; range: () => DateRange }

const day = (offset = 0) => {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + offset)
}

const defaultPresets: Preset[] = [
  { label: "Today", range: () => ({ from: day(), to: day() }) },
  { label: "Last 7 days", range: () => ({ from: day(-6), to: day() }) },
  { label: "Last 30 days", range: () => ({ from: day(-29), to: day() }) },
  {
    label: "This month",
    range: () => {
      const d = new Date()
      return { from: new Date(d.getFullYear(), d.getMonth(), 1), to: new Date(d.getFullYear(), d.getMonth() + 1, 0) }
    },
  },
  {
    label: "Last month",
    range: () => {
      const d = new Date()
      return { from: new Date(d.getFullYear(), d.getMonth() - 1, 1), to: new Date(d.getFullYear(), d.getMonth(), 0) }
    },
  },
  {
    label: "Year to date",
    range: () => ({ from: new Date(new Date().getFullYear(), 0, 1), to: day() }),
  },
]

function DateRangePicker({
  value: valueProp,
  defaultValue,
  onChange,
  placeholder = "Pick a date range",
  locale = "en-US",
  formatOptions = { month: "short", day: "numeric", year: "numeric" },
  presets = defaultPresets,
  numberOfMonths = 2,
  minDate,
  maxDate,
  disabledDates,
  disabled,
  clearable = true,
  align = "start",
  className,
  ...props
}: CommonProps & {
  value?: DateRange
  defaultValue?: DateRange
  onChange?: (range: DateRange | undefined) => void
  /** raccourcis à gauche, [] pr les masquer */
  presets?: Preset[]
  numberOfMonths?: 1 | 2
}) {
  const [open, setOpen] = React.useState(false)
  const [inner, setInner] = React.useState(defaultValue)
  const value = valueProp !== undefined ? valueProp : inner
  const [month, setMonth] = React.useState(() => value?.from ?? new Date())
  const fmt = React.useMemo(() => new Intl.DateTimeFormat(locale, formatOptions), [locale, formatOptions])
  const [activePreset, setActivePreset] = React.useState<string | null>(null)
  const id = React.useId()

  const change = (r: DateRange | undefined) => {
    if (valueProp === undefined) setInner(r)
    onChange?.(r)
  }

  const text = value?.from
    ? value.to && value.to.getTime() !== value.from.getTime()
      ? fmt.formatRange(value.from, value.to)
      : fmt.format(value.from)
    : undefined

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <button type="button" data-slot="date-range-picker" className={cn(triggerClass, className)} {...props}>
          <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
          <TriggerLabel text={text} placeholder={placeholder} />
          {clearable && value?.from ? (
            <ClearButton
              onClear={() => {
                change(undefined)
                setActivePreset(null)
              }}
            />
          ) : (
            <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out-expo group-data-[state=open]:rotate-180" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align={align} className="flex w-auto max-w-[calc(100vw-1rem)] flex-col p-0 sm:flex-row">
        {presets.length > 0 && (
          <div className="flex gap-1 overflow-x-auto border-b p-2 sm:w-40 sm:flex-col sm:border-r sm:border-b-0">
            {presets.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  const r = p.range()
                  change(r)
                  setActivePreset(p.label)
                  if (r.from) setMonth(numberOfMonths === 2 && r.to && r.from.getMonth() !== r.to.getMonth() ? r.from : r.to ?? r.from)
                }}
                className={cn(
                  "relative shrink-0 cursor-pointer rounded-md px-2.5 py-1.5 text-left text-[13px] whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground",
                  activePreset === p.label && "text-foreground"
                )}
              >
                {activePreset === p.label && (
                  <motion.span layoutId={`${id}-preset`} transition={{ type: "spring", stiffness: 520, damping: 34 }} className="absolute inset-0 rounded-md bg-accent" />
                )}
                <span className="relative">{p.label}</span>
              </button>
            ))}
          </div>
        )}
        <Calendar
          mode="range"
          selected={value}
          onSelect={(r) => {
            change(r)
            setActivePreset(null)
            if (r?.from && r.to) setTimeout(() => setOpen(false), 260)
          }}
          month={month}
          onMonthChange={setMonth}
          numberOfMonths={numberOfMonths}
          locale={locale}
          minDate={minDate}
          maxDate={maxDate}
          disabled={disabledDates}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker, DateRangePicker, type Preset as DateRangePreset }
