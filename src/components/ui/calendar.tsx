"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"

type DateRange = { from?: Date; to?: Date }

type BaseProps = {
  /** mois affiché (contrôlé) */
  month?: Date
  defaultMonth?: Date
  onMonthChange?: (month: Date) => void
  numberOfMonths?: 1 | 2
  /** true => jour désactivé */
  disabled?: (date: Date) => boolean
  minDate?: Date
  maxDate?: Date
  /** 0 dimanche, 1 lundi */
  weekStartsOn?: 0 | 1
  locale?: string
  showOutsideDays?: boolean
  className?: string
  children?: React.ReactNode
}

type SingleProps = BaseProps & {
  mode?: "single"
  selected?: Date
  defaultSelected?: Date
  onSelect?: (date: Date | undefined) => void
}
type RangeProps = BaseProps & {
  mode: "range"
  selected?: DateRange
  defaultSelected?: DateRange
  onSelect?: (range: DateRange | undefined) => void
}
type MultipleProps = BaseProps & {
  mode: "multiple"
  selected?: Date[]
  defaultSelected?: Date[]
  onSelect?: (dates: Date[]) => void
}

type CalendarProps = SingleProps | RangeProps | MultipleProps

// petits helpers dates, pas besoin de sortir date-fns pr ça
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1)
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
const addMonths = (d: Date, n: number) => {
  const target = new Date(d.getFullYear(), d.getMonth() + n, 1)
  const last = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate()
  return new Date(target.getFullYear(), target.getMonth(), Math.min(d.getDate(), last))
}
const isSameDay = (a?: Date, b?: Date) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
const isSameMonth = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
const monthKey = (d: Date) => d.getFullYear() * 12 + d.getMonth()

function buildWeeks(month: Date, weekStartsOn: 0 | 1) {
  const first = startOfMonth(month)
  const offset = (first.getDay() - weekStartsOn + 7) % 7
  const start = addDays(first, -offset)
  // tjrs 6 semaines, comme ça la hauteur bouge pas qd on change de mois
  return Array.from({ length: 6 }, (_, w) => Array.from({ length: 7 }, (_, d) => addDays(start, w * 7 + d)))
}

function Calendar(props: CalendarProps) {
  const {
    month: monthProp,
    defaultMonth,
    onMonthChange,
    numberOfMonths = 1,
    disabled,
    minDate,
    maxDate,
    weekStartsOn = 1,
    locale = "en-US",
    showOutsideDays = true,
    className,
    children,
  } = props
  const mode = props.mode ?? "single"
  const id = React.useId()

  // valeur interne si pas contrôlé
  const [innerSelected, setInnerSelected] = React.useState<unknown>(props.defaultSelected)
  const selected = (props.selected !== undefined ? props.selected : innerSelected) as Date | DateRange | Date[] | undefined

  const initialMonth = React.useMemo(() => {
    if (defaultMonth) return startOfMonth(defaultMonth)
    const s = selected
    const anchor = s instanceof Date ? s : Array.isArray(s) ? s[0] : s?.from
    return startOfMonth(anchor ?? new Date())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [innerMonth, setInnerMonth] = React.useState(initialMonth)
  const month = monthProp ? startOfMonth(monthProp) : innerMonth
  const [direction, setDirection] = React.useState(0)
  const [focused, setFocused] = React.useState<Date>(() => startOfDay(new Date()))
  const [hovered, setHovered] = React.useState<Date | null>(null)
  const gridRef = React.useRef<HTMLDivElement>(null)
  const shouldFocus = React.useRef(false)

  const today = startOfDay(new Date())

  const isDisabled = React.useCallback(
    (d: Date) =>
      (minDate && d < startOfDay(minDate)) || (maxDate && d > startOfDay(maxDate)) || (disabled?.(d) ?? false),
    [minDate, maxDate, disabled]
  )

  const goTo = (next: Date) => {
    const m = startOfMonth(next)
    if (monthKey(m) === monthKey(month)) return
    setDirection(monthKey(m) > monthKey(month) ? 1 : -1)
    if (!monthProp) setInnerMonth(m)
    onMonthChange?.(m)
  }

  const canPrev = !minDate || monthKey(addMonths(month, -1)) >= monthKey(startOfMonth(minDate))
  const canNext = !maxDate || monthKey(addMonths(month, numberOfMonths)) <= monthKey(startOfMonth(maxDate))

  const commit = (value: unknown) => {
    if (props.selected === undefined) setInnerSelected(value)
    ;(props.onSelect as ((v: unknown) => void) | undefined)?.(value)
  }

  const select = (day: Date) => {
    if (isDisabled(day)) return
    if (mode === "single") {
      commit(isSameDay(selected as Date, day) ? undefined : day)
    } else if (mode === "multiple") {
      const list = (selected as Date[] | undefined) ?? []
      commit(list.some((d) => isSameDay(d, day)) ? list.filter((d) => !isSameDay(d, day)) : [...list, day])
    } else {
      const range = (selected as DateRange | undefined) ?? {}
      // 1er clic = début, 2e = fin, si on clique avant le début on repart de là
      if (!range.from || range.to) commit({ from: day, to: undefined })
      else if (day < range.from) commit({ from: day, to: range.from })
      else commit({ from: range.from, to: day })
    }
    if (!isSameMonth(day, month) && numberOfMonths === 1) goTo(day)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const moves: Record<string, (d: Date) => Date> = {
      ArrowLeft: (d) => addDays(d, -1),
      ArrowRight: (d) => addDays(d, 1),
      ArrowUp: (d) => addDays(d, -7),
      ArrowDown: (d) => addDays(d, 7),
      PageUp: (d) => addMonths(d, e.shiftKey ? -12 : -1),
      PageDown: (d) => addMonths(d, e.shiftKey ? 12 : 1),
      Home: (d) => addDays(d, -((d.getDay() - weekStartsOn + 7) % 7)),
      End: (d) => addDays(d, 6 - ((d.getDay() - weekStartsOn + 7) % 7)),
    }
    if (moves[e.key]) {
      e.preventDefault()
      const next = moves[e.key](focused)
      shouldFocus.current = true
      setFocused(next)
      const lastShown = addMonths(month, numberOfMonths - 1)
      if (monthKey(next) < monthKey(month)) goTo(next)
      else if (monthKey(next) > monthKey(lastShown)) goTo(addMonths(next, -(numberOfMonths - 1)))
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      select(focused)
    }
  }

  // le jour focus doit tjrs être visible, sinon on le recale sur le mois affiché
  React.useEffect(() => {
    const lastShown = addMonths(month, numberOfMonths - 1)
    if (monthKey(focused) < monthKey(month) || monthKey(focused) > monthKey(lastShown)) {
      const anchor = selected instanceof Date && isSameMonth(selected, month) ? selected : month
      setFocused(startOfDay(anchor))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, numberOfMonths])

  React.useEffect(() => {
    if (!shouldFocus.current) return
    shouldFocus.current = false
    // on attend que l'anim de mois ait monté les nouveaux boutons
    requestAnimationFrame(() =>
      gridRef.current?.querySelector<HTMLButtonElement>(`[data-day="${focused.toDateString()}"]:not([data-outside])`)?.focus()
    )
  }, [focused, month])

  const monthFormatter = React.useMemo(() => new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }), [locale])
  const dayLabel = React.useMemo(() => new Intl.DateTimeFormat(locale, { dateStyle: "full" }), [locale])
  const weekdays = React.useMemo(() => {
    const fmt = new Intl.DateTimeFormat(locale, { weekday: "short" })
    // 4 janv 2021 est un lundi, pratique pr générer les noms
    return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(2021, 0, 3 + weekStartsOn + i)).slice(0, 2))
  }, [locale, weekStartsOn])

  const range = mode === "range" ? ((selected as DateRange | undefined) ?? {}) : null
  // aperçu de la plage au survol tant que la fin est pas choisie
  const previewEnd = range?.from && !range.to && hovered ? hovered : undefined

  const dayState = (day: Date) => {
    if (mode === "single") return { selected: isSameDay(selected as Date, day) }
    if (mode === "multiple") return { selected: ((selected as Date[]) ?? []).some((d) => isSameDay(d, day)) }
    const from = range?.from
    const to = range?.to ?? previewEnd
    if (!from) return { selected: false }
    const [a, b] = to && to < from ? [to, from] : [from, to]
    const start = isSameDay(day, a)
    const end = !!b && isSameDay(day, b)
    const middle = !!b && day > a && day < b
    return { selected: start || end, start, end, middle, preview: !range?.to }
  }

  return (
    <div data-slot="calendar" className={cn("w-fit p-3 select-none", className)} onKeyDown={onKeyDown}>
      <div ref={gridRef} className={cn("relative flex gap-6", numberOfMonths === 2 && "flex-col sm:flex-row")}>
        {Array.from({ length: numberOfMonths }, (_, i) => {
          const current = addMonths(month, i)
          const weeks = buildWeeks(current, weekStartsOn)
          return (
            <div key={i} className="w-[15.75rem] space-y-3">
              <div className="relative flex h-8 items-center justify-center">
                {i === 0 && (
                  <NavButton side="left" disabled={!canPrev} onClick={() => goTo(addMonths(month, -1))} />
                )}
                <div className="relative h-5 flex-1 overflow-hidden text-center">
                  <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                      key={monthKey(current)}
                      custom={direction}
                      variants={{
                        enter: (dir: number) => ({ y: dir * 14, opacity: 0, filter: "blur(3px)" }),
                        center: { y: 0, opacity: 1, filter: "blur(0px)" },
                        exit: (dir: number) => ({ y: dir * -14, opacity: 0, filter: "blur(3px)" }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={spring.snappy}
                      aria-live="polite"
                      className="text-sm font-medium capitalize"
                    >
                      {monthFormatter.format(current)}
                    </motion.div>
                  </AnimatePresence>
                </div>
                {i === numberOfMonths - 1 && (
                  <NavButton side="right" disabled={!canNext} onClick={() => goTo(addMonths(month, 1))} />
                )}
              </div>

              <div role="grid" aria-label={monthFormatter.format(current)} className="space-y-1">
                <div role="row" className="grid grid-cols-7">
                  {weekdays.map((w) => (
                    <div role="columnheader" key={w} className="flex h-7 items-center justify-center text-[0.7rem] font-medium text-muted-foreground">
                      {w}
                    </div>
                  ))}
                </div>
                <div className="relative overflow-hidden">
                  <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                      key={monthKey(current)}
                      custom={direction}
                      variants={{
                        enter: (dir: number) => ({ x: dir * 48, opacity: 0, filter: "blur(4px)" }),
                        center: { x: 0, opacity: 1, filter: "blur(0px)" },
                        exit: (dir: number) => ({ x: dir * -48, opacity: 0, filter: "blur(4px)" }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ x: spring.smooth, opacity: { duration: 0.2 }, filter: { duration: 0.2 } }}
                      className="space-y-1"
                    >
                      {weeks.map((week, w) => (
                        <div role="row" key={w} className="grid grid-cols-7">
                          {week.map((day) => {
                            const outside = !isSameMonth(day, current)
                            if (outside && !showOutsideDays) return <div key={day.toISOString()} className="size-9" />
                            const st = dayState(day)
                            const off = isDisabled(day)
                            const isToday = isSameDay(day, today)
                            const isFocused = isSameDay(day, focused) && !outside
                            return (
                              <div
                                key={day.toISOString()}
                                role="gridcell"
                                aria-selected={st.selected || st.middle || undefined}
                                className={cn(
                                  "relative flex size-9 items-center justify-center",
                                  // la bande de la plage, collée d'une case à l'autre
                                  (st.middle || (st.start && (range?.to || previewEnd)) || st.end) &&
                                    "before:absolute before:inset-y-0.5 before:bg-accent",
                                  st.middle && "before:inset-x-0",
                                  st.start && !st.end && "before:right-0 before:left-1/2",
                                  st.end && !st.start && "before:right-1/2 before:left-0",
                                  st.start && st.end && "before:hidden",
                                  st.preview && "before:bg-accent/60"
                                )}
                              >
                                <button
                                  type="button"
                                  data-day={day.toDateString()}
                                  data-outside={outside || undefined}
                                  data-selected={st.selected || undefined}
                                  data-today={isToday || undefined}
                                  disabled={off}
                                  tabIndex={isFocused ? 0 : -1}
                                  aria-label={dayLabel.format(day)}
                                  aria-current={isToday ? "date" : undefined}
                                  onClick={() => {
                                    setFocused(day)
                                    select(day)
                                  }}
                                  onFocus={() => !outside && setFocused(day)}
                                  onMouseEnter={() => setHovered(day)}
                                  onMouseLeave={() => setHovered(null)}
                                  className={cn(
                                    "relative z-10 flex size-8 cursor-pointer items-center justify-center rounded-md text-sm tabular-nums transition-[background-color,color,transform,translate,scale,rotate] duration-150",
                                    "outline-none hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring active:scale-90",
                                    outside && "text-muted-foreground/50",
                                    st.middle && "hover:bg-foreground/10",
                                    st.selected && "text-primary-foreground hover:bg-transparent",
                                    off && "cursor-not-allowed text-muted-foreground/40 line-through decoration-muted-foreground/40 hover:bg-transparent active:scale-100"
                                  )}
                                >
                                  {st.selected && (
                                    <motion.span
                                      // en single la pastille glisse d'un jour à l'autre
                                      layoutId={mode === "single" ? `${id}-selected` : undefined}
                                      initial={mode === "single" ? false : { scale: 0.5, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                      transition={spring.snappy}
                                      className={cn("absolute inset-0 -z-10 rounded-md bg-primary shadow-sm", st.preview && "bg-primary/70")}
                                    />
                                  )}
                                  {day.getDate()}
                                  {isToday && (
                                    <span
                                      className={cn(
                                        "absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-brand",
                                        st.selected && "bg-primary-foreground"
                                      )}
                                    />
                                  )}
                                </button>
                              </div>
                            )
                          })}
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {children && <div className="mt-3 border-t pt-3">{children}</div>}
    </div>
  )
}

function NavButton({ side, ...props }: React.ComponentProps<"button"> & { side: "left" | "right" }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      aria-label={side === "left" ? "Previous month" : "Next month"}
      className={cn(
        "absolute top-0 z-10 inline-flex size-8 cursor-pointer items-center justify-center rounded-md border bg-background text-muted-foreground shadow-xs",
        "transition-[background-color,color,transform,translate,scale,rotate,opacity] duration-150 outline-none hover:bg-accent hover:text-foreground active:scale-90",
        "focus-visible:ring-[3px] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 dark:bg-input/20",
        side === "left" ? "left-0 active:[&_svg]:-translate-x-0.5" : "right-0 active:[&_svg]:translate-x-0.5",
        "[&_svg]:size-4 [&_svg]:transition-transform"
      )}
      {...props}
    >
      <Icon />
    </button>
  )
}

export { Calendar, type CalendarProps, type DateRange }
