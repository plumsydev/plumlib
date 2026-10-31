"use client"

import * as React from "react"
import { AnimatePresence, motion, useInView } from "motion/react"
import { cn } from "@/lib/utils"

type Datum = Record<string, string | number>

type Series = {
  key: string
  label?: string
  /** n'importe quelle couleur css, par défaut une palette dérivée des tokens */
  color?: string
}

type BaseChartProps = Omit<React.ComponentProps<"div">, "children"> & {
  data: Datum[]
  /** clé de l'axe x */
  index: string
  series: Series[]
  height?: number
  grid?: boolean
  xAxis?: boolean
  yAxis?: boolean
  legend?: boolean
  tooltip?: boolean
  valueFormatter?: (value: number) => string
}

const palette = ["var(--chart-1, var(--brand))", "var(--chart-2, var(--info))", "var(--chart-3, var(--success))", "var(--chart-4, var(--warning))", "var(--chart-5, var(--muted-foreground))"]

const PAD = { top: 12, right: 12, bottom: 28, left: 44 }

function useWidth() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [width, setWidth] = React.useState(0)
  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(el)
    setWidth(el.getBoundingClientRect().width)
    return () => ro.disconnect()
  }, [])
  return [ref, width] as const
}

// des graduations rondes (1 2 5 10…), sinon on se retrouve avec des axes à 37.4
function niceTicks(max: number, count = 4) {
  if (max <= 0) return [0, 1]
  const raw = max / count
  const mag = 10 ** Math.floor(Math.log10(raw))
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? raw
  const top = Math.ceil(max / step) * step
  return Array.from({ length: Math.round(top / step) + 1 }, (_, i) => i * step)
}

// courbe monotone (fritsch carlson), lisse sans dépasser les points comme une bezier naive
function monotonePath(points: [number, number][]) {
  const n = points.length
  if (n === 0) return ""
  if (n === 1) return `M${points[0][0]},${points[0][1]}`
  const dx: number[] = []
  const slope: number[] = []
  for (let i = 0; i < n - 1; i++) {
    dx.push(points[i + 1][0] - points[i][0])
    slope.push((points[i + 1][1] - points[i][1]) / (dx[i] || 1))
  }
  const t: number[] = [slope[0]]
  for (let i = 1; i < n - 1; i++) {
    t.push(slope[i - 1] * slope[i] <= 0 ? 0 : (3 * (dx[i - 1] + dx[i])) / ((2 * dx[i] + dx[i - 1]) / slope[i - 1] + (dx[i] + 2 * dx[i - 1]) / slope[i]))
  }
  t.push(slope[n - 2])
  let d = `M${points[0][0]},${points[0][1]}`
  for (let i = 0; i < n - 1; i++) {
    const [x0, y0] = points[i]
    const [x1, y1] = points[i + 1]
    const h = dx[i] / 3
    d += `C${x0 + h},${y0 + h * t[i]},${x1 - h},${y1 - h * t[i + 1]},${x1},${y1}`
  }
  return d
}

function linearPath(points: [number, number][]) {
  return points.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join("")
}

const defaultFormat = (v: number) => new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(v)

function useChartState(series: Series[]) {
  const [hidden, setHidden] = React.useState<string[]>([])
  const colored = series.map((s, i) => ({ ...s, color: s.color ?? palette[i % palette.length], label: s.label ?? s.key }))
  const shown = colored.filter((s) => !hidden.includes(s.key))
  const toggle = (key: string) =>
    setHidden((h) => (h.includes(key) ? h.filter((k) => k !== key) : h.length < series.length - 1 ? [...h, key] : h))
  return { colored, shown, hidden, toggle }
}

function ChartLegend({ series, hidden, onToggle }: { series: Required<Series>[]; hidden: string[]; onToggle: (key: string) => void }) {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-center gap-1">
      {series.map((s) => {
        const off = hidden.includes(s.key)
        return (
          <button
            key={s.key}
            type="button"
            onClick={() => onToggle(s.key)}
            aria-pressed={!off}
            className="flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-[color,background-color,opacity] hover:bg-accent hover:text-foreground aria-[pressed=false]:opacity-45"
          >
            <span className="size-2 rounded-[3px] transition-transform duration-300 ease-spring" style={{ background: s.color, scale: off ? 0.6 : 1 }} />
            {s.label}
          </button>
        )
      })}
    </div>
  )
}

function ChartTooltip({
  x,
  width,
  label,
  rows,
  format,
}: {
  x: number
  width: number
  label: string
  rows: { label: string; color: string; value: number }[]
  format: (v: number) => string
}) {
  // le tooltip change de coté qd il approche du bord droit
  const flip = x > width * 0.62
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, filter: "blur(2px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)", x: flip ? x - 12 : x + 12 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 500, damping: 40, opacity: { duration: 0.12 } }}
      style={{ translateX: flip ? "-100%" : "0%" }}
      className="pointer-events-none absolute top-2 left-0 z-10 min-w-36 rounded-lg border bg-popover/95 px-3 py-2 text-xs shadow-lg backdrop-blur"
    >
      <div className="mb-1.5 font-medium">{label}</div>
      <div className="space-y-1">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-2">
            <span className="size-2 rounded-[3px]" style={{ background: r.color }} />
            <span className="text-muted-foreground">{r.label}</span>
            <span className="ml-auto pl-3 font-medium tabular-nums">{format(r.value)}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function Axes({
  ticks,
  y,
  labels,
  xs,
  width,
  height,
  grid,
  xAxis,
  yAxis,
  format,
}: {
  ticks: number[]
  y: (v: number) => number
  labels: string[]
  xs: number[]
  width: number
  height: number
  grid: boolean
  xAxis: boolean
  yAxis: boolean
  format: (v: number) => string
}) {
  // on saute des labels x qd y en a trop pr la largeur dispo
  const every = Math.max(1, Math.ceil(labels.length / Math.max(1, Math.floor((width - PAD.left) / 56))))
  return (
    <g className="text-[11px]">
      {ticks.map((t) => (
        <g key={t}>
          {grid && (
            <line x1={PAD.left} x2={width - PAD.right} y1={y(t)} y2={y(t)} stroke="currentColor" className="text-border" strokeDasharray={t === 0 ? undefined : "3 4"} />
          )}
          {yAxis && (
            <text x={PAD.left - 10} y={y(t)} dy="0.32em" textAnchor="end" className="fill-muted-foreground tabular-nums">
              {format(t)}
            </text>
          )}
        </g>
      ))}
      {xAxis &&
        labels.map((l, i) =>
          i % every === 0 ? (
            <text key={i} x={xs[i]} y={height - 8} textAnchor="middle" className="fill-muted-foreground">
              {l}
            </text>
          ) : null
        )}
    </g>
  )
}

type AreaChartProps = BaseChartProps & {
  curve?: "smooth" | "linear"
  /** false => line chart */
  fill?: boolean
  stacked?: boolean
  dots?: boolean
}

function AreaChart({
  data,
  index,
  series,
  height = 260,
  grid = true,
  xAxis = true,
  yAxis = true,
  legend = true,
  tooltip = true,
  curve = "smooth",
  fill = true,
  stacked = false,
  dots = false,
  valueFormatter = defaultFormat,
  className,
  ...props
}: AreaChartProps) {
  const [ref, width] = useWidth()
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const { colored, shown, hidden, toggle } = useChartState(series)
  const [hover, setHover] = React.useState<number | null>(null)
  const gradId = React.useId().replace(/:/g, "")

  const n = data.length
  const innerW = Math.max(0, width - PAD.left - PAD.right)
  const innerH = height - PAD.top - PAD.bottom
  const xs = data.map((_, i) => PAD.left + (n <= 1 ? innerW / 2 : (i / (n - 1)) * innerW))

  // empilement : chaque série démarre là où la précédente s'arrete
  const stacks = shown.map((s, si) =>
    data.map((d, i) => {
      const below = stacked ? shown.slice(0, si).reduce((sum, p) => sum + Number(data[i][p.key] ?? 0), 0) : 0
      return { low: below, high: below + Number(d[s.key] ?? 0) }
    })
  )
  const maxVal = Math.max(1, ...stacks.flat().map((p) => p.high))
  const ticks = niceTicks(maxVal)
  const top = ticks[ticks.length - 1]
  const y = (v: number) => PAD.top + innerH - (v / top) * innerH
  const path = curve === "smooth" ? monotonePath : linearPath

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = e.clientX - rect.left
    let best = 0
    xs.forEach((x, i) => Math.abs(x - px) < Math.abs(xs[best] - px) && (best = i))
    setHover(best)
  }

  return (
    <div data-slot="chart" className={cn("w-full", className)} {...props}>
      <div ref={ref} className="relative w-full" style={{ height }}>
        {width > 0 && (
          <svg width={width} height={height} className="overflow-visible" onPointerMove={tooltip ? onMove : undefined} onPointerLeave={() => setHover(null)}>
            <defs>
              {shown.map((s) => (
                <linearGradient key={s.key} id={`${gradId}-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={s.color} stopOpacity={0.32} />
                  <stop offset="100%" stopColor={s.color} stopOpacity={0.02} />
                </linearGradient>
              ))}
              {/* on révèle la zone de gauche à droite en meme temps que la ligne se dessine */}
              <clipPath id={`${gradId}-reveal`}>
                <motion.rect
                  x={0}
                  y={0}
                  height={height}
                  initial={{ width: 0 }}
                  animate={{ width: inView ? width : 0 }}
                  transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
                />
              </clipPath>
            </defs>
            <Axes ticks={ticks} y={y} labels={data.map((d) => String(d[index]))} xs={xs} width={width} height={height} grid={grid} xAxis={xAxis} yAxis={yAxis} format={valueFormatter} />

            <g clipPath={`url(#${gradId}-reveal)`}>
              {shown.map((s, si) => {
                const highs = stacks[si].map((p, i) => [xs[i], y(p.high)] as [number, number])
                const lows = stacks[si].map((p, i) => [xs[i], y(p.low)] as [number, number]).reverse()
                const line = path(highs)
                // le bas de la zone suit la meme courbe que le haut de la série d'en dessous, pas de trou
                const areaD = `${line}${path(lows).replace(/^M/, "L")}Z`
                return (
                  <g key={s.key}>
                    {fill && (
                      <motion.path
                        initial={false}
                        animate={{ d: areaD }}
                        transition={{ type: "spring", stiffness: 160, damping: 26 }}
                        fill={`url(#${gradId}-${s.key})`}
                      />
                    )}
                    <motion.path
                      initial={false}
                      animate={{ d: line }}
                      transition={{ type: "spring", stiffness: 160, damping: 26 }}
                      fill="none"
                      stroke={s.color}
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {dots &&
                      highs.map(([cx, cy], i) => (
                        <motion.circle key={i} initial={false} animate={{ cx, cy }} r={3} fill="var(--background)" stroke={s.color} strokeWidth={2} />
                      ))}
                  </g>
                )
              })}
            </g>

            {hover !== null && (
              <g pointerEvents="none">
                <motion.line
                  initial={false}
                  animate={{ x1: xs[hover], x2: xs[hover] }}
                  transition={{ type: "spring", stiffness: 600, damping: 45 }}
                  y1={PAD.top}
                  y2={PAD.top + innerH}
                  stroke="currentColor"
                  className="text-foreground/25"
                  strokeDasharray="3 3"
                />
                {shown.map((s, si) => (
                  <motion.circle
                    key={s.key}
                    initial={false}
                    animate={{ cx: xs[hover], cy: y(stacks[si][hover].high) }}
                    transition={{ type: "spring", stiffness: 600, damping: 45 }}
                    r={4.5}
                    fill={s.color}
                    stroke="var(--background)"
                    strokeWidth={2}
                  />
                ))}
              </g>
            )}
          </svg>
        )}
        <AnimatePresence>
          {tooltip && hover !== null && (
            <ChartTooltip
              key="tip"
              x={xs[hover]}
              width={width}
              label={String(data[hover][index])}
              rows={shown.map((s) => ({ label: s.label, color: s.color, value: Number(data[hover][s.key] ?? 0) }))}
              format={valueFormatter}
            />
          )}
        </AnimatePresence>
      </div>
      {legend && series.length > 1 && <ChartLegend series={colored} hidden={hidden} onToggle={toggle} />}
    </div>
  )
}

function LineChart(props: Omit<AreaChartProps, "fill">) {
  return <AreaChart {...props} fill={false} />
}

type BarChartProps = BaseChartProps & {
  stacked?: boolean
  radius?: number
}

function BarChart({
  data,
  index,
  series,
  height = 260,
  grid = true,
  xAxis = true,
  yAxis = true,
  legend = true,
  tooltip = true,
  stacked = false,
  radius = 4,
  valueFormatter = defaultFormat,
  className,
  ...props
}: BarChartProps) {
  const [ref, width] = useWidth()
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const { colored, shown, hidden, toggle } = useChartState(series)
  const [hover, setHover] = React.useState<number | null>(null)

  const n = data.length
  const innerW = Math.max(0, width - PAD.left - PAD.right)
  const innerH = height - PAD.top - PAD.bottom
  const band = innerW / Math.max(n, 1)
  const xs = data.map((_, i) => PAD.left + band * i + band / 2)
  const groupW = band * 0.68
  const barW = stacked ? groupW : groupW / Math.max(shown.length, 1)

  const totals = data.map((d) => (stacked ? shown.reduce((s, p) => s + Number(d[p.key] ?? 0), 0) : Math.max(0, ...shown.map((p) => Number(d[p.key] ?? 0)))))
  const ticks = niceTicks(Math.max(1, ...totals))
  const top = ticks[ticks.length - 1]
  const y = (v: number) => PAD.top + innerH - (v / top) * innerH

  return (
    <div data-slot="chart" className={cn("w-full", className)} {...props}>
      <div ref={ref} className="relative w-full" style={{ height }}>
        {width > 0 && (
          <svg
            width={width}
            height={height}
            className="overflow-visible"
            onPointerMove={(e) => {
              if (!tooltip) return
              const px = e.clientX - e.currentTarget.getBoundingClientRect().left
              const i = Math.floor((px - PAD.left) / band)
              setHover(i >= 0 && i < n ? i : null)
            }}
            onPointerLeave={() => setHover(null)}
          >
            <Axes ticks={ticks} y={y} labels={data.map((d) => String(d[index]))} xs={xs} width={width} height={height} grid={grid} xAxis={xAxis} yAxis={yAxis} format={valueFormatter} />
            {hover !== null && (
              <motion.rect
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: PAD.left + band * hover + band * 0.06 }}
                transition={{ type: "spring", stiffness: 600, damping: 45 }}
                y={PAD.top}
                width={band * 0.88}
                height={innerH}
                rx={6}
                className="fill-foreground/5"
              />
            )}
            {data.map((d, i) => {
              let acc = 0
              return shown.map((s, si) => {
                const v = Number(d[s.key] ?? 0)
                const x = stacked ? xs[i] - groupW / 2 : xs[i] - groupW / 2 + barW * si
                const y0 = stacked ? acc : 0
                acc += v
                const yTop = y(y0 + v)
                const h = y(y0) - yTop
                const dim = hover !== null && hover !== i
                return (
                  <motion.rect
                    key={`${i}-${s.key}`}
                    x={x + (stacked ? 0 : 1)}
                    width={Math.max(0, barW - (stacked ? 0 : 2))}
                    rx={Math.min(radius, barW / 2)}
                    fill={s.color}
                    // les barres poussent depuis le bas une par une à l'entrée
                    initial={{ y: PAD.top + innerH, height: 0 }}
                    animate={inView ? { y: yTop, height: Math.max(0, h), opacity: dim ? 0.45 : 1 } : { y: PAD.top + innerH, height: 0 }}
                    transition={{
                      y: { type: "spring", stiffness: 170, damping: 22, delay: inView ? i * 0.035 : 0 },
                      height: { type: "spring", stiffness: 170, damping: 22, delay: inView ? i * 0.035 : 0 },
                      opacity: { duration: 0.2 },
                    }}
                  />
                )
              })
            })}
          </svg>
        )}
        <AnimatePresence>
          {tooltip && hover !== null && (
            <ChartTooltip
              key="tip"
              x={xs[hover]}
              width={width}
              label={String(data[hover][index])}
              rows={shown.map((s) => ({ label: s.label, color: s.color, value: Number(data[hover][s.key] ?? 0) }))}
              format={valueFormatter}
            />
          )}
        </AnimatePresence>
      </div>
      {legend && series.length > 1 && <ChartLegend series={colored} hidden={hidden} onToggle={toggle} />}
    </div>
  )
}

type SparklineProps = Omit<React.ComponentProps<"svg">, "children" | "fill" | "width" | "height"> & {
  data: number[]
  color?: string
  fill?: boolean
  width?: number
  height?: number
}

function Sparkline({ data, color = "var(--brand)", fill = true, width = 120, height = 32, className, ...props }: SparklineProps) {
  const id = React.useId().replace(/:/g, "")
  const max = Math.max(...data)
  const min = Math.min(...data)
  const pts = data.map((v, i) => [(i / Math.max(1, data.length - 1)) * width, height - 2 - ((v - min) / (max - min || 1)) * (height - 4)] as [number, number])
  const line = monotonePath(pts)
  return (
    <svg data-slot="sparkline" width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className={cn("overflow-visible", className)} {...props}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      {fill && <motion.path initial={false} animate={{ d: `${line}L${width},${height}L0,${height}Z` }} fill={`url(#${id})`} />}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ d: line, pathLength: 1 }}
        transition={{ pathLength: { duration: 1, ease: [0.65, 0, 0.35, 1] }, d: { type: "spring", stiffness: 160, damping: 26 } }}
        fill="none"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export { AreaChart, LineChart, BarChart, Sparkline, type Series as ChartSeries, type AreaChartProps, type BarChartProps }
