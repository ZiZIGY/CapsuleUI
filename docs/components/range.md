# Range

A range slider component for selecting single or multiple values within a defined range. Supports horizontal and vertical orientations, customizable steps, decimal precision, and visual ticks.

## Installation

```bash
npx @zizigy/capsule add Range
```

## Usage

### Basic Range (Multiple Values)

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-range></capsule-range>
</div>

```html
<capsule-range></capsule-range>
```

### Single Value

<div style="margin: 1rem 0; max-width: 400px;">
  <div style="display: flex; align-items: center; gap: 1rem;">
    <capsule-range
      id="single-range"
      value="[50]"
      onchange="document.querySelector('#single-input').value = event.detail.values[0]"
    ></capsule-range>
    <input
      type="number"
      id="single-input"
      value="50"
      min="0"
      max="100"
      oninput="document.querySelector('#single-range').value = `[${Math.max(0, Math.min(100, parseFloat(this.value) || 0))}]`"
      style="width: 80px; padding: 0.5rem;"
    />
  </div>
</div>

```html
<div style="display: flex; align-items: center; gap: 1rem;">
  <capsule-range
    id="single-range"
    value="[50]"
    onchange="document.querySelector('#single-input').value = event.detail.values[0]"
  ></capsule-range>
  <input
    type="number"
    id="single-input"
    value="50"
    min="0"
    max="100"
    oninput="document.querySelector('#single-range').value = `[${Math.max(0, Math.min(100, parseFloat(this.value) || 0))}]`"
  />
</div>
```

### Custom Range

<div style="margin: 1rem 0; max-width: 400px;">
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <capsule-range
      id="custom-range"
      min="0"
      max="1000"
      value="[200, 800]"
      onchange="
        const values = event.detail.values;
        document.querySelector('#custom-min').value = values[0];
        document.querySelector('#custom-max').value = values[1];
      "
    ></capsule-range>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <label style="display: flex; align-items: center; gap: 0.5rem;">
        Min:
        <input
          type="number"
          id="custom-min"
          value="200"
          min="0"
          max="1000"
          oninput="
            const range = document.querySelector('#custom-range');
            const values = range.getValues();
            range.value = `[${Math.max(0, Math.min(1000, parseFloat(this.value) || 0))}, ${values[1]}]`;
          "
          style="width: 100px; padding: 0.5rem;"
        />
      </label>
      <label style="display: flex; align-items: center; gap: 0.5rem;">
        Max:
        <input
          type="number"
          id="custom-max"
          value="800"
          min="0"
          max="1000"
          oninput="
            const range = document.querySelector('#custom-range');
            const values = range.getValues();
            range.value = `[${values[0]}, ${Math.max(0, Math.min(1000, parseFloat(this.value) || 0))}]`;
          "
          style="width: 100px; padding: 0.5rem;"
        />
      </label>
    </div>
  </div>
</div>

```html
<div style="display: flex; flex-direction: column; gap: 0.5rem;">
  <capsule-range
    id="custom-range"
    min="0"
    max="1000"
    value="[200, 800]"
    onchange="
      const values = event.detail.values;
      document.querySelector('#custom-min').value = values[0];
      document.querySelector('#custom-max').value = values[1];
    "
  ></capsule-range>
  <div style="display: flex; gap: 1rem;">
    <label>
      Min:
      <input
        type="number"
        id="custom-min"
        value="200"
        min="0"
        max="1000"
        oninput="
          const range = document.querySelector('#custom-range');
          const values = range.getValues();
          range.value = `[${Math.max(0, Math.min(1000, parseFloat(this.value) || 0))}, ${values[1]}]`;
        "
      />
    </label>
    <label>
      Max:
      <input
        type="number"
        id="custom-max"
        value="800"
        min="0"
        max="1000"
        oninput="
          const range = document.querySelector('#custom-range');
          const values = range.getValues();
          range.value = `[${values[0]}, ${Math.max(0, Math.min(1000, parseFloat(this.value) || 0))}]`;
        "
      />
    </label>
  </div>
</div>
```

### Step

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-range step="10" value="[30, 70]"></capsule-range>
</div>

```html
<capsule-range
  step="10"
  value="[30, 70]"
></capsule-range>
```

### Decimals

<div style="margin: 1rem 0; max-width: 400px;">
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <capsule-range
      id="decimals-range"
      min="0"
      max="10"
      decimals="1"
      step="0.1"
      value="[2.5, 7.5]"
      onchange="
        const values = event.detail.values;
        document.querySelector('#decimals-min').value = parseFloat(values[0].toFixed(1));
        document.querySelector('#decimals-max').value = parseFloat(values[1].toFixed(1));
      "
    ></capsule-range>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <label style="display: flex; align-items: center; gap: 0.5rem;">
        From:
        <input
          type="number"
          id="decimals-min"
          value="2.5"
          min="0"
          max="10"
          step="0.1"
          oninput="
            const range = document.querySelector('#decimals-range');
            const values = range.getValues();
            range.value = `[${Math.max(0, Math.min(10, parseFloat(this.value) || 0))}, ${values[1]}]`;
          "
          style="width: 100px; padding: 0.5rem;"
        />
      </label>
      <label style="display: flex; align-items: center; gap: 0.5rem;">
        To:
        <input
          type="number"
          id="decimals-max"
          value="7.5"
          min="0"
          max="10"
          step="0.1"
          oninput="
            const range = document.querySelector('#decimals-range');
            const values = range.getValues();
            range.value = `[${values[0]}, ${Math.max(0, Math.min(10, parseFloat(this.value) || 0))}]`;
          "
          style="width: 100px; padding: 0.5rem;"
        />
      </label>
    </div>
  </div>
</div>

```html
<div style="display: flex; flex-direction: column; gap: 0.5rem;">
  <capsule-range
    id="decimals-range"
    min="0"
    max="10"
    decimals="1"
    step="0.1"
    value="[2.5, 7.5]"
    onchange="
      const values = event.detail.values;
      document.querySelector('#decimals-min').value = parseFloat(values[0].toFixed(1));
      document.querySelector('#decimals-max').value = parseFloat(values[1].toFixed(1));
    "
  ></capsule-range>
  <div style="display: flex; gap: 1rem;">
    <label>
      From:
      <input
        type="number"
        id="decimals-min"
        value="2.5"
        min="0"
        max="10"
        step="0.1"
        oninput="
          const range = document.querySelector('#decimals-range');
          const values = range.getValues();
          range.value = `[${Math.max(0, Math.min(10, parseFloat(this.value) || 0))}, ${values[1]}]`;
        "
      />
    </label>
    <label>
      To:
      <input
        type="number"
        id="decimals-max"
        value="7.5"
        min="0"
        max="10"
        step="0.1"
        oninput="
          const range = document.querySelector('#decimals-range');
          const values = range.getValues();
          range.value = `[${values[0]}, ${Math.max(0, Math.min(10, parseFloat(this.value) || 0))}]`;
        "
      />
    </label>
  </div>
</div>
```

### Orientation

#### Horizontal (default)

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-range orientation="horizontal"></capsule-range>
</div>

```html
<capsule-range orientation="horizontal"></capsule-range>
```

#### Vertical

<div style="margin: 1rem 0; max-width: 100px; height: 300px;">
  <capsule-range orientation="vertical"></capsule-range>
</div>

```html
<capsule-range orientation="vertical"></capsule-range>
```

### Ticks

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-range show-ticks ticks-density="10"></capsule-range>
</div>

```html
<capsule-range
  show-ticks
  ticks-density="10"
></capsule-range>
```

### Disabled

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-range disabled value="[30, 70]"></capsule-range>
</div>

```html
<capsule-range
  disabled
  value="[30, 70]"
></capsule-range>
```

### Multiple Values

You can set multiple thumbs by providing an array with more than two values:

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-range value="[10, 30, 50, 70, 90]"></capsule-range>
</div>

```html
<capsule-range value="[10, 30, 50, 70, 90]"></capsule-range>
```

### With Input Controls

You can synchronize range values with number inputs for precise control:

<div style="margin: 1rem 0; max-width: 500px;">
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div>
      <label style="display: block; margin-bottom: 0.5rem;">Volume</label>
      <div style="display: flex; align-items: center; gap: 1rem;">
        <capsule-range
          id="volume-range"
          min="0"
          max="100"
          value="[50]"
          onchange="document.querySelector('#volume-input').value = event.detail.values[0]"
        ></capsule-range>
        <input
          type="number"
          id="volume-input"
          value="50"
          min="0"
          max="100"
          oninput="document.querySelector('#volume-range').value = `[${Math.max(0, Math.min(100, parseFloat(this.value) || 0))}]`"
          style="width: 80px; padding: 0.5rem;"
        />
      </div>
    </div>
  </div>
</div>

```html
<div style="display: flex; align-items: center; gap: 1rem;">
  <capsule-range
    id="volume-range"
    min="0"
    max="100"
    value="[50]"
    onchange="document.querySelector('#volume-input').value = event.detail.values[0]"
  ></capsule-range>
  <input
    type="number"
    id="volume-input"
    value="50"
    min="0"
    max="100"
    oninput="document.querySelector('#volume-range').value = `[${Math.max(0, Math.min(100, parseFloat(this.value) || 0))}]`"
  />
</div>
```

### Form Integration

The range component can be used within HTML forms and will submit its values as a JSON string.

```html
<form>
  <label>
    Price Range
    <capsule-range
      name="price"
      min="0"
      max="1000"
      value="[100, 500]"
    ></capsule-range>
  </label>
  <button type="submit">Submit</button>
</form>
```

## Components

### `capsule-range`

The main range slider component.

## Attributes

| Attribute       | Type    | Default      | Description                                 |
| --------------- | ------- | ------------ | ------------------------------------------- |
| `min`           | number  | `0`          | Minimum value                               |
| `max`           | number  | `100`        | Maximum value                               |
| `step`          | number  | `1`          | Step increment                              |
| `decimals`      | number  | `0`          | Number of decimal places                    |
| `value`         | string  | `"[25, 75]"` | JSON array string of values                 |
| `orientation`   | string  | `horizontal` | Orientation of the slider                   |
| `show-ticks`    | boolean | `false`      | Show tick marks on the track                |
| `ticks-density` | number  | `1`          | Density of tick marks (higher = more ticks) |
| `disabled`      | boolean | `false`      | Disables the slider                         |

### Orientation Values

- `horizontal` — Horizontal layout (default)
- `vertical` — Vertical layout

## API Reference

### Methods

#### `updateValues(options, reset = false)`

Updates the range slider's configuration and values.

```javascript
const range = document.querySelector('capsule-range');

// Update with new values
range.updateValues({
  min: 0,
  max: 100,
  step: 5,
  values: [20, 50, 80],
});

// Reset to evenly distributed values
range.updateValues(
  {
    values: [10, 30, 50, 70, 90],
  },
  true
);
```

**Parameters:**

- `options` (object) - Configuration object with any of: `min`, `max`, `step`, `decimals`, `values`, `orientation`, `showTicks`, `ticksDensity`
- `reset` (boolean) - If `true`, values will be evenly distributed; if `false`, provided values will be used

#### `getValues()`

Returns the current values as an array.

```javascript
const range = document.querySelector('capsule-range');
const values = range.getValues(); // [25, 75]
console.log(values);
```

#### `getSettings()`

Returns all current settings including min, max, step, values, orientation, etc.

```javascript
const range = document.querySelector('capsule-range');
const settings = range.getSettings();
console.log(settings);
// {
//   min: 0,
//   max: 100,
//   step: 1,
//   decimals: 0,
//   values: [25, 75],
//   orientation: 'horizontal',
//   showTicks: false,
//   ticksDensity: 1
// }
```

### Properties

#### `value`

Gets or sets the values as a JSON string.

```javascript
const range = document.querySelector('capsule-range');

// Get current values
console.log(range.value); // "[25, 75]"

// Set new values
range.value = '[10, 50, 90]';
```

#### `min`, `max`, `step`, `decimals`, `orientation`

These properties can be accessed and modified directly:

```javascript
const range = document.querySelector('capsule-range');

// Get values
console.log(range.min); // 0
console.log(range.max); // 100

// Set values
range.min = 10;
range.max = 200;
range.step = 5;
range.decimals = 2;
range.orientation = 'vertical';
```

### Events

The range component dispatches the following custom event:

#### `change`

Dispatched when any thumb is moved. The event detail contains the current values array.

```javascript
const range = document.querySelector('capsule-range');
range.addEventListener('change', (event) => {
  console.log('Range changed, values:', event.detail.values);
  // event.detail.values is an array of numbers
});
```

**Event Detail:**

- `values` (array) — The current values array

### Example: Programmatic Control

```javascript
// Get a reference to the range
const range = document.querySelector('capsule-range');

// Listen for change events
range.addEventListener('change', (event) => {
  const values = event.detail.values;
  console.log(`Range: ${values[0]} - ${values[values.length - 1]}`);

  // Update UI based on values
  document.querySelector('#minValue').textContent = values[0];
  document.querySelector('#maxValue').textContent = values[values.length - 1];
});

// Programmatically set values
range.value = '[30, 70]';

// Update configuration
range.updateValues({
  min: 0,
  max: 200,
  step: 10,
  values: [50, 150],
});

// Get current values
const currentValues = range.getValues();
console.log('Current values:', currentValues);

// Disable/enable
range.disabled = true;
range.disabled = false;
```

## Accessibility

- ✅ ARIA role="slider" with proper attributes
- ✅ Keyboard navigation support
- ✅ Proper focus management
- ✅ Form association support
- ✅ Screen reader support
- ✅ Visual feedback for active thumb
