import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  // une prune stylisée, 2 formes et c'est réglé
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("size-5", className)} aria-hidden>
      <path d="M12 6.5c4.4 0 8 3.3 8 7.6 0 4.1-3.6 7.4-8 7.4s-8-3.3-8-7.4c0-4.3 3.6-7.6 8-7.6Z" fill="currentColor" />
      <path d="M12 7V4.2c0-.9.6-1.7 1.5-2l2-.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 7c-.3 2.4-.3 7.5 0 14.5" stroke="var(--background)" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}
