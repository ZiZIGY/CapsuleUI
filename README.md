<p align="center">
  <img src="./public/71d4e75e-f140-4533-b378-77c5b1587def.png" alt="CapsuleUI" width="560" />
</p>

<h2 align="center">CapsuleUI</h2>
<p align="center">
  Native Web Components • Unstyled-by-design • Bring your own design system
</p>

---

## Getting Started

1. Initialize global Capsule folder (templates and globals):

```bash
npx @zizigy/capsule init
# or choose a custom base directory
npx @zizigy/capsule init --dir ./playground
```

2. Add a component (installs into `@capsule/components/<prefix>-<component>`):

```bash
capsule add Slider --prefix ui
```

This will also:

- Inject component CSS into `@capsule/global.css`
- Inject component JS into `@capsule/index.js`

3. Run the playground (Vite):

```bash
npm run play
# or
yarn play
```

## Quick Preview (Playground)

- Entry HTML: `playground/index.html`
- Global styles: `playground/@capsule/global.css`
- Components entry: `playground/@capsule/index.js`

Open the dev server and experiment with components right away.

## Project Structure

- `src/@template/` — template used by `capsule init`
- `@capsule/` — generated global folder in your project (globals + components)
  - `global.css` — global CSS variables, resets and component imports
  - `components/init.js` — entry point that imports all installed components
  - `components/<prefix>-<component>/` — individual component source
- `public/` — static assets (e.g. images)
- `playground/` — local demo environment

## Commands

- `npx @zizigy/capsule init [-d, --dir <dir>]` — create `@capsule` folder from template
- `capsule add <Component> [-p, --prefix <prefix>] [-m, --minify]` — install a component
- `npm run play` — run Vite dev server for `playground`

## License

MIT
