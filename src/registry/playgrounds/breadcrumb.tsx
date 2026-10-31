"use client"

import { Slash } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Playground } from "@/components/site/playground"

const path = ["Acme", "Projects", "web", "Deployments", "4f2c91a"]

export default function BreadcrumbPlayground() {
  return (
    <Playground
      controls={{
        depth: { type: "number", default: 4, min: 2, max: 5 },
        separator: { type: "select", options: ["chevron", "slash"], default: "chevron" },
        collapse: { type: "boolean", default: false, label: "collapse middle" },
      }}
      render={({ depth, separator, collapse }) => {
        const parts = path.slice(0, depth)
        const shown = collapse && parts.length > 3 ? [parts[0], "…", ...parts.slice(-2)] : parts
        return (
          <Breadcrumb>
            <BreadcrumbList>
              {shown.map((p, i) => (
                <span key={`${p}-${i}`} className="contents">
                  {i > 0 && <BreadcrumbSeparator>{separator === "slash" ? <Slash /> : undefined}</BreadcrumbSeparator>}
                  <BreadcrumbItem>
                    {p === "…" ? (
                      <BreadcrumbEllipsis />
                    ) : i === shown.length - 1 ? (
                      <BreadcrumbPage>{p}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href="#" onClick={(e) => e.preventDefault()}>
                        {p}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </span>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )
      }}
      code={({ depth, separator }) => {
        const parts = path.slice(0, depth)
        const sep = separator === "slash" ? "    <BreadcrumbSeparator><Slash /></BreadcrumbSeparator>" : "    <BreadcrumbSeparator />"
        return `<Breadcrumb>
  <BreadcrumbList>
${parts
  .map((p, i) =>
    i === parts.length - 1
      ? `    <BreadcrumbItem>\n      <BreadcrumbPage>${p}</BreadcrumbPage>\n    </BreadcrumbItem>`
      : `    <BreadcrumbItem>\n      <BreadcrumbLink href="#">${p}</BreadcrumbLink>\n    </BreadcrumbItem>\n${sep}`
  )
  .join("\n")}
  </BreadcrumbList>
</Breadcrumb>`
      }}
    />
  )
}
