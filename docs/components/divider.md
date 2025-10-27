# Divider

A divider component that creates a visual separator between content sections.

## Installation

```bash
npx capsule add Divider
```

## Usage

### Horizontal (default)

<div style="margin: 1rem 0;">
  <capsule-divider></capsule-divider>
</div>

```html
<capsule-divider></capsule-divider>
```

### Vertical

<div style="display: flex; align-items: center; gap: 1rem; margin: 1rem 0;">
  <span>Left</span>
  <capsule-divider orientation="vertical" style="height: 40px;"></capsule-divider>
  <span>Right</span>
</div>

```html
<capsule-divider orientation="vertical"></capsule-divider>
```

### Thickness

<div style="margin: 1rem 0;">
  <capsule-divider thickness="thin"></capsule-divider>
  <capsule-divider></capsule-divider>
  <capsule-divider thickness="thick"></capsule-divider>
</div>

```html
<capsule-divider thickness="thin"></capsule-divider>
<capsule-divider thickness="thick"></capsule-divider>
```

### Colors

<div style="margin: 1rem 0;">
  <capsule-divider color="primary"></capsule-divider>
  <capsule-divider color="error"></capsule-divider>
  <capsule-divider color="success"></capsule-divider>
  <capsule-divider color="warning"></capsule-divider>
  <capsule-divider color="info"></capsule-divider>
</div>

```html
<capsule-divider color="primary"></capsule-divider>
<capsule-divider color="error"></capsule-divider>
<capsule-divider color="success"></capsule-divider>
```

### Variants

<div style="margin: 1rem 0;">
  <capsule-divider variant="ghost"></capsule-divider>
</div>

```html
<capsule-divider variant="ghost"></capsule-divider>
```

## Attributes

| Attribute     | Type   | Default    | Description                                   |
| ------------- | ------ | ---------- | --------------------------------------------- |
| `orientation` | string | horizontal | Divider direction (horizontal or vertical)    |
| `thickness`   | string | -          | Line thickness (thin or thick)                |
| `color`       | string | -          | Color variant (primary, error, warning, etc.) |
| `variant`     | string | -          | Visual style variant (ghost)                  |

### Orientation Values

- `horizontal` — Horizontal divider (default)
- `vertical` — Vertical divider

### Thickness Values

- `thin` — Thinner divider (0.5px)
- `thick` — Thicker divider (2px)

### Color Values

- `primary` — Primary brand color
- `error` — Error/danger color
- `warning` — Warning color
- `success` — Success color
- `info` — Information color

### Variant Values

- `ghost` — Semi-transparent ghost divider

## Accessibility

- ✅ ARIA role="separator" set automatically
- ✅ aria-orientation matches orientation attribute
- ✅ Semantic divider for screen readers
