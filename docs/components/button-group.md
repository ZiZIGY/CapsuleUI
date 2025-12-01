# Button Group

A component that groups buttons together with seamless borders. Perfect for grouping related actions.

## Installation

```bash
npx @zizigy/capsule add ButtonGroup
```

## Usage

### Basic Button Group

<div style="margin: 1rem 0;">
<capsule-button-group>
  <capsule-button>One</capsule-button>
  <capsule-button>Two</capsule-button>
  <capsule-button>Three</capsule-button>
</capsule-button-group>
</div>

```html
<capsule-button-group>
  <capsule-button>One</capsule-button>
  <capsule-button>Two</capsule-button>
  <capsule-button>Three</capsule-button>
</capsule-button-group>
```

### Variants in Group

<div style="margin: 1rem 0;">
<capsule-button-group>
  <capsule-button variant="primary">Primary</capsule-button>
  <capsule-button variant="secondary">Secondary</capsule-button>
  <capsule-button variant="outline">Outline</capsule-button>
</capsule-button-group>
</div>

```html
<capsule-button-group>
  <capsule-button variant="primary">Primary</capsule-button>
  <capsule-button variant="secondary">Secondary</capsule-button>
  <capsule-button variant="outline">Outline</capsule-button>
</capsule-button-group>
```

### Semantic Colors

<div style="margin: 1rem 0;">
<capsule-button-group>
  <capsule-button variant="success">Save</capsule-button>
  <capsule-button variant="error">Delete</capsule-button>
</capsule-button-group>
</div>

```html
<capsule-button-group>
  <capsule-button variant="success">Save</capsule-button>
  <capsule-button variant="error">Delete</capsule-button>
</capsule-button-group>
```

### Orientations

#### Horizontal (default)

<div style="margin: 1rem 0;">
<capsule-button-group orientation="horizontal">
  <capsule-button>Left</capsule-button>
  <capsule-button>Center</capsule-button>
  <capsule-button>Right</capsule-button>
</capsule-button-group>
</div>

```html
<capsule-button-group orientation="horizontal">
  <capsule-button>Left</capsule-button>
  <capsule-button>Center</capsule-button>
  <capsule-button>Right</capsule-button>
</capsule-button-group>
```

#### Vertical

<div style="margin: 1rem 0;">
<capsule-button-group orientation="vertical">
  <capsule-button>First</capsule-button>
  <capsule-button>Second</capsule-button>
  <capsule-button>Third</capsule-button>
</capsule-button-group>
</div>

```html
<capsule-button-group orientation="vertical">
  <capsule-button>First</capsule-button>
  <capsule-button>Second</capsule-button>
  <capsule-button>Third</capsule-button>
</capsule-button-group>
```

### Sizes

<div style="margin: 1rem 0;">
<capsule-button-group>
  <capsule-button size="xs">XS</capsule-button>
  <capsule-button size="xs">XS</capsule-button>
  <capsule-button size="xs">XS</capsule-button>
</capsule-button-group>
</div>

<div style="margin: 1rem 0;">
<capsule-button-group>
  <capsule-button size="sm">SM</capsule-button>
  <capsule-button size="sm">SM</capsule-button>
  <capsule-button size="sm">SM</capsule-button>
</capsule-button-group>
</div>

<div style="margin: 1rem 0;">
<capsule-button-group>
  <capsule-button size="md">MD</capsule-button>
  <capsule-button size="md">MD</capsule-button>
  <capsule-button size="md">MD</capsule-button>
</capsule-button-group>
</div>

```html
<capsule-button-group>
  <capsule-button size="xs">XS</capsule-button>
  <capsule-button size="xs">XS</capsule-button>
  <capsule-button size="xs">XS</capsule-button>
</capsule-button-group>
```

### Mixed States

<div style="margin: 1rem 0;">
<capsule-button-group>
  <capsule-button>Enabled</capsule-button>
  <capsule-button>Enabled</capsule-button>
  <capsule-button disabled>Disabled</capsule-button>
</capsule-button-group>
</div>

```html
<capsule-button-group>
  <capsule-button>Enabled</capsule-button>
  <capsule-button>Enabled</capsule-button>
  <capsule-button disabled>Disabled</capsule-button>
</capsule-button-group>
```

## Attributes

| Attribute     | Type   | Default      | Description              |
| ------------- | ------ | ------------ | ------------------------ |
| `orientation` | string | `horizontal` | Button group orientation |

### Orientation Values

- `horizontal` - Arrange buttons horizontally (default)
- `vertical` - Arrange buttons vertically

## Accessibility

- ✅ ARIA role="group" for screen readers
- ✅ Proper focus management
- ✅ Keyboard navigation support

## Notes

- ButtonGroup automatically handles border radius to create seamless connections
- All buttons inside should be consistent in size for best appearance
- Works with all button variants and sizes
