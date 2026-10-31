export const siteConfig = {
  name: "Plum UI",
  description:
    "Beautifully animated, accessible React components you copy into your app. Built on Radix, Tailwind CSS and Motion.",
  // à changer qd t'auras le vrai domaine, sert aux urls du registry
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  github: "https://github.com/plumsy/plumlib",
}

export function registryUrl(slug: string) {
  return `${siteConfig.url}/r/${slug}.json`
}
