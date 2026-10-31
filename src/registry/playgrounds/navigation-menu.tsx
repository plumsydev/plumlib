"use client"

import { BookOpen, Rocket, Zap } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Playground } from "@/components/site/playground"

export default function NavigationMenuPlayground() {
  return (
    <Playground
      previewClassName="items-start min-h-96 pt-12"
      controls={{
        viewport: { type: "boolean", default: true },
        delayDuration: { type: "number", default: 200, min: 0, max: 800, step: 50 },
        wide: { type: "boolean", default: false, label: "wide content" },
      }}
      render={({ viewport, delayDuration, wide }) => (
        <NavigationMenu key={String(viewport)} viewport={viewport} delayDuration={delayDuration}>
          <NavigationMenuList>
            <NavigationMenuItem value="product">
              <NavigationMenuTrigger>Product</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className={wide ? "grid w-[28rem] grid-cols-2 gap-1" : "grid w-60 gap-1"}>
                  {[[Rocket, "Deploy"], [Zap, "Functions"], [BookOpen, "Docs"]].map(([Icon, t]) => {
                    const I = Icon as typeof Rocket
                    return (
                      <NavigationMenuLink key={t as string} href="#" className="flex-row items-center gap-2.5">
                        <I /> {t as string}
                      </NavigationMenuLink>
                    )
                  })}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem value="company">
              <NavigationMenuTrigger>Company</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-44 gap-1">
                  {["About", "Blog", "Careers"].map((t) => (
                    <NavigationMenuLink key={t} href="#">{t}</NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem value="pricing">
              <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>Pricing</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
      code={({ viewport, delayDuration }) => `<NavigationMenu${viewport ? "" : " viewport={false}"}${delayDuration !== 200 ? ` delayDuration={${delayDuration}}` : ""}>
  <NavigationMenuList>
    <NavigationMenuItem value="product">
      <NavigationMenuTrigger>Product</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/deploy">Deploy</NavigationMenuLink>
        <NavigationMenuLink href="/functions">Functions</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem value="pricing">
      <NavigationMenuLink href="/pricing" className={navigationMenuTriggerStyle()}>
        Pricing
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
    />
  )
}
