# __PREFIX__-__COMPONENT__ Component

Tooltip component with named slots for trigger and content.

## Usage

### HTML

```html
<link rel="stylesheet" href="__PREFIX__-__COMPONENT__.style.css">
<script src="__PREFIX__-__COMPONENT__.js"></script>

<__PREFIX__-__COMPONENT__ placement="top">
  <button>Hover me</button>
  <span slot="content">This is a tooltip</span>
</__PREFIX__-__COMPONENT__>
```

## Attributes

| Attribute  | Type                                     | Default | Description        |
| ---------- | ---------------------------------------- | ------- | ------------------ |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Tooltip position   |
| `disabled` | `boolean`                                | `false` | Disable tooltip    |

## Named Slots

| Slot Name | Description                    | Required |
| --------- | ------------------------------ | -------- |
| `trigger` | Element that triggers tooltip  | No       |
| `content` | Content to display in tooltip  | Yes      |
| (default) | Default trigger content        | No       |

## Examples

### Basic Tooltip (Default Slot)

```html
<__PREFIX__-__COMPONENT__>
  <button>Button</button>
  <span slot="content">Tooltip content</span>
</__PREFIX__-__COMPONENT__>
```

### With Named Trigger Slot

```html
<__PREFIX__-__COMPONENT__>
  <button slot="trigger">Button</button>
  <span slot="content">Tooltip content</span>
</__PREFIX__-__COMPONENT__>
```

### Different Placements

```html
<!-- Top (default) -->
<__PREFIX__-__COMPONENT__ placement="top">
  <button>Top</button>
  <span slot="content">Top tooltip</span>
</__PREFIX__-__COMPONENT__>

<!-- Bottom -->
<__PREFIX__-__COMPONENT__ placement="bottom">
  <button>Bottom</button>
  <span slot="content">Bottom tooltip</span>
</__PREFIX__-__COMPONENT__>

<!-- Left -->
<__PREFIX__-__COMPONENT__ placement="left">
  <button>Left</button>
  <span slot="content">Left tooltip</span>
</__PREFIX__-__COMPONENT__>

<!-- Right -->
<__PREFIX__-__COMPONENT__ placement="right">
  <button>Right</button>
  <span slot="content">Right tooltip</span>
</__PREFIX__-__COMPONENT__>
```

### Complex Content

```html
<__PREFIX__-__COMPONENT__ placement="bottom">
  <button>
    <svg>...</svg>
    Info
  </button>
  <div slot="content">
    <strong>Important:</strong>
    <br>
    This action cannot be undone.
  </div>
</__PREFIX__-__COMPONENT__>
```

### With Form Elements

```html
<__PREFIX__-__COMPONENT__ placement="right">
  <input type="text" placeholder="Enter your name">
  <span slot="content">Your full name as it appears on ID</span>
</__PREFIX__-__COMPONENT__>
```

### Disabled Tooltip

```html
<__PREFIX__-__COMPONENT__ disabled>
  <button>Disabled</button>
  <span slot="content">This won't show</span>
</__PREFIX__-__COMPONENT__>
```

## Programmatic Control

```javascript
const tooltip = document.querySelector('__PREFIX__-__COMPONENT__');

// Show tooltip
tooltip.show();

// Hide tooltip
tooltip.hide();

// Toggle tooltip
tooltip.toggle();

// Change placement
tooltip.setAttribute('placement', 'bottom');

// Disable tooltip
tooltip.setAttribute('disabled', '');
```

## Events

The tooltip automatically handles:
- `mouseenter` - Shows tooltip
- `mouseleave` - Hides tooltip
- `focusin` - Shows tooltip (for keyboard navigation)
- `focusout` - Hides tooltip

## Styling

The tooltip uses CSS variables for customization:

```css
__PREFIX__-__COMPONENT__ {
  --tooltip-bg: #1f2937;
  --tooltip-color: white;
  --tooltip-radius: 0.375rem;
  --tooltip-padding: 0.5rem 0.75rem;
  --tooltip-font-size: 0.875rem;
}
```

## Accessibility

The component automatically sets:
- `role="tooltip"` on the tooltip element
- `aria-describedby` on the trigger element
- Proper focus management for keyboard navigation
