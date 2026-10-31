"use client"

import { BarChart3, Blocks, BookOpen, Boxes, Globe, LifeBuoy, Lock, Rocket, Sparkles, Zap } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const products = [
  { icon: Rocket, title: "Deployments", desc: "Push to git, get a URL in seconds." },
  { icon: Globe, title: "Edge Network", desc: "Serve from 120 regions, zero config." },
  { icon: BarChart3, title: "Analytics", desc: "Real traffic, no cookie banner." },
  { icon: Lock, title: "Firewall", desc: "Block bots before they hit your app." },
]

const resources = [
  { icon: BookOpen, title: "Documentation", desc: "Guides and API reference." },
  { icon: Blocks, title: "Templates", desc: "Start from 200+ starters." },
  { icon: LifeBuoy, title: "Support", desc: "Talk to an engineer." },
]

export default function NavigationMenuDemo() {
  return (
    <div className="flex h-80 w-full items-start justify-center pt-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem value="products">
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[30rem] grid-cols-[11rem_1fr] gap-2">
                <NavigationMenuLink href="#" className="justify-end bg-gradient-to-b from-muted/40 to-muted p-4">
                  <Zap className="mb-auto size-5 text-brand" />
                  <span className="text-base font-semibold">Plum Cloud</span>
                  <span className="text-xs leading-5 text-muted-foreground">The platform for teams who ship every day.</span>
                </NavigationMenuLink>
                <div className="grid gap-1">
                  {products.map((p) => (
                    <NavigationMenuLink key={p.title} href="#" className="flex-row items-start gap-3">
                      <p.icon className="mt-0.5 shrink-0" />
                      <span>
                        <span className="block font-medium">{p.title}</span>
                        <span className="block text-xs text-muted-foreground">{p.desc}</span>
                      </span>
                    </NavigationMenuLink>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="solutions">
            <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[22rem] gap-1">
                {[
                  [Sparkles, "AI apps", "Stream tokens from the edge."],
                  [Boxes, "Ecommerce", "Fast storefronts that convert."],
                  [Blocks, "Platforms", "Multi-tenant at any scale."],
                ].map(([Icon, title, desc]) => {
                  const I = Icon as typeof Sparkles
                  return (
                    <NavigationMenuLink key={title as string} href="#" className="flex-row items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-background">
                        <I />
                      </span>
                      <span>
                        <span className="block font-medium">{title as string}</span>
                        <span className="block text-xs text-muted-foreground">{desc as string}</span>
                      </span>
                    </NavigationMenuLink>
                  )
                })}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="resources">
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[26rem] grid-cols-3 gap-1">
                {resources.map((r) => (
                  <NavigationMenuLink key={r.title} href="#">
                    <r.icon className="mb-2" />
                    <span className="font-medium">{r.title}</span>
                    <span className="text-xs text-muted-foreground">{r.desc}</span>
                  </NavigationMenuLink>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="pricing">
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
              Pricing
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
