# Kbd

A visual component for displaying keyboard keys. Perfect for showing keyboard shortcuts, hotkeys, or key combinations in documentation and UI.

## Installation

```bash
npx @zizigy/capsule add Kbd
```

## Usage

### Basic Kbd

<div style="margin: 1rem 0;">
  <capsule-kbd>Ctrl</capsule-kbd>
</div>

```html
<capsule-kbd>Ctrl</capsule-kbd>
```

### Key Combinations

Display keyboard shortcuts by combining multiple keys:

<div style="margin: 1rem 0; display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
  Press <capsule-kbd>Ctrl</capsule-kbd> + <capsule-kbd>C</capsule-kbd> to copy
</div>

```html
Press <capsule-kbd>Ctrl</capsule-kbd> + <capsule-kbd>C</capsule-kbd> to copy
```

### Different Sizes

<div style="margin: 1rem 0; display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
  <capsule-kbd size="xs">XS</capsule-kbd>
  <capsule-kbd size="sm">SM</capsule-kbd>
  <capsule-kbd size="md">MD</capsule-kbd>
  <capsule-kbd size="lg">LG</capsule-kbd>
  <capsule-kbd size="xl">XL</capsule-kbd>
</div>

```html
<capsule-kbd size="xs">XS</capsule-kbd>
<capsule-kbd size="sm">SM</capsule-kbd>
<capsule-kbd size="md">MD</capsule-kbd>
<capsule-kbd size="lg">LG</capsule-kbd>
<capsule-kbd size="xl">XL</capsule-kbd>
```

### Common Keyboard Shortcuts

<div style="margin: 1rem 0; display: flex; flex-direction: column; gap: 0.5rem;">
  <div>Save: <capsule-kbd>Ctrl</capsule-kbd> + <capsule-kbd>S</capsule-kbd></div>
  <div>Copy: <capsule-kbd>Ctrl</capsule-kbd> + <capsule-kbd>C</capsule-kbd></div>
  <div>Paste: <capsule-kbd>Ctrl</capsule-kbd> + <capsule-kbd>V</capsule-kbd></div>
  <div>Undo: <capsule-kbd>Ctrl</capsule-kbd> + <capsule-kbd>Z</capsule-kbd></div>
  <div>Search: <capsule-kbd>Ctrl</capsule-kbd> + <capsule-kbd>F</capsule-kbd></div>
</div>

```html
<div>Save: <capsule-kbd>Ctrl</capsule-kbd> + <capsule-kbd>S</capsule-kbd></div>
<div>Copy: <capsule-kbd>Ctrl</capsule-kbd> + <capsule-kbd>C</capsule-kbd></div>
```

### Arrow Keys

<div style="margin: 1rem 0; display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
  Use <capsule-kbd>↑</capsule-kbd> <capsule-kbd>↓</capsule-kbd> <capsule-kbd>←</capsule-kbd> <capsule-kbd>→</capsule-kbd> to navigate
</div>

```html
Use <capsule-kbd>↑</capsule-kbd> <capsule-kbd>↓</capsule-kbd>
<capsule-kbd>←</capsule-kbd> <capsule-kbd>→</capsule-kbd> to navigate
```

### Function Keys

<div style="margin: 1rem 0; display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
  <capsule-kbd>F1</capsule-kbd>
  <capsule-kbd>F2</capsule-kbd>
  <capsule-kbd>F3</capsule-kbd>
  <capsule-kbd>F12</capsule-kbd>
</div>

```html
<capsule-kbd>F1</capsule-kbd>
<capsule-kbd>F2</capsule-kbd>
<capsule-kbd>F3</capsule-kbd>
```

## API

### Properties

| Property | Type                                   | Default | Description              |
| -------- | -------------------------------------- | ------- | ------------------------ |
| `size`   | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`  | Size of the keyboard key |

## Styling

You can customize the appearance using CSS:

```css
capsule-kbd {
  background: #f0f0f0;
  border-color: #ccc;
  font-size: 14px;
}
```
