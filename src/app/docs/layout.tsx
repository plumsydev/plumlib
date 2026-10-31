import { SiteHeader } from "@/components/site/site-header"
import { DocsSidebar } from "@/components/site/docs-sidebar"
import { getNav } from "@/registry"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const nav = getNav()
  return (
    <div className="relative flex min-h-dvh flex-col">
      <SiteHeader nav={nav} />
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 gap-10 px-4 sm:px-6 lg:gap-14">
        <DocsSidebar nav={nav} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  )
}
