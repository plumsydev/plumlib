export const siteConfig = {
  name: "Plum UI",
  description:
    "Beautifully animated, accessible React components you copy into your app. Built on Radix, Tailwind CSS and Motion.",
  // à changer qd t'auras le vrai domaine, sert aux urls du registry
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ui.plumsy.dev",
  github: "https://github.com/plumsydev/plumlib",
}

// le registry plum, celui que la cli lit
export function registryUrl(slug: string) {
  return `${siteConfig.url}/r/${slug}.json`
}

export function plumRegistryUrl(slug: string) {
  return `${siteConfig.url}/registry/${slug}.json`
}
