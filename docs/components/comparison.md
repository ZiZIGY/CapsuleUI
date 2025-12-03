# Comparison

A before/after comparison component for comparing two images or content side by side. Users can drag a divider line to reveal more or less of either side. The divider can be controlled with mouse drag, keyboard arrows, or programmatically. Perfect for showcasing design changes, photo edits, or any visual comparisons.

## Installation

```bash
npx @zizigy/capsule add Comparison
```

## Usage

### Basic Comparison

<div style="margin: 1rem 0; max-width: 800px;">
  <capsule-comparison style="aspect-ratio: 16/9; border-radius: 8px; overflow: hidden;">
    <capsule-comparison-before>
      <img src="https://picsum.photos/800/450?random=1" alt="Before" style="width: 100%; height: 100%; object-fit: cover;" />
    </capsule-comparison-before>
    <capsule-comparison-line></capsule-comparison-line>
    <capsule-comparison-after>
      <img src="https://picsum.photos/800/450?random=2" alt="After" style="width: 100%; height: 100%; object-fit: cover;" />
    </capsule-comparison-after>
  </capsule-comparison>
</div>

```html
<capsule-comparison>
  <capsule-comparison-before>
    <img src="before.jpg" alt="Before" />
  </capsule-comparison-before>
  <capsule-comparison-line></capsule-comparison-line>
  <capsule-comparison-after>
    <img src="after.jpg" alt="After" />
  </capsule-comparison-after>
</capsule-comparison>
```

**Keyboard Controls:** Click on the divider line to focus it, then use arrow keys (`←`/`→`) to move the divider. Press `Shift + Arrow` for 10% increments, or `Home`/`End` to jump to the edges.

### Custom Initial Position

Set the initial position of the divider line using the `position` attribute (0-100, where 50 is the center).

<div style="margin: 1rem 0; max-width: 800px;">
  <capsule-comparison position="30" style="aspect-ratio: 16/9; border-radius: 8px; overflow: hidden;">
    <capsule-comparison-before>
      <img src="https://picsum.photos/800/450?random=3" alt="Before" style="width: 100%; height: 100%; object-fit: cover;" />
    </capsule-comparison-before>
    <capsule-comparison-line></capsule-comparison-line>
    <capsule-comparison-after>
      <img src="https://picsum.photos/800/450?random=4" alt="After" style="width: 100%; height: 100%; object-fit: cover;" />
    </capsule-comparison-after>
  </capsule-comparison>
</div>

```html
<capsule-comparison position="30">
  <capsule-comparison-before>
    <img src="before.jpg" alt="Before" />
  </capsule-comparison-before>
  <capsule-comparison-line></capsule-comparison-line>
  <capsule-comparison-after>
    <img src="after.jpg" alt="After" />
  </capsule-comparison-after>
</capsule-comparison>
```

### Custom Divider Content

You have full control over the divider line content! Use the slot to customize it however you want - you can put any HTML content inside.

<div style="margin: 1rem 0; max-width: 800px;">
  <capsule-comparison style="aspect-ratio: 16/9; border-radius: 8px; overflow: hidden;">
    <capsule-comparison-before>
      <img src="https://picsum.photos/800/450?random=5" alt="Before" style="width: 100%; height: 100%; object-fit: cover;" />
    </capsule-comparison-before>
    <capsule-comparison-line>
      <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.2); font-size: 20px;">↔️</div>
    </capsule-comparison-line>
    <capsule-comparison-after>
      <img src="https://picsum.photos/800/450?random=6" alt="After" style="width: 100%; height: 100%; object-fit: cover;" />
    </capsule-comparison-after>
  </capsule-comparison>
</div>

```html
<!-- Simple emoji icon -->
<capsule-comparison-line>
  <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
    ↔️
  </div>
</capsule-comparison-line>

<!-- Custom SVG icon -->
<capsule-comparison-line>
  <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border-radius: 50%;">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M8 12h8M12 8v8" stroke-width="2"/>
    </svg>
  </div>
</capsule-comparison-line>

<!-- No circle, just a simple line -->
<capsule-comparison-line>
  <div style="width: 2px; height: 100%; background: rgba(255,255,255,0.8);"></div>
</capsule-comparison-line>
```

**Note:** The divider line uses a slot, so you can put anything inside it. If you don't provide any content, the component will show a default arrow icon. But since you have the code in your project, you can style it however you want!

### Programmatic Control

Control the divider position programmatically using JavaScript.

<div style="margin: 1rem 0; max-width: 800px;">
  <capsule-comparison id="comparison-control" style="aspect-ratio: 16/9; border-radius: 8px; overflow: hidden;">
    <capsule-comparison-before>
      <img src="https://picsum.photos/800/450?random=7" alt="Before" style="width: 100%; height: 100%; object-fit: cover;" />
    </capsule-comparison-before>
    <capsule-comparison-line></capsule-comparison-line>
    <capsule-comparison-after>
      <img src="https://picsum.photos/800/450?random=8" alt="After" style="width: 100%; height: 100%; object-fit: cover;" />
    </capsule-comparison-after>
  </capsule-comparison>
  <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
    <button onclick="document.querySelector('#comparison-control').setPosition(0)">Show Before</button>
    <button onclick="document.querySelector('#comparison-control').setPosition(50)">Center</button>
    <button onclick="document.querySelector('#comparison-control').setPosition(100)">Show After</button>
  </div>
</div>

```html
<capsule-comparison id="my-comparison">
  <capsule-comparison-before>
    <img src="before.jpg" alt="Before" />
  </capsule-comparison-before>
  <capsule-comparison-line></capsule-comparison-line>
  <capsule-comparison-after>
    <img src="after.jpg" alt="After" />
  </capsule-comparison-after>
</capsule-comparison>

<script>
  const comparison = document.getElementById('my-comparison');
  comparison.setPosition(30); // Set position to 30%
</script>
```

### With Videos

The comparison component works with videos as well.

```html
<capsule-comparison>
  <capsule-comparison-before>
    <video src="before.mp4" autoplay muted loop></video>
  </capsule-comparison-before>
  <capsule-comparison-line></capsule-comparison-line>
  <capsule-comparison-after>
    <video src="after.mp4" autoplay muted loop></video>
  </capsule-comparison-after>
</capsule-comparison>
```

### Custom Styling & Filters

You have full control over the appearance! You can apply CSS filters, overlays, or any styles to the images. Here's an example with a grayscale filter on the "before" image:

<div style="margin: 1rem 0; max-width: 800px;">
  <capsule-comparison style="aspect-ratio: 16/9; border-radius: 8px; overflow: hidden;">
    <capsule-comparison-before>
      <img src="https://picsum.photos/800/450?random=9" alt="Before" style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%);" />
    </capsule-comparison-before>
    <capsule-comparison-line></capsule-comparison-line>
    <capsule-comparison-after>
      <img src="https://picsum.photos/800/450?random=9" alt="After" style="width: 100%; height: 100%; object-fit: cover;" />
    </capsule-comparison-after>
  </capsule-comparison>
</div>

```html
<style>
  .before-image {
    filter: grayscale(100%); /* Black and white */
  }
  
  .after-image {
    /* Color image - no filter */
  }
</style>

<capsule-comparison>
  <capsule-comparison-before>
    <img src="photo.jpg" alt="Before" class="before-image" />
  </capsule-comparison-before>
  <capsule-comparison-line></capsule-comparison-line>
  <capsule-comparison-after>
    <img src="photo.jpg" alt="After" class="after-image" />
  </capsule-comparison-after>
</capsule-comparison>
```

You can use any CSS filters: `grayscale()`, `blur()`, `brightness()`, `contrast()`, `sepia()`, or combine multiple filters. The component gives you complete control over styling!

## Components

The Comparison component consists of several sub-components:

### `capsule-comparison`

The main container for the comparison. Manages the divider position and coordinates all sub-components.

| Attribute | Type   | Default | Description                                              |
| --------- | ------ | ------- | -------------------------------------------------------- |
| `position` | number | 50      | Initial position of the divider line (0-100, where 50 is center) |

### `capsule-comparison-before`

Container for the "before" content. This appears on the left side (or top for vertical layouts).

```html
<capsule-comparison-before>
  <img src="before.jpg" alt="Before" />
</capsule-comparison-before>
```

### `capsule-comparison-after`

Container for the "after" content. This appears on the right side (or bottom for vertical layouts).

```html
<capsule-comparison-after>
  <img src="after.jpg" alt="After" />
</capsule-comparison-after>
```

### `capsule-comparison-line`

The draggable divider line that separates the two sides. Includes keyboard navigation support. You can customize its appearance by putting any HTML content inside it using a slot.

```html
<capsule-comparison-line>
  <!-- Your custom content here -->
  <div>Custom icon or content</div>
</capsule-comparison-line>
```

## Methods

### `setPosition(position)`

Programmatically set the divider position.

- **Parameters:**
  - `position` (number): Position value from 0 to 100
- **Returns:** `void`

```javascript
const comparison = document.querySelector('capsule-comparison');
comparison.setPosition(75); // Move divider to 75%
```

## Events

### `comparison-line-move`

Fired when the divider line is moved (either by dragging or programmatically).

- **Detail:**
  - `position` (number): The new position value (0-100)

```javascript
const comparison = document.querySelector('capsule-comparison');
comparison.addEventListener('comparison-line-move', (event) => {
  console.log('New position:', event.detail.position);
});
```

## Keyboard Navigation

The divider line supports full keyboard navigation. Click on the divider line to focus it, then use the following keys:

- **Arrow Left** (`←`): Move divider left (decrease position by 1%)
- **Arrow Right** (`→`): Move divider right (increase position by 1%)
- **Shift + Arrow Left/Right**: Move by 10% increments (faster navigation)
- **Home**: Move to position 0 (show only "before" content)
- **End**: Move to position 100 (show only "after" content)

**Tip:** Use Tab key to focus the divider line, then use arrow keys to adjust the position without using the mouse.

## Accessibility

The component includes proper ARIA attributes for screen readers:

- The divider line has `role="slider"`
- `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` attributes are set
- Keyboard navigation is fully supported
- Focus indicators are provided

## Styling

The component uses CSS custom properties for easy theming:

```css
capsule-comparison {
  --comparison-position: 50%; /* Controlled by the component */
}
```

You can style the divider line icon using the `::part()` selector:

```css
capsule-comparison-line::part(icon) {
  background: #000;
  color: #fff;
}
```

## Examples

### Image Comparison

Perfect for showcasing design changes or photo edits.

```html
<capsule-comparison style="max-width: 800px; border-radius: 8px; overflow: hidden;">
  <capsule-comparison-before>
    <img src="original.jpg" alt="Original design" />
  </capsule-comparison-before>
  <capsule-comparison-line></capsule-comparison-line>
  <capsule-comparison-after>
    <img src="redesigned.jpg" alt="Redesigned version" />
  </capsule-comparison-after>
</capsule-comparison>
```

### Product Comparison

Compare different versions of a product.

```html
<capsule-comparison position="40">
  <capsule-comparison-before>
    <img src="product-v1.jpg" alt="Product v1" />
  </capsule-comparison-before>
  <capsule-comparison-line></capsule-comparison-line>
  <capsule-comparison-after>
    <img src="product-v2.jpg" alt="Product v2" />
  </capsule-comparison-after>
</capsule-comparison>
```

### Before/After with Filters

Show the same image with different filters applied - perfect for photo editing demonstrations.

```html
<style>
  .sepia-filter {
    filter: sepia(100%) contrast(120%);
  }
  
  .colorful {
    filter: saturate(150%) brightness(110%);
  }
</style>

<capsule-comparison>
  <capsule-comparison-before>
    <img src="photo.jpg" alt="Original" class="sepia-filter" />
  </capsule-comparison-before>
  <capsule-comparison-line></capsule-comparison-line>
  <capsule-comparison-after>
    <img src="photo.jpg" alt="Enhanced" class="colorful" />
  </capsule-comparison-after>
</capsule-comparison>
```

Remember: Since you have the actual code files in your project, you can style everything exactly how you want - filters, overlays, borders, shadows, animations, or anything else!

