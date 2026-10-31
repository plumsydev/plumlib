import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/site/theme-provider"
import { Toaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"
import { siteConfig } from "@/lib/site"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} — Animated React components`, template: `%s · ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["react", "components", "ui library", "tailwind css", "radix", "motion", "animation", "design system"],
  authors: [{ name: "Plumsy", url: "https://plumsy.dev" }],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: `${siteConfig.name} — Animated React components`,
    description: siteConfig.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Animated React components`,
    description: siteConfig.description,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfc" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d10" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <ThemeProvider>
          <TooltipProvider delayDuration={300}>
            {/* wrapper pr que le drawer vaul puisse faire reculer la page derrière */}
            <div vaul-drawer-wrapper="" className="min-h-dvh bg-background">
              {children}
            </div>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
