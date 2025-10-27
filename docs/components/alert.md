# Alert

A component for displaying important messages with different variants (error, warning, success, info).

## Installation

```bash
npx capsule add Alert
```

## Usage

### Basic Alert

<div style="margin: 1rem 0;">
  <capsule-alert>
    <capsule-alert-title>Alert Title</capsule-alert-title>
    <capsule-alert-description>This is an alert description.</capsule-alert-description>
  </capsule-alert>
</div>

```html
<capsule-alert>
  <capsule-alert-title>Alert Title</capsule-alert-title>
  <capsule-alert-description
    >This is an alert description.</capsule-alert-description
  >
</capsule-alert>
```

### With Icon

<div style="margin: 1rem 0;">
  <capsule-alert>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 18.5q.625 0 1.063-.437T13.5 17h-3q0 .625.438 1.063T12 18.5M7 16h10v-2h-1v-2.6q0-1.525-.788-2.787T13 7v-.5q0-.425-.288-.712T12 5.5t-.712.288T11 6.5V7q-1.425.35-2.212 1.613T8 11.4V14H7zm5 6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
    <capsule-alert-title>Alert with Icon</capsule-alert-title>
    <capsule-alert-description>Alert component supports SVG icons for better visual communication.</capsule-alert-description>
  </capsule-alert>
</div>

```html
<capsule-alert>
  <svg
    width="16"
    height="16"
  >
    ...
  </svg>
  <capsule-alert-title>Alert with Icon</capsule-alert-title>
  <capsule-alert-description>Alert message</capsule-alert-description>
</capsule-alert>
```

### Variants

<div style="margin: 1rem 0;">
  <capsule-alert variant="error">
    <capsule-alert-title>Error</capsule-alert-title>
    <capsule-alert-description>Something went wrong</capsule-alert-description>
  </capsule-alert>
</div>

<div style="margin: 1rem 0;">
  <capsule-alert variant="warning">
    <capsule-alert-title>Warning</capsule-alert-title>
    <capsule-alert-description>Please check your input</capsule-alert-description>
  </capsule-alert>
</div>

<div style="margin: 1rem 0;">
  <capsule-alert variant="success">
    <capsule-alert-title>Success</capsule-alert-title>
    <capsule-alert-description>Operation completed successfully</capsule-alert-description>
  </capsule-alert>
</div>

<div style="margin: 1rem 0;">
  <capsule-alert variant="info">
    <capsule-alert-title>Info</capsule-alert-title>
    <capsule-alert-description>This is informational content</capsule-alert-description>
  </capsule-alert>
</div>

```html
<capsule-alert variant="error">
  <capsule-alert-title>Error</capsule-alert-title>
  <capsule-alert-description>Something went wrong</capsule-alert-description>
</capsule-alert>
```

## Components

The Alert component consists of several sub-components:

### `capsule-alert`

The main container for alert messages.

### `capsule-alert-title`

The title of the alert message.

```html
<capsule-alert-title>Alert Title</capsule-alert-title>
```

### `capsule-alert-description`

The description of the alert message.

```html
<capsule-alert-description>Alert description</capsule-alert-description>
```

## Attributes

| Attribute | Type   | Default | Description         |
| --------- | ------ | ------- | ------------------- |
| `variant` | string | default | Alert style variant |

### Variant Values

- `default` — Default alert style
- `error` — Error alert with red colors
- `warning` — Warning alert with yellow/orange colors
- `success` — Success alert with green colors
- `info` — Info alert with blue colors

## Accessibility

- ✅ ARIA role="alert" set automatically
- ✅ Title has role="heading" with aria-level="2"
- ✅ Semantic structure for screen readers
