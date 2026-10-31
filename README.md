# Plum UI

Animated, accessible React components you copy into your app. Built on Radix, Tailwind CSS v4 and Motion, installed with its own zero-dependency CLI.

```bash
npx plumui init
npx plumui add button dialog toast
```

- 70+ components across inputs, overlays, feedback, navigation, data display and motion effects
- An interactive playground on every component page, plus full-screen blocks
- One CSS file of OKLCH tokens, light and dark, with scoped themes
- A JSON registry generated from the source of this site, with a shadcn-format mirror for compatibility

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
| `src/registry/playgrounds` | Interactive prop playgrounds |
| `src/blocks` | Full-screen examples shown on /blocks |
| `cli/` | The `plumui` CLI (published separately) |
| `scripts/build-registry.mjs` | Generates `public/registry` (plum) and `public/r` (shadcn mirror) |

## Adding a component

1. Write `src/components/ui/<name>.tsx`
2. Add demos in `src/registry/demos/<name>/` (the first one is named `default`)
3. Add a playground in `src/registry/playgrounds/<name>.tsx`
4. Describe it in `src/registry/docs/<name>.tsx` and register it in `src/registry/index.ts`

The docs page, sidebar entry, search result and registry item are generated from that.

## Registry & CLI

`pnpm build` runs `registry:build` first. Set `NEXT_PUBLIC_SITE_URL` to your production domain (defaults to `https://ui.plumsy.dev`):

```bash
NEXT_PUBLIC_SITE_URL=https://ui.example.com pnpm build
```

The CLI reads `<site>/registry/<name>.json`. Its default registry is set at the top of `cli/bin/plumui.mjs` and can be overridden with `--registry` or `PLUM_REGISTRY`. To try it against your dev server:

```bash
node cli/bin/plumui.mjs init --registry http://localhost:3000/registry
```

Publish the CLI with `cd cli && npm publish`.

## License

MIT
