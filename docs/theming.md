# Theming

CapsuleUI is fully themeable via CSS variables.
All design tokens and palette variables are defined in `@capsule/global.css` (in the `@capsule` folder), and each component already ships with its own CSS file, e.g. `@capsule/components/capsule-button/capsule-button.style.css`.

## CapsuleUI variables

In `@capsule/global.css`, you'll find color, radius, shadow, etc. definitions—using `light-dark()` for auto light/dark support:

```css
:root {
  --capsule-color-primary: light-dark(#2563eb, #3b82f6);
  --capsule-color-error: light-dark(#dc2626, #ef4444);
  /* ... */
}
:root.light { color-scheme: light; }
:root.dark { color-scheme: dark; }
```

## Customizing the theme
- **Override any variable** in `:root {}` in your project or via a separate CSS file.
- **Switch between themes** using `.light`/`.dark` classes on `<html>` or `<body>`, variables update automatically.
- **Tweak specific tokens** (radii, fonts, colors, etc).

## Per-component customization
Every component includes its own CSS file, loaded automatically—no need to copy or edit it.
To customize a specific component, just override variables or write styles in your own CSS:

```css
capsule-button {
  /* your variables or styles */
}
```
