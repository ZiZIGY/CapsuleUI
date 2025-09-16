# ui-button Component

Custom button element with ripple effect.

## Usage

### HTML

```html
<link rel="stylesheet" href="ui-button.style.css">
<script src="ui-button.js"></script>

<ui-button size="lg" variant="primary">
  My Button
</ui-button>
```

## Attributes

| Attribute  | Type                                    | Default     | Description      |
| ---------- | --------------------------------------- | ----------- | ---------------- |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg'`          | `'md'`      | Button size      |
| `variant`  | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | Button variant   |
| `disabled` | `boolean`                               | `false`     | Whether disabled |
| `type`     | `'button' \| 'submit' \| 'reset'`       | `'button'`  | Button type      |

## Events

| Event          | Description                         |
| -------------- | ----------------------------------- |
| `button-click` | Custom event when button is clicked |
| `click`        | Standard click event                |
| `focus`        | Focus event                         |
| `blur`         | Blur event                          |

## Examples

### Basic Usage

```html
<ui-button>Button</ui-button>
```

### With Attributes

```html
<ui-button size="lg" variant="outline" disabled>
  Large Disabled Button
</ui-button>
```

### With Event Handler

```html
<ui-button
  size="md"
  variant="primary"
  onclick="handleClick(event)">
  Button with Handler
</ui-button>
```

### Programmatic Control

```javascript
const button = document.querySelector('ui-button');

// Change attributes
button.size = 'lg';
button.variant = 'secondary';
button.disabled = true;

// Programmatic click
button.click();

// Set focus
button.focus();
```

## Styling

The component uses CSS variables for customization:

```css
ui-button {
  --ripple-color: rgba(255, 255, 255, 0.5);
}
```

You can also add your own CSS classes through the `class` attribute:

```html
<ui-button class="my-custom-class" size="md">
  Custom Button
</ui-button>
```
