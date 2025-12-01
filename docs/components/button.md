# Button

Interactive button component with multiple style variants, sizes, and states. Built on Web Components with full accessibility support.

## Quick Start

```bash
npx @zizigy/capsule add Button
```

```html
<capsule-button>Click me</capsule-button>
```

## Showcase

### Core Variants

<div class="component-demo">
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

<div class="component-demo">
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

<div class="component-demo">
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

### Rounded

<div class="component-demo">
  <capsule-button rounded="none">None</capsule-button>
  <capsule-button rounded="xs">Extra Small</capsule-button>
  <capsule-button rounded="sm">Small</capsule-button>
  <capsule-button rounded="md">Medium</capsule-button>
  <capsule-button rounded="lg">Large</capsule-button>
  <capsule-button rounded="xl">XL</capsule-button>
  <capsule-button rounded="full">Full</capsule-button>
</div>

```html
<capsule-button rounded="none">None</capsule-button>
<capsule-button rounded="xs">Extra Small</capsule-button>
<capsule-button rounded="sm">Small</capsule-button>
<capsule-button rounded="md">Medium</capsule-button>
<capsule-button rounded="lg">Large</capsule-button>
<capsule-button rounded="xl">XL</capsule-button>
<capsule-button rounded="full">Full</capsule-button>
```

### States

<div class="component-demo">
  <capsule-button>Normal</capsule-button>
  <capsule-button disabled>Disabled</capsule-button>
</div>

```html
<capsule-button>Normal</capsule-button>
<capsule-button disabled>Disabled</capsule-button>
```

## API Reference

### Attributes

| Attribute  | Type    | Default   | Description                             |
| ---------- | ------- | --------- | --------------------------------------- |
| `variant`  | string  | `primary` | Button style                            |
| `size`     | string  | `md`      | Button size                             |
| `disabled` | boolean | `false`   | Disabled state                          |
| `type`     | string  | `button`  | Button type (`button`/`submit`/`reset`) |
| `rounded`  | string  | `md`      | Border radius degree                    |

### Allowed Values

- **variant:**

  - `primary` — Primary action
  - `secondary` — Secondary action
  - `outline` — Outlined button
  - `text` — Text-only button
  - `success` — Success action
  - `error` — Error action
  - `warning` — Warning action
  - `info` — Informational action

- **size:**

  - `xs` — Extra small
  - `sm` — Small
  - `md` — Medium
  - `lg` — Large

- **rounded:**
  - `none` — No rounding
  - `xs` - Extra Small
  - `sm` — Small
  - `md` — Medium
  - `lg` — Large
  - `xl` — Extra large
  - `full` — Full

## Events

```javascript
const button = document.querySelector('capsule-button');
button.addEventListener('click', (event) => {
  console.log('Button clicked!', event);
});
```

## Form Integration

```html
<form id="myForm">
  <input
    type="text"
    name="username"
    required
  />
  <capsule-button type="submit">Submit</capsule-button>
  <capsule-button type="reset">Reset</capsule-button>
</form>
```

## Accessibility

- ✅ Keyboard navigation (Enter/Space)
- ✅ ARIA attributes for screen readers
- ✅ Focus management
- ✅ Proper disabled state handling
- ✅ Form association support

<style>
.component-demo {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
  margin: 1rem 0;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}
</style>
