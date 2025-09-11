# __PREFIX__-__COMPONENT__ Component

Skeleton loading placeholder with pulse animation.

## Usage

### HTML

```html
<link rel="stylesheet" href="__PREFIX__-__COMPONENT__.style.css">
<script src="__PREFIX__-__COMPONENT__.js"></script>

<__PREFIX__-__COMPONENT__ variant="text"></__PREFIX__-__COMPONENT__>
```

## Attributes

| Attribute | Type                                                                     | Default | Description           |
| --------- | ------------------------------------------------------------------------ | ------- | --------------------- |
| `variant` | `'text' \| 'circular' \| 'rectangular' \| 'rounded'`                   | `'text'` | Skeleton variant      |

## Examples

### Text Skeleton (Default)

```html
<__PREFIX__-__COMPONENT__ variant="text"></__PREFIX__-__COMPONENT__>
```

### Circular Skeleton

```html
<__PREFIX__-__COMPONENT__ variant="circular"></__PREFIX__-__COMPONENT__>
```

### Rectangular Skeleton

```html
<__PREFIX__-__COMPONENT__ variant="rectangular"></__PREFIX__-__COMPONENT__>
```

### Rounded Skeleton

```html
<__PREFIX__-__COMPONENT__ variant="rounded"></__PREFIX__-__COMPONENT__>
```

### Multiple Skeletons

```html
<div class="skeleton-container">
  <__PREFIX__-__COMPONENT__ variant="circular"></__PREFIX__-__COMPONENT__>
  <div>
    <__PREFIX__-__COMPONENT__ variant="text"></__PREFIX__-__COMPONENT__>
    <__PREFIX__-__COMPONENT__ variant="text"></__PREFIX__-__COMPONENT__>
  </div>
</div>
```

## Styling

The component uses CSS variables for customization:

```css
__PREFIX__-__COMPONENT__ {
  --skeleton-bg: #e5e7eb;
  --skeleton-radius: 0.25rem;
  --skeleton-animation-duration: 2s;
}
```

You can also add your own CSS classes through the `class` attribute:

```html
<__PREFIX__-__COMPONENT__ class="my-skeleton" variant="rounded">
</__PREFIX__-__COMPONENT__>
```

## Animation

The skeleton uses a pulse animation that:
- Fades from full opacity to 50% opacity and back
- Runs continuously with a 2-second duration
- Uses a smooth cubic-bezier easing function

## Accessibility

The component automatically sets:
- `role="presentation"` to indicate it's decorative
- `aria-hidden="true"` to hide from screen readers
