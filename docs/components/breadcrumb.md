# Breadcrumb

A navigation component that shows the user's location in a site's hierarchy. Breadcrumbs help users understand where they are and navigate to parent pages.

## Installation

```bash
npx capsule add Breadcrumb
```

## Usage

### Basic Breadcrumb

<div style="margin: 1rem 0;">
<capsule-breadcrumb>
  <capsule-breadcrumb-item>
    <a href="#">Home</a>
  </capsule-breadcrumb-item>
  <capsule-breadcrumb-separator></capsule-breadcrumb-separator>
  <capsule-breadcrumb-item>
    <a href="#">Category</a>
  </capsule-breadcrumb-item>
  <capsule-breadcrumb-separator></capsule-breadcrumb-separator>
  <capsule-breadcrumb-item>
    Current Page
  </capsule-breadcrumb-item>
</capsule-breadcrumb>
</div>

```html
<capsule-breadcrumb>
  <capsule-breadcrumb-item>
    <a href="#">Home</a>
  </capsule-breadcrumb-item>
  <capsule-breadcrumb-separator></capsule-breadcrumb-separator>
  <capsule-breadcrumb-item>
    <a href="#">Category</a>
  </capsule-breadcrumb-item>
  <capsule-breadcrumb-separator></capsule-breadcrumb-separator>
  <capsule-breadcrumb-item>
    Current Page
  </capsule-breadcrumb-item>
</capsule-breadcrumb>
```

### With Ellipsis

<div style="margin: 1rem 0;">
<capsule-breadcrumb>
  <capsule-breadcrumb-item>
    <a href="#">Home</a>
  </capsule-breadcrumb-item>
  <capsule-breadcrumb-separator></capsule-breadcrumb-separator>
  <capsule-breadcrumb-ellipsis></capsule-breadcrumb-ellipsis>
  <capsule-breadcrumb-separator></capsule-breadcrumb-separator>
  <capsule-breadcrumb-item>
    <a href="#">Page 5</a>
  </capsule-breadcrumb-item>
  <capsule-breadcrumb-separator></capsule-breadcrumb-separator>
  <capsule-breadcrumb-item>
    Current Page
  </capsule-breadcrumb-item>
</capsule-breadcrumb>
</div>

```html
<capsule-breadcrumb>
  <capsule-breadcrumb-item>
    <a href="#">Home</a>
  </capsule-breadcrumb-item>
  <capsule-breadcrumb-separator></capsule-breadcrumb-separator>
  <capsule-breadcrumb-ellipsis></capsule-breadcrumb-ellipsis>
  <capsule-breadcrumb-separator></capsule-breadcrumb-separator>
  <capsule-breadcrumb-item>
    <a href="#">Page 5</a>
  </capsule-breadcrumb-item>
  <capsule-breadcrumb-separator></capsule-breadcrumb-separator>
  <capsule-breadcrumb-item>
    Current Page
  </capsule-breadcrumb-item>
</capsule-breadcrumb>
```

### Custom Separator

You can place any content inside <capsule-breadcrumb-separator></capsule-breadcrumb-separator>, such as emoji, SVG, custom text, etc.

<div style="margin: 1rem 0;">
<capsule-breadcrumb>
  <capsule-breadcrumb-item>
    <a href="#">Home</a>
  </capsule-breadcrumb-item>
  <capsule-breadcrumb-separator>➡️</capsule-breadcrumb-separator>
  <capsule-breadcrumb-item>
    Features
  </capsule-breadcrumb-item>
  <capsule-breadcrumb-separator>
    <svg width="12" height="12" style="vertical-align:middle;"><circle cx="6" cy="6" r="5" fill="#888"/></svg>
  </capsule-breadcrumb-separator>
  <capsule-breadcrumb-item>Demo</capsule-breadcrumb-item>
</capsule-breadcrumb>
</div>

```html
<capsule-breadcrumb-separator>➡️</capsule-breadcrumb-separator>
<!-- any content: Emoji, Icon, SVG, etc. -->
<capsule-breadcrumb-separator>
  <svg width="12" height="12"><circle cx="6" cy="6" r="5" fill="#888"/></svg>
</capsule-breadcrumb-separator>
```

## Components

The Breadcrumb component consists of several sub-components:

### `capsule-breadcrumb`

The main container for breadcrumb items.

### `capsule-breadcrumb-item`

A single breadcrumb item. Can contain links or plain text.

```html
<capsule-breadcrumb-item>
  <a href="#">Link</a>
</capsule-breadcrumb-item>
```

### `capsule-breadcrumb-separator`

A separator between breadcrumb items (typically `/`, `>`, emoji, SVG or any custom content).

```html
<capsule-breadcrumb-separator>></capsule-breadcrumb-separator>
<capsule-breadcrumb-separator> A<svg width="12" height="12"></svg>
</capsule-breadcrumb-separator>
```

### `capsule-breadcrumb-ellipsis`

An ellipsis (`...`) used to indicate hidden breadcrumb items.

```html
<capsule-breadcrumb-ellipsis></capsule-breadcrumb-ellipsis>
```

## Accessibility

- ✅ Semantic HTML structure
- ✅ ARIA navigation landmarks
- ✅ Keyboard navigation support
- ✅ Screen reader support

