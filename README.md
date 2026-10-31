# Plum UI

Animated, accessible React components you copy into your app. Built on Radix, Tailwind CSS v4 and Motion, and installable with the shadcn CLI.

- 43 components, every interaction animated (springs for what you touch, expo curves for what appears)
- OKLCH tokens compatible with shadcn/ui, light and dark
- A shadcn-compatible registry generated from the source of this site

## Develop

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000. The landing page lives in `src/app/page.tsx`, the docs in `src/app/docs`.

## Project layout

| Path | What |
| --- | --- |
| `src/components/ui` | The library itself, one file per component |
| `src/styles/plum.css` | Theme: tokens, dark mode, easings, animation utilities |
| `src/lib/motion.ts` | Shared spring presets |
| `src/registry/docs` | Docs metadata per component (description, API, notes) |
| `src/registry/demos` | Live examples, shown with their source in the docs |
| `scripts/build-registry.mjs` | Generates `public/r/*.json` for the shadcn CLI |

## Adding a component

1. Write `src/components/ui/<name>.tsx`
2. Add demos in `src/registry/demos/<name>/` (the first one is named `default`)
3. Describe it in `src/registry/docs/<name>.tsx` and register it in `src/registry/index.ts`

The docs page, sidebar entry, search result and registry item are generated from that.

## Registry

`pnpm build` runs `registry:build` first. Set `NEXT_PUBLIC_SITE_URL` to your production domain so registry URLs resolve:

```bash
NEXT_PUBLIC_SITE_URL=https://ui.example.com pnpm build
```

Then anyone can run `npx shadcn@latest add https://ui.example.com/r/button.json`.

## License

MIT
