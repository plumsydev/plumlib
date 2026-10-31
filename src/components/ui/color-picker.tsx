"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Pipette } from "lucide-react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type Hsv = { h: number; s: number; v: number }

// conversions maison, pas besoin d'une lib de 40ko pr 3 formules
function hsvToRgb({ h, s, v }: Hsv) {
  const f = (n: number) => {
    const k = (n + h / 60) % 6
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1))
  }
  return [f(5), f(3), f(1)].map((x) => Math.round(x * 255)) as [number, number, number]
}

function rgbToHsv(r: number, g: number, b: number): Hsv {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const d = max - Math.min(r, g, b)
  let h = 0
  if (d) {
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
  }
  return { h: (h * 60 + 360) % 360, s: max ? d / max : 0, v: max }
}

function hexToHsv(hex: string): Hsv | null {
  const m = hex.trim().replace(/^#/, "")
  const full = m.length === 3 ? m.split("").map((c) => c + c).join("") : m
  if (!/^[0-9a-f]{6}$/i.test(full)) return null
  const n = parseInt(full, 16)
  return rgbToHsv((n >> 16) & 255, (n >> 8) & 255, n & 255)
}

function hsvToHex(hsv: Hsv) {
  return "#" + hsvToRgb(hsv).map((x) => x.toString(16).padStart(2, "0")).join("")
}

const defaultSwatches = ["#0f172a", "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#d946ef", "#ec4899"]

/** drag pointer générique, renvoie la position normalisée 0..1 */
function usePointerDrag(onMove: (x: number, y: number) => void) {
  const [dragging, setDragging] = React.useState(false)
  const handle = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    onMove(
      Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)),
      Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height))
    )
  }
  return {
    dragging,
    props: {
      onPointerDown: (e: React.PointerEvent<HTMLElement>) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        setDragging(true)
        handle(e)
      },
      onPointerMove: (e: React.PointerEvent<HTMLElement>) => dragging && handle(e),
      onPointerUp: () => setDragging(false),
      onPointerCancel: () => setDragging(false),
    },
  }
}

type ColorPickerPanelProps = {
  value: string
  onValueChange: (hex: string) => void
  swatches?: string[]
  className?: string
}

function ColorPickerPanel({ value, onValueChange, swatches = defaultSwatches, className }: ColorPickerPanelProps) {
  // on garde le hsv en interne sinon la teinte se perd qd on passe par le gris
  const [hsv, setHsv] = React.useState<Hsv>(() => hexToHsv(value) ?? { h: 270, s: 0.7, v: 0.8 })
  const [hexDraft, setHexDraft] = React.useState(value)
  const lastEmitted = React.useRef(value)
  const ringId = React.useId()

  React.useEffect(() => {
    if (value.toLowerCase() === lastEmitted.current.toLowerCase()) return
    const next = hexToHsv(value)
    if (next) setHsv(next)
    setHexDraft(value)
    lastEmitted.current = value
  }, [value])

  const update = (next: Hsv) => {
    setHsv(next)
    const hex = hsvToHex(next)
    lastEmitted.current = hex
    setHexDraft(hex)
    onValueChange(hex)
  }

  const area = usePointerDrag((x, y) => update({ ...hsv, s: x, v: 1 - y }))
  const hue = usePointerDrag((x) => update({ ...hsv, h: x * 360 }))
  const hex = hsvToHex(hsv)
  const hueColor = `hsl(${hsv.h} 100% 50%)`
  // détecté après le mount sinon le html serveur et client diffèrent
  const [canPick, setCanPick] = React.useState(false)
  React.useEffect(() => setCanPick("EyeDropper" in window), [])

  const keyNudge = (e: React.KeyboardEvent, kind: "area" | "hue") => {
    const d = e.shiftKey ? 0.1 : 0.01
    const k = e.key
    if (!k.startsWith("Arrow")) return
    e.preventDefault()
    if (kind === "hue") return update({ ...hsv, h: (hsv.h + (k === "ArrowRight" || k === "ArrowUp" ? 1 : -1) * d * 360 + 360) % 360 })
    const clamp = (n: number) => Math.min(1, Math.max(0, n))
    update({
      ...hsv,
      s: clamp(hsv.s + (k === "ArrowRight" ? d : k === "ArrowLeft" ? -d : 0)),
      v: clamp(hsv.v + (k === "ArrowUp" ? d : k === "ArrowDown" ? -d : 0)),
    })
  }

  return (
    <div data-slot="color-picker-panel" className={cn("grid gap-3", className)}>
      <div
        role="slider"
        aria-label="Saturation and brightness"
        aria-valuetext={`saturation ${Math.round(hsv.s * 100)}%, brightness ${Math.round(hsv.v * 100)}%`}
        tabIndex={0}
        onKeyDown={(e) => keyNudge(e, "area")}
        {...area.props}
        className="relative h-40 cursor-crosshair touch-none rounded-lg outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
        style={{ background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hueColor})` }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-black/10 ring-inset" />
        <span
          className={cn(
            "pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgb(0_0_0/0.2),0_2px_6px_rgb(0_0_0/0.3)]",
            "transition-[scale] duration-200 ease-spring",
            // pas de transition de position pendant le drag sinon le curseur traine derrière le doigt
            !area.dragging && "transition-[left,top,scale] duration-300 ease-out-expo",
            area.dragging && "scale-125"
          )}
          style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%`, background: hex }}
        />
      </div>

      <div className="flex items-center gap-2.5">
        <div
          role="slider"
          aria-label="Hue"
          aria-valuemin={0}
          aria-valuemax={360}
          aria-valuenow={Math.round(hsv.h)}
          tabIndex={0}
          onKeyDown={(e) => keyNudge(e, "hue")}
          {...hue.props}
          className="relative h-3 flex-1 cursor-pointer touch-none rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
          style={{ background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)" }}
        >
          <span
            className={cn(
              "pointer-events-none absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgb(0_0_0/0.2),0_2px_6px_rgb(0_0_0/0.3)]",
              !hue.dragging && "transition-[left,scale] duration-300 ease-out-expo",
              hue.dragging && "scale-125"
            )}
            style={{ left: `${(hsv.h / 360) * 100}%`, background: hueColor }}
          />
        </div>
        {canPick && (
          <button
            type="button"
            aria-label="Pick a color from the screen"
            onClick={async () => {
              try {
                const dropper = new (window as unknown as { EyeDropper: new () => { open: () => Promise<{ sRGBHex: string }> } }).EyeDropper()
                const { sRGBHex } = await dropper.open()
                const next = hexToHsv(sRGBHex)
                if (next) update(next)
              } catch {
                // annulé avec echap, rien à faire
              }
            }}
            className="grid size-7 cursor-pointer place-items-center rounded-md border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Pipette className="size-3.5" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="size-8 shrink-0 rounded-md border shadow-xs transition-colors duration-200" style={{ background: hex }} />
        <div className="relative flex-1">
          <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 font-mono text-xs text-muted-foreground">#</span>
          <input
            aria-label="Hex color"
            value={hexDraft.replace(/^#/, "")}
            maxLength={6}
            spellCheck={false}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^0-9a-f]/gi, "")
              setHexDraft("#" + raw)
              const next = raw.length === 6 || raw.length === 3 ? hexToHsv(raw) : null
              if (next) update(next)
            }}
            onBlur={() => setHexDraft(hex)}
            aria-invalid={!hexToHsv(hexDraft) || undefined}
            className="h-8 w-full rounded-md border border-input bg-background pr-2 pl-6 font-mono text-xs uppercase shadow-xs outline-none transition-[border-color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring aria-invalid:border-destructive dark:bg-input/20"
          />
        </div>
      </div>

      {swatches.length > 0 && (
        <div className="grid grid-cols-10 gap-1.5">
          {swatches.map((s) => {
            const active = s.toLowerCase() === hex.toLowerCase()
            return (
              <button
                key={s}
                type="button"
                aria-label={s}
                aria-pressed={active}
                onClick={() => {
                  const next = hexToHsv(s)
                  if (next) update(next)
                }}
                className="relative aspect-square cursor-pointer rounded-md transition-[scale] duration-200 ease-out-quart hover:scale-110 active:scale-95"
                style={{ background: s }}
              >
                {active && (
                  <motion.span
                    layoutId={`${ringId}-ring`}
                    transition={spring.snappy}
                    className="absolute -inset-[3px] rounded-[7px] ring-2 ring-foreground"
                  />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

type ColorPickerProps = {
  value?: string
  defaultValue?: string
  onValueChange?: (hex: string) => void
  swatches?: string[]
  disabled?: boolean
  className?: string
  align?: "start" | "center" | "end"
  children?: React.ReactNode
}

function ColorPicker({
  value: valueProp,
  defaultValue = "#8b5cf6",
  onValueChange,
  swatches,
  disabled,
  className,
  align = "start",
  children,
}: ColorPickerProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const value = valueProp ?? inner
  const set = (hex: string) => {
    if (valueProp === undefined) setInner(hex)
    onValueChange?.(hex)
  }

  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
        {children ?? (
          <button
            type="button"
            data-slot="color-picker-trigger"
            className={cn(
              "inline-flex h-9 cursor-pointer items-center gap-2 rounded-md border border-input bg-background pr-3 pl-1.5 font-mono text-sm uppercase shadow-xs dark:bg-input/20",
              "transition-[border-color,box-shadow] duration-200 outline-none hover:border-foreground/20 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring",
              "data-[state=open]:border-ring disabled:pointer-events-none disabled:opacity-50",
              className
            )}
          >
            <span className="size-6 rounded-[5px] border border-black/10 shadow-xs transition-colors duration-200" style={{ background: value }} />
            {value}
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent align={align} className="w-64 p-3">
        <ColorPickerPanel value={value} onValueChange={set} swatches={swatches} />
      </PopoverContent>
    </Popover>
  )
}

export { ColorPicker, ColorPickerPanel, hexToHsv, hsvToHex, type ColorPickerProps }
