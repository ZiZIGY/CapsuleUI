# __PREFIX__-__COMPONENT__ Component

Custom button element with ripple effect.

## Usage

### HTML

```html
<link rel="stylesheet" href="__PREFIX__-__COMPONENT__.style.css">
<script src="__PREFIX__-__COMPONENT__.js"></script>

<__PREFIX__-__COMPONENT__ size="lg" variant="primary">
  My Button
</__PREFIX__-__COMPONENT__>
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
<__PREFIX__-__COMPONENT__>Button</__PREFIX__-__COMPONENT__>
```

### With Attributes

```html
<__PREFIX__-__COMPONENT__ size="lg" variant="outline" disabled>
  Large Disabled Button
</__PREFIX__-__COMPONENT__>
```

### With Event Handler

```html
<__PREFIX__-__COMPONENT__
  size="md"
  variant="primary"
  onclick="handleClick(event)">
  Button with Handler
</__PREFIX__-__COMPONENT__>
```

### Programmatic Control

```javascript
const button = document.querySelector('__PREFIX__-__COMPONENT__');

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
__PREFIX__-__COMPONENT__ {
  --ripple-color: rgba(255, 255, 255, 0.5);
}
```

You can also add your own CSS classes through the `class` attribute:

```html
<__PREFIX__-__COMPONENT__ class="my-custom-class" size="md">
  Custom Button
</__PREFIX__-__COMPONENT__>
```
