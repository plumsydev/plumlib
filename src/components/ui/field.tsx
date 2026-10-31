"use client"

import * as React from "react"
import { Slot } from "radix-ui"
import { AnimatePresence, motion } from "motion/react"
import { CircleAlert } from "lucide-react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"
import { Label } from "@/components/ui/label"

type FieldContextValue = {
  id: string
  descriptionId: string
  errorId: string
  invalid: boolean
  disabled: boolean
  hasError: boolean
  setHasError: (v: boolean) => void
}

const FieldContext = React.createContext<FieldContextValue | null>(null)

function useField() {
  return React.useContext(FieldContext)
}

function Field({
  className,
  orientation = "vertical",
  invalid = false,
  disabled = false,
  id: idProp,
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: "vertical" | "horizontal"
  invalid?: boolean
  disabled?: boolean
}) {
  const reactId = React.useId()
  const id = idProp ?? `field-${reactId}`
  const [hasError, setHasError] = React.useState(false)

  const value = React.useMemo<FieldContextValue>(
    () => ({
      id,
      descriptionId: `${id}-description`,
      errorId: `${id}-error`,
      invalid,
      disabled,
      hasError,
      setHasError,
    }),
    [id, invalid, disabled, hasError]
  )

  return (
    <FieldContext.Provider value={value}>
      <div
        role="group"
        data-slot="field"
        data-orientation={orientation}
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
        className={cn(
          "group/field flex w-full gap-2 data-[disabled]:opacity-60",
          orientation === "vertical" ? "flex-col" : "flex-row items-center justify-between [&>[data-slot=field-content]]:flex-1",
          className
        )}
        {...props}
      />
    </FieldContext.Provider>
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="field-content" className={cn("flex flex-col gap-1", className)} {...props} />
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  const field = useField()
  return (
    <Label
      data-slot="field-label"
      htmlFor={field?.id}
      className={cn("group-data-[invalid]/field:text-destructive transition-colors duration-200", className)}
      {...props}
    />
  )
}

// colle les bons id et aria sur l'input enfant, comme ça les lecteurs d'écran captent tt
function FieldControl(props: React.ComponentProps<typeof Slot.Root>) {
  const field = useField()
  if (!field) return <Slot.Root data-slot="field-control" {...props} />
  const describedBy = [field.descriptionId, field.invalid && field.hasError ? field.errorId : null]
    .filter(Boolean)
    .join(" ")
  return (
    <Slot.Root
      data-slot="field-control"
      id={field.id}
      aria-describedby={describedBy}
      aria-invalid={field.invalid || undefined}
      {...(field.disabled ? { disabled: true } : {})}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  const field = useField()
  return (
    <p
      data-slot="field-description"
      id={field?.descriptionId}
      className={cn("text-sm leading-normal text-muted-foreground", className)}
      {...props}
    />
  )
}

function FieldError({ className, children, ...props }: React.ComponentProps<"p">) {
  const field = useField()
  const visible = (field ? field.invalid : true) && Boolean(children)
  const setHasError = field?.setHasError

  React.useEffect(() => {
    setHasError?.(visible)
  }, [visible, setHasError])

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key="error"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={spring.smooth}
          className="overflow-hidden"
        >
          <motion.div
            initial={{ y: -4, filter: "blur(2px)" }}
            animate={{ y: 0, filter: "blur(0px)" }}
            transition={spring.smooth}
          >
            <p
              role="alert"
              data-slot="field-error"
              id={field?.errorId}
              className={cn("flex items-center gap-1.5 text-sm text-destructive", className)}
              {...props}
            >
              <CircleAlert className="size-3.5 shrink-0" aria-hidden />
              {children}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return <fieldset data-slot="field-set" className={cn("flex flex-col gap-6", className)} {...props} />
}

function FieldLegend({ className, ...props }: React.ComponentProps<"legend">) {
  return <legend data-slot="field-legend" className={cn("mb-1 text-base font-semibold", className)} {...props} />
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="field-group" className={cn("flex flex-col gap-5", className)} {...props} />
}

export {
  Field,
  FieldContent,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  useField,
}
