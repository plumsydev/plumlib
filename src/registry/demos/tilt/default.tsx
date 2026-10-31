"use client"

import { Tilt } from "@/components/ui/tilt"

export default function TiltDemo() {
  return (
    <Tilt className="rounded-2xl">
      {/* une carte de membre, le grain et le reflet font tout le boulot */}
      <div className="relative flex aspect-[1.586] w-80 flex-col justify-between overflow-hidden rounded-2xl border bg-gradient-to-br from-zinc-900 to-zinc-800 p-5 text-zinc-100 shadow-xl dark:from-zinc-800 dark:to-zinc-950">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div className="relative flex items-start justify-between">
          <span className="text-sm font-semibold tracking-tight">Plum</span>
          <span className="rounded-full border border-white/15 px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase">Pro</span>
        </div>
        <div className="relative space-y-3">
          <div className="h-7 w-10 rounded-md bg-gradient-to-br from-zinc-300 to-zinc-500 opacity-80" />
          <div className="flex items-end justify-between">
            <div>
              <div className="font-mono text-sm tracking-[0.2em]">4021 •••• 0091</div>
              <div className="mt-1 text-xs text-zinc-400">Ryan B.</div>
            </div>
            <div className="text-right font-mono text-xs text-zinc-400">09/29</div>
          </div>
        </div>
      </div>
    </Tilt>
  )
}
