# Switch

A toggle switch component for representing on/off states. Fully accessible with keyboard navigation, supports multiple sizes, vertical orientation, and can be integrated with forms.

## Installation

```bash
npx @zizigy/capsule add Switch
```

## Usage

### Basic Switch

<div style="margin: 1rem 0; max-width: 100px;">
  <capsule-switch></capsule-switch>
</div>

```html
<capsule-switch></capsule-switch>
```

### Checked State

<div style="margin: 1rem 0; max-width: 100px;">
  <capsule-switch checked></capsule-switch>
</div>

```html
<capsule-switch checked></capsule-switch>
```

### Disabled

<div style="margin: 1rem 0; max-width: 100px;">
  <capsule-switch disabled></capsule-switch>
  <capsule-switch checked disabled></capsule-switch>
</div>

```html
<capsule-switch disabled></capsule-switch>
<capsule-switch
  checked
  disabled
></capsule-switch>
```

### Sizes

<div style="margin: 1rem 0; display: flex; gap: 1rem; align-items: center;">
  <capsule-switch size="sm"></capsule-switch>
  <capsule-switch size="md"></capsule-switch>
  <capsule-switch size="lg"></capsule-switch>
</div>

```html
<capsule-switch size="sm"></capsule-switch>
<capsule-switch size="md"></capsule-switch>
<capsule-switch size="lg"></capsule-switch>
```

### Orientation

#### Horizontal (default)

<div style="margin: 1rem 0; max-width: 100px;">
  <capsule-switch></capsule-switch>
</div>

```html
<capsule-switch></capsule-switch>
```

#### Vertical

<div style="margin: 1rem 0; max-width: 100px; height: 60px;">
  <capsule-switch orientation="vertical"></capsule-switch>
</div>

```html
<capsule-switch orientation="vertical"></capsule-switch>
```

### Form Integration

The switch can be used within HTML forms and will submit its value.

```html
<form>
  <label>
    Enable notifications
    <capsule-switch
      name="notifications"
      checked
    ></capsule-switch>
  </label>
  <button type="submit">Save</button>
</form>
```

## Components

### `capsule-switch`

The main switch component.

## Attributes

| Attribute     | Type    | Default      | Description                         |
| ------------- | ------- | ------------ | ----------------------------------- |
| `checked`     | boolean | `false`      | Controls the checked state (on/off) |
| `disabled`    | boolean | `false`      | Disables the switch                 |
| `size`        | string  | `md`         | Size of the switch                  |
| `orientation` | string  | `horizontal` | Orientation of the switch           |

### Size Values

- `sm` — Small size (28px × 16px)
- `md` — Medium size (36px × 20px) — default
- `lg` — Large size (44px × 24px)

### Orientation Values

- `horizontal` — Horizontal layout (default)
- `vertical` — Vertical layout

## API Reference

### Methods

#### `toggle()`

Toggles the switch's checked state programmatically.

```javascript
const switchElement = document.querySelector('capsule-switch');
switchElement.toggle(); // Toggles between checked and unchecked
```

### Properties

#### `checked`

Gets or sets the checked state of the switch.

```javascript
const switchElement = document.querySelector('capsule-switch');

// Get checked state
console.log(switchElement.checked); // true or false

// Set checked state
switchElement.checked = true; // Check the switch
switchElement.checked = false; // Uncheck the switch
```

#### `disabled`

Gets or sets the disabled state of the switch.

```javascript
const switchElement = document.querySelector('capsule-switch');

// Get disabled state
console.log(switchElement.disabled); // true or false

// Set disabled state
switchElement.disabled = true; // Disable the switch
switchElement.disabled = false; // Enable the switch
```

#### `size`

Gets or sets the size of the switch.

```javascript
const switchElement = document.querySelector('capsule-switch');

// Get size
console.log(switchElement.size); // 'sm', 'md', or 'lg'

// Set size
switchElement.size = 'lg'; // Change to large size
```

### Events

The switch component dispatches the following custom event:

#### `change`

Dispatched when the switch is toggled. The event detail contains the current checked state.

```javascript
const switchElement = document.querySelector('capsule-switch');
switchElement.addEventListener('change', (event) => {
  console.log('Switch toggled, checked:', event.detail.checked);
  // event.detail.checked is a boolean
});
```

**Event Detail:**

- `checked` (boolean) — The current checked state of the switch

### Example: Programmatic Control

```javascript
// Get a reference to the switch
const switchElement = document.querySelector('capsule-switch');

// Listen for change events
switchElement.addEventListener('change', (event) => {
  if (event.detail.checked) {
    console.log('Switch is now ON');
    // Perform action when switched on
  } else {
    console.log('Switch is now OFF');
    // Perform action when switched off
  }
});

// Programmatically toggle the switch
document.querySelector('#toggleButton').addEventListener('click', () => {
  switchElement.toggle();
});

// Programmatically set checked state
switchElement.checked = true; // Turn on
switchElement.checked = false; // Turn off

// Disable/enable the switch
switchElement.disabled = true; // Disable
switchElement.disabled = false; // Enable
```

## Accessibility

- ✅ ARIA role="switch" with aria-checked attribute
- ✅ Keyboard navigation support (Space/Enter to toggle)
- ✅ Proper focus management
- ✅ Form association support
- ✅ Semantic structure for screen readers
