"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"
import { inputVariants, type InputProps } from "@/components/ui/input"

const draw = [0.65, 0, 0.35, 1] as const

type Requirement = { label: string; test: (value: string) => boolean }

const defaultRequirements: Requirement[] = [
  { label: "At least 8 characters", test: (v) => v.length >= 8 },
  { label: "Upper and lowercase letters", test: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v) },
  { label: "A number", test: (v) => /\d/.test(v) },
  { label: "A symbol", test: (v) => /[^A-Za-z0-9]/.test(v) },
]

const levels = [
  { label: "Too weak", color: "bg-destructive", text: "text-destructive" },
  { label: "Weak", color: "bg-destructive", text: "text-destructive" },
  { label: "Fair", color: "bg-warning", text: "text-warning" },
  { label: "Good", color: "bg-success", text: "text-success" },
  { label: "Strong", color: "bg-success", text: "text-success" },
]

/** score de 0 à 4, simple mais ça suffit pr guider */
function getStrength(value: string, requirements: Requirement[] = defaultRequirements) {
  if (!value) return 0
  const passed = requirements.filter((r) => r.test(value)).length
  const bonus = value.length >= 14 ? 1 : 0
  return Math.min(4, Math.round((passed / requirements.length) * 3) + bonus)
}

type PasswordInputProps = Omit<InputProps, "type"> & {
  /** affiche la jauge de force sous le champ */
  showStrength?: boolean
  /** affiche la checklist des règles, true pr celles par défaut */
  requirements?: boolean | Requirement[]
  containerClassName?: string
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  // oeil fait main, le trait barré se dessine et la pupille se rétracte
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden>
      <path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z" />
      <motion.circle
        cx="12"
        cy="12"
        initial={false}
        animate={{ r: hidden ? 1.2 : 3, opacity: hidden ? 0.4 : 1 }}
        transition={spring.snappy}
      />
      <motion.path
        d="M4 4L20 20"
        initial={false}
        animate={{ pathLength: hidden ? 1 : 0, opacity: hidden ? 1 : 0 }}
        transition={{ pathLength: { duration: 0.35, ease: draw }, opacity: { duration: 0.1 } }}
      />
    </svg>
  )
}

function PasswordInput({
  className,
  containerClassName,
  size,
  showStrength = false,
  requirements = false,
  value: valueProp,
  defaultValue,
  onChange,
  disabled,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = React.useState(false)
  const [inner, setInner] = React.useState(String(defaultValue ?? ""))
  const value = valueProp !== undefined ? String(valueProp) : inner
  const rules = Array.isArray(requirements) ? requirements : defaultRequirements
  const score = getStrength(value, rules)
  const level = levels[score]

  return (
    <div data-slot="password-input" className={cn("grid gap-2", containerClassName)}>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          data-slot="input"
          autoComplete="current-password"
          spellCheck={false}
          value={value}
          disabled={disabled}
          onChange={(e) => {
            if (valueProp === undefined) setInner(e.target.value)
            onChange?.(e)
          }}
          className={cn(inputVariants({ size }), "pr-10", !visible && value && "tracking-[0.18em]", className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          disabled={disabled}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-10 cursor-pointer items-center justify-center rounded-r-md text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground disabled:pointer-events-none"
        >
          <EyeIcon hidden={!visible} />
        </button>
      </div>

      {showStrength && (
        <div className="grid gap-1.5" aria-live="polite">
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={false}
                  animate={{ scaleX: value && i < Math.max(1, score) ? 1 : 0 }}
                  transition={{ ...spring.smooth, delay: i * 0.04 }}
                  className={cn("h-full origin-left rounded-full transition-colors duration-300", level.color)}
                />
              </div>
            ))}
          </div>
          <div className="flex h-4 items-center justify-between text-xs">
            <span className="text-muted-foreground">Password strength</span>
            <AnimatePresence mode="popLayout" initial={false}>
              {value && (
                <motion.span
                  key={level.label}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={spring.snappy}
                  className={cn("font-medium", level.text)}
                >
                  {level.label}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {requirements && (
        <ul className="grid gap-1.5 text-xs">
          {rules.map((rule) => {
            const ok = rule.test(value)
            return (
              <li key={rule.label} className={cn("flex items-center gap-2 transition-colors duration-200", ok ? "text-foreground" : "text-muted-foreground")}>
                <span
                  className={cn(
                    "grid size-3.5 place-items-center rounded-full border transition-[background-color,border-color] duration-200",
                    ok ? "border-success bg-success text-background" : "border-input"
                  )}
                >
                  <svg viewBox="0 0 12 12" fill="none" className="size-2.5" aria-hidden>
                    <motion.path
                      d="M2.5 6.2L5 8.5L9.5 3.5"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={false}
                      animate={{ pathLength: ok ? 1 : 0, opacity: ok ? 1 : 0 }}
                      transition={{ pathLength: { duration: 0.35, ease: draw }, opacity: { duration: 0.05 } }}
                    />
                  </svg>
                </span>
                {rule.label}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export { PasswordInput, getStrength, type PasswordInputProps }
