# plum-ui

The CLI for [Plum UI](https://ui.plumsy.dev). Zero dependencies.

```bash
npx plum-ui init
npx plum-ui add button dialog toast
npx plum-ui list
npx plum-ui diff
```

`init` writes `plum.json`, the `cn()` helper, the shared motion presets and the theme, then links the theme in your global CSS. `add` resolves every component a piece depends on, rewrites imports to your aliases and installs the npm packages with your package manager.

Use `--registry <url>` or `PLUM_REGISTRY` to point at a self-hosted registry.
