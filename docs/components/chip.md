# Chip

A compact element representing an attribute, category, or action. Chips are used to label, filter, or organize items.

## Installation

```bash
npx capsule add Chip
```

## Usage

### Basic Chip

<div style="margin: 1rem 0;"><capsule-chip>Basic Chip</capsule-chip></div>

```html
<capsule-chip>Basic Chip</capsule-chip>
```

### Variants

<div style="margin: 1rem 0; display: flex; gap: 0.5rem; flex-wrap: wrap;">
<capsule-chip variant="outline">Outline</capsule-chip>
<capsule-chip variant="ghost">Ghost</capsule-chip>
</div>

```html
<capsule-chip variant="outline">Outline</capsule-chip>
<capsule-chip variant="ghost">Ghost</capsule-chip>
```

### Sizes

<div style="margin: 1rem 0; display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
<capsule-chip size="sm">Small</capsule-chip>
<capsule-chip>Default</capsule-chip>
<capsule-chip size="lg">Large</capsule-chip>
</div>

```html
<capsule-chip size="sm">Small</capsule-chip>
<capsule-chip>Default</capsule-chip>
<capsule-chip size="lg">Large</capsule-chip>
```

## Attributes

| Attribute | Type    | Default | Description        |
| --------- | ------- | ------- | ------------------|
| `variant` | string  | -       | Chip style variant |
| `size`    | string  | -       | Chip size         |
| `type`    | string  | -       | Type attribute    |

### Variant Values
- `outline` - Outlined chip with border
- `ghost` - Ghost chip without background

### Size Values
- `sm` - Small
- `lg` - Large

## Accessibility
- ✅ Keyboard interaction support
- ✅ ARIA attributes for screen readers

