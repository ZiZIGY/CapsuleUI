# Rating

A star rating component for collecting and displaying user ratings. Supports precise ratings with customizable precision, sizes, colors, and can be integrated with forms.

## Installation

```bash
npx capsule add Rating
```

## Usage

### Basic Rating

<div style="margin: 1rem 0;">
  <capsule-rating></capsule-rating>
</div>

```html
<capsule-rating></capsule-rating>
```

### With Initial Value

<div style="margin: 1rem 0;">
  <capsule-rating value="3"></capsule-rating>
</div>

```html
<capsule-rating value="3"></capsule-rating>
```

### Custom Max

<div style="margin: 1rem 0;">
  <capsule-rating max="10" value="7"></capsule-rating>
</div>

```html
<capsule-rating max="10" value="7"></capsule-rating>
```

### Precision

#### Whole Stars (default)

<div style="margin: 1rem 0;">
  <capsule-rating precision="1" value="3"></capsule-rating>
</div>

```html
<capsule-rating precision="1" value="3"></capsule-rating>
```

#### Half Stars

<div style="margin: 1rem 0;">
  <capsule-rating precision="0.5" value="3.5"></capsule-rating>
</div>

```html
<capsule-rating precision="0.5" value="3.5"></capsule-rating>
```

#### Decimal Precision

<div style="margin: 1rem 0;">
  <capsule-rating precision="0.1" value="3.7"></capsule-rating>
</div>

```html
<capsule-rating precision="0.1" value="3.7"></capsule-rating>
```

### Sizes

<div style="margin: 1rem 0; display: flex; flex-direction: column; gap: 1rem;">
  <capsule-rating size="sm" value="3"></capsule-rating>
  <capsule-rating size="md" value="3"></capsule-rating>
  <capsule-rating size="lg" value="3"></capsule-rating>
</div>

```html
<capsule-rating size="sm" value="3"></capsule-rating>
<capsule-rating size="md" value="3"></capsule-rating>
<capsule-rating size="lg" value="3"></capsule-rating>
```

### Colors

<div style="margin: 1rem 0; display: flex; flex-direction: column; gap: 1rem;">
  <capsule-rating color="warning" value="3"></capsule-rating>
  <capsule-rating color="primary" value="3"></capsule-rating>
  <capsule-rating color="error" value="3"></capsule-rating>
  <capsule-rating color="success" value="3"></capsule-rating>
  <capsule-rating color="info" value="3"></capsule-rating>
  <capsule-rating color="secondary" value="3"></capsule-rating>
</div>

```html
<capsule-rating color="warning" value="3"></capsule-rating>
<capsule-rating color="primary" value="3"></capsule-rating>
<capsule-rating color="error" value="3"></capsule-rating>
<capsule-rating color="success" value="3"></capsule-rating>
<capsule-rating color="info" value="3"></capsule-rating>
<capsule-rating color="secondary" value="3"></capsule-rating>
```

### Readonly

<div style="margin: 1rem 0;">
  <capsule-rating readonly value="4"></capsule-rating>
</div>

```html
<capsule-rating readonly value="4"></capsule-rating>
```

### Disabled

<div style="margin: 1rem 0;">
  <capsule-rating disabled value="3"></capsule-rating>
</div>

```html
<capsule-rating disabled value="3"></capsule-rating>
```

### Form Integration

The rating component can be used within HTML forms and will submit its value.

```html
<form>
  <label>
    Rate this product
    <capsule-rating name="rating" value="0"></capsule-rating>
  </label>
  <button type="submit">Submit</button>
</form>
```

### Custom Star Icons

You can provide custom star icons using slots. For example, using emoji:

<div style="margin: 1rem 0;">
  <capsule-rating value="3" size="lg">
    <span slot="star-1-filled">⭐</span>
    <span slot="star-1-empty">☆</span>
    <span slot="star-2-filled">⭐</span>
    <span slot="star-2-empty">☆</span>
    <span slot="star-3-filled">⭐</span>
    <span slot="star-3-empty">☆</span>
    <span slot="star-4-filled">⭐</span>
    <span slot="star-4-empty">☆</span>
    <span slot="star-5-filled">⭐</span>
    <span slot="star-5-empty">☆</span>
  </capsule-rating>
</div>

```html
<capsule-rating value="3" size="lg">
  <span slot="star-1-filled">⭐</span>
  <span slot="star-1-empty">☆</span>
  <span slot="star-2-filled">⭐</span>
  <span slot="star-2-empty">☆</span>
  <span slot="star-3-filled">⭐</span>
  <span slot="star-3-empty">☆</span>
  <span slot="star-4-filled">⭐</span>
  <span slot="star-4-empty">☆</span>
  <span slot="star-5-filled">⭐</span>
  <span slot="star-5-empty">☆</span>
</capsule-rating>
```

You can also use custom SVG icons:

```html
<capsule-rating value="3">
  <svg slot="star-1-filled" viewBox="0 0 24 24" style="width: 100%; height: 100%;">
    <!-- Custom filled star icon -->
  </svg>
  <svg slot="star-1-empty" viewBox="0 0 24 24" style="width: 100%; height: 100%;">
    <!-- Custom empty star icon -->
  </svg>
  <!-- Repeat for other stars (star-2-filled, star-2-empty, etc.) -->
</capsule-rating>
```

## Components

### `capsule-rating`

The main rating component.

## Attributes

| Attribute    | Type    | Default | Description                                      |
| ------------ | ------- | ------- | ------------------------------------------------ |
| `value`      | number  | `0`     | Current rating value                             |
| `max`        | number  | `5`     | Maximum rating value (number of stars)           |
| `precision`  | number  | `1`     | Precision of rating (1, 0.5, or 0.1)            |
| `readonly`   | boolean | `false` | Makes the rating read-only                       |
| `disabled`   | boolean | `false` | Disables the rating                              |
| `size`       | string  | `md`    | Size of the stars                                |
| `color`      | string  | `warning` | Color of filled stars                          |

### Size Values

- `sm` — Small size (16px)
- `md` — Medium size (24px) — default
- `lg` — Large size (32px)

### Color Values

- `warning` — Warning color (default)
- `primary` — Primary color
- `error` — Error color
- `success` — Success color
- `info` — Info color
- `secondary` — Secondary color

### Precision Values

- `1` — Whole stars only (default)
- `0.5` — Half stars allowed
- `0.1` — Decimal precision

## API Reference

### Properties

#### `value`

Gets or sets the current rating value.

```javascript
const rating = document.querySelector('capsule-rating');

// Get current value
console.log(rating.value); // 3.5

// Set new value
rating.value = 4.5;
```

#### `max`

Gets or sets the maximum rating value.

```javascript
const rating = document.querySelector('capsule-rating');

// Get max value
console.log(rating.max); // 5

// Set new max
rating.max = 10;
```

#### `precision`

Gets or sets the precision of the rating.

```javascript
const rating = document.querySelector('capsule-rating');

// Get precision
console.log(rating.precision); // 1

// Set precision
rating.precision = 0.5; // Allow half stars
```

#### `readonly`

Gets or sets the readonly state.

```javascript
const rating = document.querySelector('capsule-rating');

// Get readonly state
console.log(rating.readonly); // false

// Set readonly
rating.readonly = true;
```

#### `disabled`

Gets or sets the disabled state.

```javascript
const rating = document.querySelector('capsule-rating');

// Get disabled state
console.log(rating.disabled); // false

// Set disabled
rating.disabled = true;
```

#### `size`

Gets or sets the size of the stars.

```javascript
const rating = document.querySelector('capsule-rating');

// Get size
console.log(rating.size); // 'md'

// Set size
rating.size = 'lg';
```

#### `color`

Gets or sets the color of filled stars.

```javascript
const rating = document.querySelector('capsule-rating');

// Get color
console.log(rating.color); // 'warning'

// Set color
rating.color = 'primary';
```

### Events

The rating component dispatches the following custom events:

#### `change`

Dispatched when the rating value changes. The event detail contains the new value.

```javascript
const rating = document.querySelector('capsule-rating');
rating.addEventListener('change', (event) => {
  console.log('Rating changed:', event.detail.value);
  // event.detail.value is a number
});
```

**Event Detail:**
- `value` (number) — The new rating value

#### `input`

Dispatched continuously as the user hovers over the rating (before clicking). The event detail contains the hover value.

```javascript
const rating = document.querySelector('capsule-rating');
rating.addEventListener('input', (event) => {
  console.log('Hover value:', event.detail.value);
});
```

**Event Detail:**
- `value` (number) — The hover rating value

### Example: Programmatic Control

```javascript
// Get a reference to the rating
const rating = document.querySelector('capsule-rating');

// Listen for change events
rating.addEventListener('change', (event) => {
  console.log(`User rated: ${event.detail.value} out of ${rating.max}`);
  // Save rating to server, update UI, etc.
});

// Set rating programmatically
rating.value = 4.5;

// Change max stars
rating.max = 10;

// Change precision
rating.precision = 0.5; // Allow half stars

// Make it readonly after submission
rating.readonly = true;
```

### Example: With Input Display

```html
<div style="display: flex; align-items: center; gap: 1rem;">
  <capsule-rating
    id="product-rating"
    value="0"
    onchange="document.querySelector('#rating-value').textContent = event.detail.value"
  ></capsule-rating>
  <span>Rating: <span id="rating-value">0</span> / 5</span>
</div>
```

## Accessibility

- ✅ ARIA role="group" with aria-label
- ✅ Visual feedback on hover
- ✅ Keyboard navigation support
- ✅ Form association support
- ✅ Semantic structure for screen readers
- ✅ Proper focus management

