import { cn } from "@/lib/utils"

// une goutte : un cercle dont un coin est resté carré, simple et ça se reconnait à 16px
// décalé sur le centre de gravité, le coin carré tire la masse vers le haut droite
export const LOGO_PATH = "M11.55 3.45h9v9a9 9 0 1 1-9-9Z"

export function Logo({ className, interactive = true }: { className?: string; interactive?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn("size-5", className)} aria-hidden>
      <path
        d={LOGO_PATH}
        style={{ transformOrigin: "12px 12px", transformBox: "view-box" }}
        className={cn("transition-transform duration-700 ease-spring", interactive && "group-hover:-rotate-[18deg]")}
      />
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("group inline-flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em]", className)}>
      <Logo className="size-[18px] -translate-y-[0.5px]" />
      <span>
        Plum<span className="ml-[0.2em] text-muted-foreground">UI</span>
      </span>
    </span>
  )
}
