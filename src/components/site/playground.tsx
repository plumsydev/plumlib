"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { CopyIconButton } from "./copy"

export type Control =
  | { type: "select"; options: readonly string[]; default: string; label?: string }
  | { type: "boolean"; default: boolean; label?: string }
  | { type: "text"; default: string; label?: string }
  | { type: "number"; default: number; min: number; max: number; step?: number; label?: string }

type ValueOf<C extends Control> = C extends { type: "boolean" }
  ? boolean
  : C extends { type: "number" }
    ? number
    : C extends { type: "select"; options: readonly (infer O)[] }
      ? O
      : string

export type Values<C extends Record<string, Control>> = { [K in keyof C]: ValueOf<C[K]> }

type PlaygroundProps<C extends Record<string, Control>> = {
  controls: C
  render: (values: Values<C>) => React.ReactNode
  code: (values: Values<C>) => string
  /** classes en plus pr la zone d'aperçu */
  previewClassName?: string
}

/**
 * transforme un objet de props en attributs jsx
 * les valeurs égales au défaut, false, undefined et "" sautent
 */
export function jsxProps(props: Record<string, unknown>, defaults: Record<string, unknown> = {}) {
  return Object.entries(props)
    .filter(([k, v]) => v !== undefined && v !== false && v !== "" && v !== defaults[k])
    .map(([k, v]) => (v === true ? ` ${k}` : typeof v === "string" ? ` ${k}="${v}"` : ` ${k}={${JSON.stringify(v)}}`))
    .join("")
}

function defaultsOf<C extends Record<string, Control>>(controls: C) {
  return Object.fromEntries(Object.entries(controls).map(([k, c]) => [k, c.default])) as Values<C>
}

// shiki chargé à la demande côté client, une seule fois pr tt les playgrounds
let shikiPromise: Promise<typeof import("shiki/bundle/web")> | null = null
function useHighlighted(code: string) {
  const [html, setHtml] = React.useState<string | null>(null)
  React.useEffect(() => {
    let alive = true
    shikiPromise ??= import("shiki/bundle/web")
    shikiPromise.then(({ codeToHtml }) =>
      codeToHtml(code, {
        lang: "tsx",
        themes: { light: "github-light-default", dark: "github-dark-default" },
        defaultColor: false,
      }).then((out) => alive && setHtml(out))
    )
    return () => {
      alive = false
    }
  }, [code])
  return html
}

export function Playground<const C extends Record<string, Control>>({ controls, render, code, previewClassName }: PlaygroundProps<C>) {
  const [values, setValues] = React.useState<Values<C>>(() => defaultsOf(controls))
  const set = (key: keyof C, value: unknown) => setValues((v) => ({ ...v, [key]: value }))
  const source = code(values)
  const html = useHighlighted(source)
  const id = React.useId()

  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="grid md:grid-cols-[1fr_15rem]">
        <div
          className={cn(
            "relative flex min-h-80 items-center justify-center overflow-hidden bg-background p-8",
            previewClassName
          )}
        >
          <div className="bg-dots pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div className="relative flex w-full items-center justify-center">{render(values)}</div>
        </div>

        <div className="space-y-4 border-t bg-muted/30 p-4 md:border-t-0 md:border-l">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Props</span>
            <button
              type="button"
              onClick={() => setValues(defaultsOf(controls))}
              className="inline-flex cursor-pointer items-center gap-1 rounded-md px-1.5 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:[&_svg]:-rotate-180 [&_svg]:transition-transform [&_svg]:duration-500"
            >
              <RotateCcw className="size-3" /> Reset
            </button>
          </div>
          {Object.entries(controls).map(([key, control]) => {
            const value = values[key as keyof C] as unknown
            const label = control.label ?? key
            const fieldId = `${id}-${key}`
            if (control.type === "boolean") {
              return (
                <div key={key} className="flex items-center justify-between gap-3">
                  <Label htmlFor={fieldId} className="font-mono text-xs">{label}</Label>
                  <Switch id={fieldId} size="sm" checked={value as boolean} onCheckedChange={(v) => set(key, v)} />
                </div>
              )
            }
            return (
              <div key={key} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor={fieldId} className="font-mono text-xs">{label}</Label>
                  {control.type === "number" && (
                    <span className="font-mono text-xs text-muted-foreground tabular-nums">{value as number}</span>
                  )}
                </div>
                {control.type === "select" && control.options.length <= 3 && control.options.join("").length <= 18 ? (
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    size="sm"
                    value={value as string}
                    onValueChange={(v) => v && set(key, v)}
                    className="w-full"
                  >
                    {control.options.map((o) => (
                      <ToggleGroupItem key={o} value={o} className="flex-1 font-mono text-[11px]">
                        {o}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                ) : control.type === "select" ? (
                  <Select value={value as string} onValueChange={(v) => set(key, v)}>
                    <SelectTrigger id={fieldId} size="sm" className="w-full font-mono text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {control.options.map((o) => (
                        <SelectItem key={o} value={o} className="font-mono text-xs">
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : control.type === "number" ? (
                  <Slider
                    id={fieldId}
                    value={[value as number]}
                    min={control.min}
                    max={control.max}
                    step={control.step ?? 1}
                    onValueChange={([v]) => set(key, v)}
                  />
                ) : (
                  <Input id={fieldId} size="sm" value={value as string} onChange={(e) => set(key, e.target.value)} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="group/code relative border-t bg-muted/40 dark:bg-card">
        <CopyIconButton value={source} className="absolute top-2.5 right-2.5 z-10" />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={html ? "hl" : "raw"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-h-72 overflow-auto px-4 py-3.5 pr-12 font-mono text-[13px] leading-[1.7]"
          >
            {html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : <pre>{source}</pre>}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
