"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const sections = {
  platform: ["Compute", "Storage", "Queues", "Cron jobs", "Secrets", "Logs"],
  company: ["About", "Customers", "Careers", "Blog"],
}

export default function NavigationMenuHeader() {
  const [last, setLast] = React.useState<string>("")

  return (
    <div className="h-80 w-full">
      <div className="flex items-center justify-between rounded-xl border bg-background/80 px-3 py-2 shadow-xs backdrop-blur">
        <span className="px-2 text-sm font-semibold">northwind</span>
        <NavigationMenu value={last} onValueChange={setLast}>
          <NavigationMenuList>
            {Object.entries(sections).map(([key, links]) => (
              <NavigationMenuItem key={key} value={key}>
                <NavigationMenuTrigger className="capitalize">{key}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className={key === "platform" ? "grid w-80 grid-cols-2 gap-0.5" : "grid w-44 gap-0.5"}>
                    {links.map((l) => (
                      <NavigationMenuLink key={l} href="#" className="group flex-row items-center justify-between py-2">
                        {l}
                        <ArrowUpRight className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100" />
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <Button size="sm">Sign up</Button>
      </div>
      <p className="mt-40 text-center text-xs text-muted-foreground">
        {last ? `Open: ${last}` : "Hover the menu, then glide between items"}
      </p>
    </div>
  )
}
