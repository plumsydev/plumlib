"use client"

import * as React from "react"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const full = ["Acme", "Engineering", "Platform", "Deployments", "Production", "4f2c91a"]

export default function BreadcrumbDropdown() {
  // on peut "remonter" ds le chemin, le fil d'ariane se raccourcit
  const [path, setPath] = React.useState(full)
  const hidden = path.slice(1, -2)
  const go = (i: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    setPath(path.slice(0, i + 1))
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" onClick={go(0)}>
              {path[0]}
            </BreadcrumbLink>
          </BreadcrumbItem>
          {hidden.length > 0 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="cursor-pointer rounded-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring" aria-label="Show hidden levels">
                    <BreadcrumbEllipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {hidden.map((h, i) => (
                      <DropdownMenuItem key={h} onSelect={() => setPath(path.slice(0, i + 2))}>
                        {h}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
            </>
          )}
          {path.slice(Math.max(1, path.length - 2)).map((p, j, arr) => {
            const i = path.length - arr.length + j
            return (
              <React.Fragment key={p}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {i === path.length - 1 ? (
                    <BreadcrumbPage>{p}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href="#" onClick={go(i)}>
                      {p}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
      {path.length < full.length && (
        <button type="button" onClick={() => setPath(full)} className="cursor-pointer text-xs text-muted-foreground underline-offset-4 hover:underline">
          Reset path
        </button>
      )}
    </div>
  )
}
