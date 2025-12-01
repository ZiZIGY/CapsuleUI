# Progress

A progress indicator component that displays the progress of a task or operation. Perfect for file uploads, form submissions, or any long-running process.

## Installation

```bash
npx @zizigy/capsule add Progress
```

## Usage

### Basic Progress

<div style="margin: 1rem 0;">
  <capsule-progress value="50"></capsule-progress>
</div>

```html
<capsule-progress value="50"></capsule-progress>
```

### Different Sizes

<div style="margin: 1rem 0; display: flex; flex-direction: column; gap: 1rem;">
  <capsule-progress value="30" size="xs"></capsule-progress>
  <capsule-progress value="40" size="sm"></capsule-progress>
  <capsule-progress value="50" size="md"></capsule-progress>
  <capsule-progress value="60" size="lg"></capsule-progress>
  <capsule-progress value="70" size="xl"></capsule-progress>
</div>

```html
<capsule-progress
  value="30"
  size="xs"
></capsule-progress>
<capsule-progress
  value="40"
  size="sm"
></capsule-progress>
<capsule-progress
  value="50"
  size="md"
></capsule-progress>
<capsule-progress
  value="60"
  size="lg"
></capsule-progress>
<capsule-progress
  value="70"
  size="xl"
></capsule-progress>
```

### Different Colors

<div style="margin: 1rem 0; display: flex; flex-direction: column; gap: 1rem;">
  <capsule-progress value="50" color="primary"></capsule-progress>
  <capsule-progress value="50" color="success"></capsule-progress>
  <capsule-progress value="50" color="error"></capsule-progress>
  <capsule-progress value="50" color="warning"></capsule-progress>
  <capsule-progress value="50" color="info"></capsule-progress>
  <capsule-progress value="50" color="accent"></capsule-progress>
</div>

```html
<capsule-progress
  value="50"
  color="primary"
></capsule-progress>
<capsule-progress
  value="50"
  color="success"
></capsule-progress>
<capsule-progress
  value="50"
  color="error"
></capsule-progress>
<capsule-progress
  value="50"
  color="warning"
></capsule-progress>
<capsule-progress
  value="50"
  color="info"
></capsule-progress>
<capsule-progress
  value="50"
  color="accent"
></capsule-progress>
```

### Custom Max Value

By default, the progress bar uses a max value of 100. You can customize this:

<div style="margin: 1rem 0;">
  <capsule-progress value="3" max="10"></capsule-progress>
  <div style="font-size: 0.875rem; color: var(--capsule-color-text-secondary); margin-top: 0.5rem;">3 out of 10</div>
</div>

```html
<capsule-progress
  value="3"
  max="10"
></capsule-progress>
```

### Animated Progress

The progress bar smoothly animates when the value changes:

<div style="margin: 1rem 0;">
  <capsule-progress id="progress-bar" value="0"></capsule-progress>
  <div style="margin-top: 0.5rem; display: flex; gap: 0.5rem;">
      <button onclick="document.getElementById('progress-bar').setAttribute('value', '0')" style="padding: 0.5rem 1rem; background: var(--capsule-color-primary); color: white; border: none; border-radius: var(--capsule-radius); cursor: pointer;">0%</button>
    <button onclick="document.getElementById('progress-bar').setAttribute('value', '25')" style="padding: 0.5rem 1rem; background: var(--capsule-color-primary); color: white; border: none; border-radius: var(--capsule-radius); cursor: pointer;">25%</button>
    <button onclick="document.getElementById('progress-bar').setAttribute('value', '50')" style="padding: 0.5rem 1rem; background: var(--capsule-color-primary); color: white; border: none; border-radius: var(--capsule-radius); cursor: pointer;">50%</button>
    <button onclick="document.getElementById('progress-bar').setAttribute('value', '75')" style="padding: 0.5rem 1rem; background: var(--capsule-color-primary); color: white; border: none; border-radius: var(--capsule-radius); cursor: pointer;">75%</button>
    <button onclick="document.getElementById('progress-bar').setAttribute('value', '100')" style="padding: 0.5rem 1rem; background: var(--capsule-color-primary); color: white; border: none; border-radius: var(--capsule-radius); cursor: pointer;">100%</button>
  </div>
</div>

```html
<capsule-progress
  id="progress"
  value="0"
></capsule-progress>

<script>
  document.getElementById('progress').setAttribute('value', '50');
</script>
```

## API

### Attributes

| Attribute | Type   | Default     | Description                       |
| --------- | ------ | ----------- | --------------------------------- |
| `value`   | number | `0`         | Current progress value (0 to max) |
| `max`     | number | `100`       | Maximum value of the progress     |
| `size`    | string | `'md'`      | Size of the progress bar          |
| `color`   | string | `'primary'` | Color theme of the progress bar   |

### Size Values

- `xs` - Extra small (0.25rem height)
- `sm` - Small (0.5rem height)
- `md` - Medium (0.75rem height)
- `lg` - Large (1rem height)
- `xl` - Extra large (1.25rem height)

### Color Values

- `primary` - Primary theme color
- `success` - Success theme color
- `error` - Error theme color
- `warning` - Warning theme color
- `info` - Info theme color
- `accent` - Accent theme color

## Accessibility

The component automatically sets:

- `role="progressbar"` for screen readers
- `aria-valuenow` with the current value
- `aria-valuemin` set to 0
- `aria-valuemax` set to the max value
- `aria-label` with a descriptive label

## Styling

You can customize the appearance using CSS parts:

```css
capsule-progress::part(bar) {
  background: linear-gradient(90deg, #2563eb, #8b5cf6);
}
```
