# Pagination

A pagination component for navigating through multiple pages of content. Supports customizable navigation buttons, ellipsis, and various styling options.

## Installation

```bash
npx @zizigy/capsule add Pagination
```

## Usage

### Basic Pagination

<div style="margin: 1rem 0;">
  <capsule-pagination page="1" total-pages="10" items-per-page="5">
    <button slot="previous">← Prev</button>
    <button slot="next">Next →</button>
  </capsule-pagination>
</div>

```html
<capsule-pagination page="1" total-pages="10" items-per-page="5">
  <button slot="previous">← Prev</button>
  <button slot="next">Next →</button>
</capsule-pagination>
```

### With First and Last Buttons

<div style="margin: 1rem 0;">
  <capsule-pagination page="5" total-pages="20" items-per-page="5">
    <button slot="first">First</button>
    <button slot="previous">← Prev</button>
    <button slot="next">Next →</button>
    <button slot="last">Last</button>
  </capsule-pagination>
</div>

```html
<capsule-pagination page="5" total-pages="20" items-per-page="5">
  <button slot="first">First</button>
  <button slot="previous">← Prev</button>
  <button slot="next">Next →</button>
  <button slot="last">Last</button>
</capsule-pagination>
```

### With Ellipsis

When you provide an ellipsis slot, the component automatically shows ellipsis (...) for skipped pages.

<div style="margin: 1rem 0;">
  <capsule-pagination page="10" total-pages="20" items-per-page="5">
    <button slot="first">First</button>
    <button slot="previous">← Prev</button>
    <span slot="ellipsis">…</span>
    <button slot="next">Next →</button>
    <button slot="last">Last</button>
  </capsule-pagination>
</div>

```html
<capsule-pagination page="10" total-pages="20" items-per-page="5">
  <button slot="first">First</button>
  <button slot="previous">← Prev</button>
  <span slot="ellipsis">…</span>
  <button slot="next">Next →</button>
  <button slot="last">Last</button>
</capsule-pagination>
```

### With Boundary Pages

Enable `show-boundary-pages` to always show the first and last page numbers alongside ellipsis.

<div style="margin: 1rem 0;">
  <capsule-pagination page="10" total-pages="20" items-per-page="5" show-boundary-pages>
    <button slot="first">First</button>
    <button slot="previous">← Prev</button>
    <span slot="ellipsis">…</span>
    <button slot="next">Next →</button>
    <button slot="last">Last</button>
  </capsule-pagination>
</div>

```html
<capsule-pagination
  page="10"
  total-pages="20"
  items-per-page="5"
  show-boundary-pages
>
  <button slot="first">First</button>
  <button slot="previous">← Prev</button>
  <span slot="ellipsis">…</span>
  <button slot="next">Next →</button>
  <button slot="last">Last</button>
</capsule-pagination>
```

### Sizes

<div style="margin: 1rem 0; display: flex; flex-direction: column; gap: 1rem;">
  <div>
    <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #64748b;">Small</p>
    <capsule-pagination page="3" total-pages="10" items-per-page="5" size="sm">
      <button slot="previous">←</button>
      <button slot="next">→</button>
    </capsule-pagination>
  </div>
  <div>
    <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #64748b;">Large</p>
    <capsule-pagination page="3" total-pages="10" items-per-page="5" size="lg">
      <button slot="previous">←</button>
      <button slot="next">→</button>
    </capsule-pagination>
  </div>
</div>

```html
<!-- Small -->
<capsule-pagination page="3" total-pages="10" items-per-page="5" size="sm">
  <button slot="previous">←</button>
  <button slot="next">→</button>
</capsule-pagination>

<!-- Large -->
<capsule-pagination page="3" total-pages="10" items-per-page="5" size="lg">
  <button slot="previous">←</button>
  <button slot="next">→</button>
</capsule-pagination>
```

### Variants

<div style="margin: 1rem 0; display: flex; flex-direction: column; gap: 1rem;">
  <div>
    <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #64748b;">Outline</p>
    <capsule-pagination page="3" total-pages="10" items-per-page="5" variant="outline">
      <button slot="previous">←</button>
      <button slot="next">→</button>
    </capsule-pagination>
  </div>
  <div>
    <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #64748b;">Ghost</p>
    <capsule-pagination page="3" total-pages="10" items-per-page="5" variant="ghost">
      <button slot="previous">←</button>
      <button slot="next">→</button>
    </capsule-pagination>
  </div>
</div>

```html
<!-- Outline -->
<capsule-pagination page="3" total-pages="10" items-per-page="5" variant="outline">
  <button slot="previous">←</button>
  <button slot="next">→</button>
</capsule-pagination>

<!-- Ghost -->
<capsule-pagination page="3" total-pages="10" items-per-page="5" variant="ghost">
  <button slot="previous">←</button>
  <button slot="next">→</button>
</capsule-pagination>
```

### Colors

<div style="margin: 1rem 0; display: flex; flex-direction: column; gap: 1rem;">
  <div>
    <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #64748b;">Error</p>
    <capsule-pagination page="3" total-pages="10" items-per-page="5" color="error">
      <button slot="previous">←</button>
      <button slot="next">→</button>
    </capsule-pagination>
  </div>
  <div>
    <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #64748b;">Success</p>
    <capsule-pagination page="3" total-pages="10" items-per-page="5" color="success">
      <button slot="previous">←</button>
      <button slot="next">→</button>
    </capsule-pagination>
  </div>
</div>

```html
<capsule-pagination page="3" total-pages="10" items-per-page="5" color="error">
  <button slot="previous">←</button>
  <button slot="next">→</button>
</capsule-pagination>
```

### Programmatic Control

Control the pagination programmatically using JavaScript methods.

<div style="margin: 1rem 0;">
  <capsule-pagination id="pagination-control" page="5" total-pages="20" items-per-page="5">
    <button slot="first">First</button>
    <button slot="previous">← Prev</button>
    <span slot="ellipsis">…</span>
    <button slot="next">Next →</button>
    <button slot="last">Last</button>
  </capsule-pagination>
  <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
    <button onclick="document.getElementById('pagination-control').previousPage()">Previous</button>
    <button onclick="document.getElementById('pagination-control').goToPage(1)">Go to Page 1</button>
    <button onclick="document.getElementById('pagination-control').nextPage()">Next</button>
  </div>
</div>

```html
<capsule-pagination id="my-pagination" page="5" total-pages="20" items-per-page="5">
  <button slot="previous">← Prev</button>
  <button slot="next">Next →</button>
</capsule-pagination>

<script>
  const pagination = document.getElementById('my-pagination');
  
  // Navigate programmatically
  pagination.goToPage(10);
  pagination.nextPage();
  pagination.previousPage();
</script>
```

### Handling Page Changes

Listen to the `change` event to respond to page navigation.

```html
<capsule-pagination id="my-pagination" page="1" total-pages="10" items-per-page="5">
  <button slot="previous">← Prev</button>
  <button slot="next">Next →</button>
</capsule-pagination>

<script>
  const pagination = document.getElementById('my-pagination');
  
  pagination.addEventListener('change', (event) => {
    console.log('Current page:', event.detail.page);
    console.log('Total pages:', event.detail.totalPages);
    console.log('Items per page:', event.detail.itemsPerPage);
    
    // Load data for the new page
    loadPageData(event.detail.page);
  });
</script>
```

## Attributes

| Attribute             | Type    | Default | Description                                                          |
| --------------------- | ------- | ------- | -------------------------------------------------------------------- |
| `page`                | number  | 1       | Current page number (1-based)                                        |
| `total-pages`         | number  | 1       | Total number of pages                                                |
| `items-per-page`      | number  | 5       | Number of visible page buttons to show                               |
| `show-boundary-pages` | boolean | false   | Show first and last page numbers when using ellipsis                 |
| `size`                | string  | md      | Size of pagination buttons: `sm`, `md`, `lg`                         |
| `variant`             | string  | —       | Visual variant: `outline`, `ghost`                                   |
| `color`               | string  | —       | Color theme for active page: `secondary`, `error`, `warning`, `success`, `info` |

## Slots

The pagination component uses slots for customization:

- `first` - Button/element to navigate to the first page
- `previous` - Button/element to navigate to the previous page
- `next` - Button/element to navigate to the next page
- `last` - Button/element to navigate to the last page
- `ellipsis` - Element to show when pages are skipped (default: `…`)

**Note:** The component automatically detects which slots are provided and adjusts the layout accordingly. If you don't provide a slot, that element won't be rendered.

## Methods

### `goToPage(page)`

Navigate to a specific page number.

- **Parameters:**
  - `page` (number): Page number to navigate to (1-based)
- **Returns:** `void`

```javascript
const pagination = document.querySelector('capsule-pagination');
pagination.goToPage(5);
```

### `nextPage()`

Navigate to the next page.

- **Returns:** `void`

```javascript
pagination.nextPage();
```

### `previousPage()`

Navigate to the previous page.

- **Returns:** `void`

```javascript
pagination.previousPage();
```

## Events

### `change`

Fired when the current page changes (either by user interaction or programmatically).

- **Detail:**
  - `page` (number): The new page number
  - `totalPages` (number): Total number of pages
  - `itemsPerPage` (number): Number of items per page

```javascript
pagination.addEventListener('change', (event) => {
  console.log('Page changed to:', event.detail.page);
});
```

## Data Attributes

The component automatically sets data attributes that you can use for styling:

- `data-on-first-page` - Set when on the first page
- `data-on-last-page` - Set when on the last page

```css
capsule-pagination[data-on-first-page] button[slot="previous"] {
  opacity: 0.5;
  pointer-events: none;
}

capsule-pagination[data-on-last-page] button[slot="next"] {
  opacity: 0.5;
  pointer-events: none;
}
```

## Styling

The component uses CSS parts for styling:

- `page-item` - Individual page button
- `page-item active` - Active page button
- `ellipsis` - Ellipsis indicator
- `pages-container` - Container for page buttons
- `first-item` - First button slot
- `prev-item` - Previous button slot
- `next-item` - Next button slot
- `last-item` - Last button slot

```css
capsule-pagination::part(page-item) {
  /* Style for page buttons */
}

capsule-pagination::part(page-item active) {
  /* Style for active page button */
}
```

## Examples

### Custom Navigation Buttons

You have full control over the navigation buttons. Customize them however you want!

```html
<capsule-pagination page="5" total-pages="20" items-per-page="5">
  <capsule-button slot="first" variant="outline">« First</capsule-button>
  <capsule-button slot="previous" variant="outline">‹ Prev</capsule-button>
  <span slot="ellipsis">…</span>
  <capsule-button slot="next" variant="outline">Next ›</capsule-button>
  <capsule-button slot="last" variant="outline">Last »</capsule-button>
</capsule-pagination>
```

### Disabled Navigation

Use the data attributes to disable navigation buttons when appropriate:

```css
capsule-pagination[data-on-first-page] button[slot="previous"],
capsule-pagination[data-on-first-page] button[slot="first"] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

capsule-pagination[data-on-last-page] button[slot="next"],
capsule-pagination[data-on-last-page] button[slot="last"] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

