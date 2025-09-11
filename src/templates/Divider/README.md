# __PREFIX__-__COMPONENT__ Component

Simple divider element for separating content.

## Usage

### HTML

```html
<link rel="stylesheet" href="__PREFIX__-__COMPONENT__.style.css">
<script src="__PREFIX__-__COMPONENT__.js"></script>

<__PREFIX__-__COMPONENT__ orientation="horizontal"></__PREFIX__-__COMPONENT__>
```

## Attributes

| Attribute    | Type                          | Default       | Description         |
| ------------ | ----------------------------- | ------------- | ------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Divider orientation |

## Examples

### Horizontal Divider

```html
<p>Content above</p>
<__PREFIX__-__COMPONENT__ orientation="horizontal"></__PREFIX__-__COMPONENT__>
<p>Content below</p>
```

### Vertical Divider

```html
<span>Left content</span>
<__PREFIX__-__COMPONENT__ orientation="vertical"></__PREFIX__-__COMPONENT__>
<span>Right content</span>
```

### Default (Horizontal)

```html
<__PREFIX__-__COMPONENT__></__PREFIX__-__COMPONENT__>
```

### Programmatic Control

```javascript
const divider = document.querySelector('__PREFIX__-__COMPONENT__');

// Change orientation
divider.orientation = 'vertical';

// Get current orientation
console.log(divider.orientation); // 'vertical'
```

## Styling

The component uses CSS variables for customization:

```css
__PREFIX__-__COMPONENT__ {
  --divider-color: #e5e7eb;
  --divider-margin: 0.5rem;
}
```

You can also add your own CSS classes through the `class` attribute:

```html
<__PREFIX__-__COMPONENT__ class="my-custom-divider" orientation="horizontal">
</__PREFIX__-__COMPONENT__>
```

## Accessibility

The component automatically sets:
- `role="separator"` for screen readers
- `aria-orientation` attribute based on the orientation
