# Button

A button component with multiple variants and sizes. Built with Web Components standard and fully accessible.

## Installation

```bash
npx capsule add Button
```

## Usage

### Basic Button

<div>
<capsule-button>Click me</capsule-button>
</div>

```html
<capsule-button>Click me</capsule-button>
```

### Variants

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; margin: 1rem 0;">
<capsule-button variant="primary">Primary</capsule-button>
<capsule-button variant="secondary">Secondary</capsule-button>
<capsule-button variant="outline">Outline</capsule-button>
<capsule-button variant="text">Text</capsule-button>
</div>

```html
<capsule-button variant="primary">Primary</capsule-button>
<capsule-button variant="secondary">Secondary</capsule-button>
<capsule-button variant="outline">Outline</capsule-button>
<capsule-button variant="text">Text</capsule-button>
```

#### Semantic Colors

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin: 1rem 0;">
<capsule-button variant="success">Success</capsule-button>
<capsule-button variant="error">Error</capsule-button>
<capsule-button variant="warning">Warning</capsule-button>
<capsule-button variant="info">Info</capsule-button>
</div>

```html
<capsule-button variant="success">Success</capsule-button>
<capsule-button variant="error">Error</capsule-button>
<capsule-button variant="warning">Warning</capsule-button>
<capsule-button variant="info">Info</capsule-button>
```

### Sizes

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; margin: 1rem 0;">
<capsule-button size="xs">Extra Small</capsule-button>
<capsule-button size="sm">Small</capsule-button>
<capsule-button size="md">Medium</capsule-button>
<capsule-button size="lg">Large</capsule-button>
</div>

```html
<capsule-button size="xs">Extra Small</capsule-button>
<capsule-button size="sm">Small</capsule-button>
<capsule-button size="md">Medium</capsule-button>
<capsule-button size="lg">Large</capsule-button>
```

### States

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; margin: 1rem 0;">
<capsule-button>Normal</capsule-button>
<capsule-button disabled>Disabled</capsule-button>
</div>

```html
<capsule-button>Normal</capsule-button>
<capsule-button disabled>Disabled</capsule-button>
```

## Attributes

| Attribute | Type   | Default | Description                          |
| --------- | ------ | ------- | ------------------------------------ |
| `variant` | string | `primary` | Button style variant                 |
| `size`    | string | `md`    | Button size                          |
| `disabled`| boolean| `false` | Disables the button                  |
| `type`    | string | `button`| Button type (button/submit/reset)    |

### Variant Values

- `primary` - Primary action button (default)
- `secondary` - Secondary action button
- `outline` - Outlined button
- `text` - Text-only button
- `success` - Success/positive action
- `error` - Error/negative action
- `warning` - Warning action
- `info` - Informational action

### Size Values

- `xs` - Extra small
- `sm` - Small
- `md` - Medium (default)
- `lg` - Large

## Events

```javascript
const button = document.querySelector('capsule-button');
button.addEventListener('click', () => {
  console.log('Button clicked!');
});
```

## Form Integration

```html
<form id="myForm">
  <capsule-button type="submit">Submit Form</capsule-button>
  <capsule-button type="reset">Reset Form</capsule-button>
</form>
```

## Accessibility

- ✅ Keyboard navigation (Enter key to activate)
- ✅ ARIA attributes for screen readers
- ✅ Focus management
- ✅ Disabled state handling
- ✅ Form association support

## Customization

```css
:root {
  --capsule-color-primary: #0066cc;
  --capsule-radius-md: 8px;
  --capsule-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
```
