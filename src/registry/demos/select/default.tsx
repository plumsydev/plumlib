"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SelectDemo() {
  return (
    <Select defaultValue="week">
      <SelectTrigger className="w-44">
        <SelectValue placeholder="Time range" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="day">Last 24 hours</SelectItem>
        <SelectItem value="week">Last 7 days</SelectItem>
        <SelectItem value="month">Last 30 days</SelectItem>
        <SelectItem value="quarter">Last 90 days</SelectItem>
      </SelectContent>
    </Select>
  )
}
