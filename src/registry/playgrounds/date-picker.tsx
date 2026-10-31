"use client"

import { DatePicker, DateRangePicker } from "@/components/ui/date-picker"
import { Playground } from "@/components/site/playground"

export default function DatePickerPlayground() {
  return (
    <Playground
      controls={{
        variant: { type: "select", options: ["single", "range"], default: "single" },
        locale: { type: "select", options: ["en-US", "fr-FR", "de-DE", "ja-JP"], default: "en-US" },
        placeholder: { type: "text", default: "Pick a date" },
        clearable: { type: "boolean", default: true },
        presets: { type: "boolean", default: true },
        disabled: { type: "boolean", default: false },
      }}
      render={({ variant, locale, placeholder, clearable, presets, disabled }) => (
        <div className="w-72">
          {variant === "single" ? (
            <DatePicker locale={locale} placeholder={placeholder} clearable={clearable} disabled={disabled} />
          ) : (
            <DateRangePicker
              locale={locale}
              placeholder={placeholder}
              clearable={clearable}
              disabled={disabled}
              presets={presets ? undefined : []}
            />
          )}
        </div>
      )}
      code={({ variant, locale, placeholder, clearable, presets, disabled }) => {
        const name = variant === "single" ? "DatePicker" : "DateRangePicker"
        const props = [
          `value={value}`,
          `onChange={setValue}`,
          locale !== "en-US" && `locale="${locale}"`,
          `placeholder="${placeholder}"`,
          !clearable && `clearable={false}`,
          variant === "range" && !presets && `presets={[]}`,
          disabled && `disabled`,
        ].filter(Boolean)
        return `import { ${name} } from "@/components/ui/date-picker"

<${name}
  ${props.join("\n  ")}
/>`
      }}
    />
  )
}
