# Tour

A tour component for guiding users through your interface. Highlights target elements and displays step-by-step instructions.

## Installation

```bash
npx @zizigy/capsule add Tour
```

## Usage

### Basic Tour

<div style="margin: 1rem 0;">
  <capsule-button id="tour-button1">Button 1</capsule-button>
  <capsule-button id="tour-button2">Button 2</capsule-button>
  
  <capsule-tour id="my-tour" hidden>
    <capsule-tour-step value="1" target="#tour-button1" position="bottom">
      <h3 style="margin: 0 0 0.5rem 0;">Welcome!</h3>
      <p style="margin: 0 0 1rem 0;">This is your main button</p>
      <div style="display: flex; gap: 0.5rem;">
        <capsule-button onclick="document.getElementById('my-tour').skip()">Ok</capsule-button>
      </div>
    </capsule-tour-step>
  </capsule-tour>
  
  <capsule-button color="success" onclick="document.getElementById('my-tour').start()">Start Tour</capsule-button>
</div>

```html
<button id="my-button">Click me</button>

<capsule-tour id="my-tour">
  <capsule-tour-step
    value="1"
    target="#my-button"
    position="bottom"
  >
    <h3>Welcome!</h3>
    <p>This is your main button</p>
    <button onclick="document.getElementById('my-tour').next()">Next</button>
  </capsule-tour-step>
</capsule-tour>

<script>
  // Start the tour
  document.getElementById('my-tour').start();
</script>
```

### Position Options

The tour step can be positioned relative to the target element:

- `top` - Above the target
- `bottom` - Below the target (default)
- `left` - To the left of the target
- `right` - To the right of the target

```html
<capsule-tour-step
  value="1"
  target="#element"
  position="top"
>
  <!-- Content -->
</capsule-tour-step>
```

### Programmatic Control

Control the tour using JavaScript API:

```html
<capsule-tour id="my-tour">
  <capsule-tour-step
    value="1"
    target="#button1"
    >Step 1</capsule-tour-step
  >
  <capsule-tour-step
    value="2"
    target="#button2"
    >Step 2</capsule-tour-step
  >
  <capsule-tour-step
    value="3"
    target="#button3"
    >Step 3</capsule-tour-step
  >
</capsule-tour>

<script>
  const tour = document.getElementById('my-tour');

  // Start tour
  tour.start();

  // Navigate
  tour.next(); // Go to next step
  tour.prev(); // Go to previous step
  tour.goToStep(2); // Go to specific step
  tour.skip(); // Skip/close tour

  // Check state
  tour.isActive(); // Returns true if tour is active
  tour.getCurrentStep(); // Returns current step number
  tour.getTotalSteps(); // Returns total number of steps
</script>
```

## Attributes

### `capsule-tour`

| Attribute | Type   | Default | Description                                                               |
| --------- | ------ | ------- | ------------------------------------------------------------------------- |
| `value`   | number | —       | Current active step number (1-based). If empty or invalid, tour is hidden |

### `capsule-tour-step`

| Attribute  | Type   | Default  | Description                                                   |
| ---------- | ------ | -------- | ------------------------------------------------------------- |
| `value`    | number | —        | Step number (1-based)                                         |
| `target`   | string | —        | CSS selector for the target element                           |
| `position` | string | `bottom` | Position relative to target: `top`, `bottom`, `left`, `right` |

## Methods

### `start()`

Start the tour from the first step.

```javascript
tour.start();
```

### `next()`

Navigate to the next step.

```javascript
tour.next(); // Returns true if moved, false if already at last step
```

### `prev()`

Navigate to the previous step.

```javascript
tour.prev(); // Returns true if moved, false if already at first step
```

### `skip()`

Skip/close the tour.

```javascript
tour.skip();
```

### `goToStep(stepNumber)`

Navigate to a specific step.

```javascript
tour.goToStep(2); // Go to step 2
```

### `getCurrentStep()`

Get the current step number.

```javascript
const step = tour.getCurrentStep(); // Returns number or null
```

### `getTotalSteps()`

Get the total number of steps.

```javascript
const total = tour.getTotalSteps(); // Returns number
```

### `isActive()`

Check if the tour is currently active.

```javascript
if (tour.isActive()) {
  console.log('Tour is active');
}
```

## Styling

The tour automatically adds the `tour-active` class to target elements. Customize the overlay effect:

```css
/* Customize the overlay effect */
.tour-active {
  position: relative;
  z-index: 9998;
}

.tour-active::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 2px solid var(--capsule-color-primary);
  border-radius: var(--capsule-radius);
  pointer-events: none;
}
```

Customize the step appearance:

```css
capsule-tour-step {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

## Behavior

- **Auto-scroll**: The tour automatically scrolls to show target elements, including nested scrollable containers
- **Auto-positioning**: Steps are automatically positioned relative to their targets, with smart viewport boundary detection
- **Overlay**: Target elements receive the `tour-active` class for easy styling
- **Hidden by default**: Tour is hidden when `value` is empty, null, or invalid
