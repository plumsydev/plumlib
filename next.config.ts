import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // les sources des composants sont lues au build pr la doc donc on les embarque
  outputFileTracingIncludes: {
    "/docs/components/[slug]": ["./src/components/ui/**", "./src/registry/demos/**"],
    "/blocks": ["./src/blocks/**"],
    "/**/opengraph-image": ["./node_modules/geist/dist/fonts/geist-sans/*.ttf", "./node_modules/geist/dist/fonts/geist-mono/*.ttf"],
  },
}

export default nextConfig
