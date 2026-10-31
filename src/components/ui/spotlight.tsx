"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const GroupContext = React.createContext(false)

type SpotlightProps = React.ComponentProps<"div"> & {
  /** diamètre du halo en px */
  size?: number
  /** allume aussi la bordure là où passe le curseur */
  border?: boolean
  /** affiche le halo de remplissage */
  fill?: boolean
}

function track(el: HTMLElement, x: number, y: number) {
  const r = el.getBoundingClientRect()
  el.style.setProperty("--spot-x", `${x - r.left}px`)
  el.style.setProperty("--spot-y", `${y - r.top}px`)
}

function Spotlight({ size = 360, border = true, fill = true, className, children, style, onPointerMove, ...props }: SpotlightProps) {
  const inGroup = React.useContext(GroupContext)
  const ref = React.useRef<HTMLDivElement>(null)
  const [active, setActive] = React.useState(false)

  return (
    <div
      ref={ref}
      data-slot="spotlight"
      data-active={inGroup ? undefined : active || undefined}
      onPointerMove={(e) => {
        onPointerMove?.(e)
        if (!inGroup && ref.current) track(ref.current, e.clientX, e.clientY)
      }}
      onPointerEnter={() => !inGroup && setActive(true)}
      onPointerLeave={() => !inGroup && setActive(false)}
      className={cn("group/spot relative isolate overflow-hidden", className)}
      style={{ "--spot-size": `${size}px`, ...style } as React.CSSProperties}
      {...props}
    >
      {fill && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-data-active/spot:opacity-100 group-data-active/spots:opacity-100"
          style={{
            background:
              "radial-gradient(var(--spot-size) circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklch, var(--foreground) 7%, transparent), transparent 70%)",
          }}
        />
      )}
      {border && (
        // le masque garde que l'anneau de 1px donc seule la bordure s'allume
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] p-px opacity-0 transition-opacity duration-500 group-data-active/spot:opacity-100 group-data-active/spots:opacity-100"
          style={{
            background:
              "radial-gradient(calc(var(--spot-size) * 0.75) circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklch, var(--foreground) 45%, transparent), transparent 70%)",
            maskImage: "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
            maskClip: "content-box, border-box",
            maskComposite: "exclude",
            WebkitMaskImage: "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
            WebkitMaskClip: "content-box, border-box",
            WebkitMaskComposite: "xor",
          }}
        />
      )}
      {children}
    </div>
  )
}

/** les cartes d'un groupe s'allument toutes selon la position du curseur, façon linear */
function SpotlightGroup({ className, children, onPointerMove, onPointerLeave, onPointerEnter, ...props }: React.ComponentProps<"div">) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [active, setActive] = React.useState(false)
  const frame = React.useRef(0)

  return (
    <GroupContext.Provider value>
      <div
        ref={ref}
        data-slot="spotlight-group"
        data-active={active || undefined}
        onPointerEnter={(e) => {
          onPointerEnter?.(e)
          setActive(true)
        }}
        onPointerLeave={(e) => {
          onPointerLeave?.(e)
          setActive(false)
        }}
        onPointerMove={(e) => {
          onPointerMove?.(e)
          const { clientX, clientY } = e
          cancelAnimationFrame(frame.current)
          frame.current = requestAnimationFrame(() => {
            ref.current?.querySelectorAll<HTMLElement>("[data-slot=spotlight]").forEach((el) => track(el, clientX, clientY))
          })
        }}
        className={cn("group/spots", className)}
        {...props}
      >
        {children}
      </div>
    </GroupContext.Provider>
  )
}

export { Spotlight, SpotlightGroup, type SpotlightProps }
