"use client"

import { Check } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function NavigationMenuSimple() {
  return (
    <div className="flex h-64 w-full items-start justify-center pt-4">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem value="docs">
            <NavigationMenuLink href="#" data-active className={navigationMenuTriggerStyle()}>
              Docs
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem value="status">
            <NavigationMenuTrigger>Status</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-56 space-y-0.5">
                {["API", "Dashboard", "Edge network", "Builds"].map((s) => (
                  <li key={s}>
                    <NavigationMenuLink href="#" className="flex-row items-center justify-between py-2">
                      {s}
                      <span className="flex items-center gap-1 text-xs text-success">
                        <Check className="size-3.5 !text-success" /> Operational
                      </span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="changelog">
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
              Changelog
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
