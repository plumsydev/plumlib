"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Playground } from "@/components/site/playground"

export default function SelectPlayground() {
  return (
    <Playground
      controls={{
        size: { type: "select", options: ["sm", "default", "lg"], default: "default" },
        placeholder: { type: "text", default: "Select a fruit" },
        groups: { type: "boolean", default: false },
        disabled: { type: "boolean", default: false },
      }}
      render={({ size, placeholder, groups, disabled }) => (
        <Select disabled={disabled}>
          <SelectTrigger size={size} className="w-48">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {groups ? (
              <>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="mango">Mango</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Vegetables</SelectLabel>
                  <SelectItem value="carrot">Carrot</SelectItem>
                  <SelectItem value="leek">Leek</SelectItem>
                </SelectGroup>
              </>
            ) : (
              ["Apple", "Banana", "Mango", "Peach"].map((f) => (
                <SelectItem key={f} value={f.toLowerCase()}>
                  {f}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      )}
      code={({ size, placeholder, groups, disabled }) => `<Select${disabled ? " disabled" : ""}>
  <SelectTrigger${size !== "default" ? ` size="${size}"` : ""} className="w-48">
    <SelectValue placeholder="${placeholder}" />
  </SelectTrigger>
  <SelectContent>
${
  groups
    ? `    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Vegetables</SelectLabel>
      <SelectItem value="carrot">Carrot</SelectItem>
    </SelectGroup>`
    : `    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>`
}
  </SelectContent>
</Select>`}
    />
  )
}
