import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"
import { GitHubIcon } from "@/components/site/icons"
import { Reveal } from "./reveal"

export function Cta() {
  return (
    <section className="px-4 pb-24 sm:px-6 sm:pb-32">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border bg-card px-6 py-20 text-center">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
              Build something that feels good to use.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">Free and open source. Copy what you need, leave the rest.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild className="group">
                <Link href="/docs/installation">
                  Get started <ArrowRight className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={siteConfig.github} target="_blank" rel="noreferrer">
                  <GitHubIcon /> Star on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
