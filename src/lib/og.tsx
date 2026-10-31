import { readFile } from "node:fs/promises"
import path from "node:path"
import { ImageResponse } from "next/og"
import { LOGO_PATH } from "@/components/site/logo"
import { siteConfig } from "@/lib/site"

export const ogSize = { width: 1200, height: 630 }

const font = (file: string) => readFile(path.join(process.cwd(), "node_modules/geist/dist/fonts", file))

// l'image qui s'affiche qd on colle le lien sur discord, x, slack etc
export async function renderOg({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  const [regular, semibold, mono] = await Promise.all([
    font("geist-sans/Geist-Regular.ttf"),
    font("geist-sans/Geist-SemiBold.ttf"),
    font("geist-mono/GeistMono-Medium.ttf"),
  ])
  const host = siteConfig.url.replace(/^https?:\/\//, "")

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#09090b",
          color: "#fafafa",
          fontFamily: "Geist",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -160,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(201,92,170,0.22), transparent 65%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="44" height="44" viewBox="0 0 24 24">
            <path d={LOGO_PATH} fill="#fafafa" />
          </svg>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 600, letterSpacing: -0.8 }}>
            Plum<span style={{ color: "#71717a", marginLeft: 8 }}>UI</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontFamily: "Geist Mono", fontSize: 22, color: "#a1a1aa", letterSpacing: 2, textTransform: "uppercase" }}>
            {eyebrow}
          </div>
          <div style={{ fontSize: title.length > 24 ? 76 : 96, fontWeight: 600, letterSpacing: -3, lineHeight: 1.02, maxWidth: 980 }}>
            {title}
          </div>
          <div style={{ fontSize: 30, color: "#a1a1aa", lineHeight: 1.4, maxWidth: 900 }}>{description}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, color: "#71717a" }}>
          <div style={{ fontFamily: "Geist Mono" }}>{host}</div>
          <div style={{ display: "flex", gap: 28 }}>
            <span>React</span>
            <span>Tailwind CSS</span>
            <span>Radix</span>
            <span>Motion</span>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: regular, weight: 400 },
        { name: "Geist", data: semibold, weight: 600 },
        { name: "Geist Mono", data: mono, weight: 500 },
      ],
    }
  )
}
