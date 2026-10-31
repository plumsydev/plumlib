import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { Hero } from "@/components/landing/hero"
import { Showcase } from "@/components/landing/showcase"
import { Features } from "@/components/landing/features"
import { Stats } from "@/components/landing/stats"
import { Details } from "@/components/landing/details"
import { Gallery } from "@/components/landing/gallery"
import { Install } from "@/components/landing/install"
import { Cta } from "@/components/landing/cta"
import { components, getNav } from "@/registry"

export default function HomePage() {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <SiteHeader nav={getNav()} />
      <main className="flex-1">
        <Hero count={components.length} />
        <Showcase />
        <Stats components={components.length} demos={components.reduce((n, c) => n + c.demos.length, 0)} />
        <Features />
        <Gallery />
        <Details />
        <Install />
        <Cta />
      </main>
      <SiteFooter />
    </div>
  )
}
