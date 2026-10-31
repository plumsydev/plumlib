"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectGroups() {
  return (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select a region" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="cdg1">Paris, France</SelectItem>
          <SelectItem value="fra1">Frankfurt, Germany</SelectItem>
          <SelectItem value="lhr1">London, United Kingdom</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="iad1">Washington, D.C.</SelectItem>
          <SelectItem value="sfo1">San Francisco</SelectItem>
          <SelectItem value="yul1" disabled>Montréal (soon)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Asia Pacific</SelectLabel>
          <SelectItem value="hnd1">Tokyo, Japan</SelectItem>
          <SelectItem value="sin1">Singapore</SelectItem>
          <SelectItem value="syd1">Sydney, Australia</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
