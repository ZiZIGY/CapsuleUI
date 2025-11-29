# Tooltip

A tooltip component that displays helpful information when hovering over or focusing on an element. Fully CSS-based with smooth animations and multiple placement options.

## Installation

```bash
npx capsule add Tooltip
```

## Usage

### Basic Tooltip

<div style="margin: 1rem 0; display: flex; justify-content: center; padding: 2rem;">
  <capsule-tooltip>
    <capsule-tooltip-trigger>
      <capsule-button>Hover me</capsule-button>
    </capsule-tooltip-trigger>
    <capsule-tooltip-content>
      This is a tooltip
    </capsule-tooltip-content>
  </capsule-tooltip>
</div>

```html
<capsule-tooltip>
  <capsule-tooltip-trigger>
    <capsule-button>Hover me</capsule-button>
  </capsule-tooltip-trigger>
  <capsule-tooltip-content>
    This is a tooltip
  </capsule-tooltip-content>
</capsule-tooltip>
```

### Placement

Tooltips can be positioned in four directions:

#### Top (default)

<div style="margin: 1rem 0; display: flex; justify-content: center; padding: 2rem;">
  <capsule-tooltip placement="top">
    <capsule-tooltip-trigger>
      <capsule-button>Top</capsule-button>
    </capsule-tooltip-trigger>
    <capsule-tooltip-content>
      Tooltip on top
    </capsule-tooltip-content>
  </capsule-tooltip>
</div>

```html
<capsule-tooltip placement="top">
  <capsule-tooltip-trigger>
    <capsule-button>Top</capsule-button>
  </capsule-tooltip-trigger>
  <capsule-tooltip-content>
    Tooltip on top
  </capsule-tooltip-content>
</capsule-tooltip>
```

#### Bottom

<div style="margin: 1rem 0; display: flex; justify-content: center; padding: 2rem;">
  <capsule-tooltip placement="bottom">
    <capsule-tooltip-trigger>
      <capsule-button>Bottom</capsule-button>
    </capsule-tooltip-trigger>
    <capsule-tooltip-content>
      Tooltip on bottom
    </capsule-tooltip-content>
  </capsule-tooltip>
</div>

```html
<capsule-tooltip placement="bottom">
  <capsule-tooltip-trigger>
    <capsule-button>Bottom</capsule-button>
  </capsule-tooltip-trigger>
  <capsule-tooltip-content>
    Tooltip on bottom
  </capsule-tooltip-content>
</capsule-tooltip>
```

#### Left

<div style="margin: 1rem 0; display: flex; justify-content: center; padding: 2rem;">
  <capsule-tooltip placement="left">
    <capsule-tooltip-trigger>
      <capsule-button>Left</capsule-button>
    </capsule-tooltip-trigger>
    <capsule-tooltip-content>
      Tooltip on left
    </capsule-tooltip-content>
  </capsule-tooltip>
</div>

```html
<capsule-tooltip placement="left">
  <capsule-tooltip-trigger>
    <capsule-button>Left</capsule-button>
  </capsule-tooltip-trigger>
  <capsule-tooltip-content>
    Tooltip on left
  </capsule-tooltip-content>
</capsule-tooltip>
```

#### Right

<div style="margin: 1rem 0; display: flex; justify-content: center; padding: 2rem;">
  <capsule-tooltip placement="right">
    <capsule-tooltip-trigger>
      <capsule-button>Right</capsule-button>
    </capsule-tooltip-trigger>
    <capsule-tooltip-content>
      Tooltip on right
    </capsule-tooltip-content>
  </capsule-tooltip>
</div>

```html
<capsule-tooltip placement="right">
  <capsule-tooltip-trigger>
    <capsule-button>Right</capsule-button>
  </capsule-tooltip-trigger>
  <capsule-tooltip-content>
    Tooltip on right
  </capsule-tooltip-content>
</capsule-tooltip>
```

### Disabled

<div style="margin: 1rem 0; display: flex; justify-content: center; padding: 2rem;">
  <capsule-tooltip disabled>
    <capsule-tooltip-trigger>
      <capsule-button>Disabled</capsule-button>
    </capsule-tooltip-trigger>
    <capsule-tooltip-content>
      This tooltip won't show
    </capsule-tooltip-content>
  </capsule-tooltip>
</div>

```html
<capsule-tooltip disabled>
  <capsule-tooltip-trigger>
    <capsule-button>Disabled</capsule-button>
  </capsule-tooltip-trigger>
  <capsule-tooltip-content>
    This tooltip won't show
  </capsule-tooltip-content>
</capsule-tooltip>
```

### With Different Triggers

The trigger can be any element:

<div style="margin: 1rem 0; display: flex; justify-content: center; gap: 1rem; padding: 2rem;">
  <capsule-tooltip>
    <capsule-tooltip-trigger>
      <span style="text-decoration: underline; cursor: pointer;">Text link</span>
    </capsule-tooltip-trigger>
    <capsule-tooltip-content>
      Hover over text
    </capsule-tooltip-content>
  </capsule-tooltip>
  <capsule-tooltip>
    <capsule-tooltip-trigger>
      <span style="display: inline-block; width: 40px; height: 40px; background: var(--capsule-color-primary); border-radius: 50%; cursor: pointer;"></span>
    </capsule-tooltip-trigger>
    <capsule-tooltip-content>
      Icon tooltip
    </capsule-tooltip-content>
  </capsule-tooltip>
</div>

```html
<capsule-tooltip>
  <capsule-tooltip-trigger>
    <span style="text-decoration: underline; cursor: pointer;">Text link</span>
  </capsule-tooltip-trigger>
  <capsule-tooltip-content>
    Hover over text
  </capsule-tooltip-content>
</capsule-tooltip>
```

## Components

The Tooltip component consists of three sub-components:

### `capsule-tooltip`

The main container component that manages tooltip positioning and visibility.

### `capsule-tooltip-trigger`

The element that triggers the tooltip display on hover or focus. Can contain any content (buttons, links, icons, etc.).

### `capsule-tooltip-content`

The tooltip content that is displayed. Contains the text or HTML to show in the tooltip.

## Attributes

### `capsule-tooltip`

| Attribute   | Type    | Default | Description                                    |
| ----------- | ------- | ------- | ---------------------------------------------- |
| `placement` | string  | `top`   | Tooltip placement direction                    |
| `disabled`  | boolean | `false` | Disables the tooltip (prevents it from showing) |

#### Placement Values

- `top` — Tooltip appears above the trigger (default)
- `bottom` — Tooltip appears below the trigger
- `left` — Tooltip appears to the left of the trigger
- `right` — Tooltip appears to the right of the trigger

### `capsule-tooltip-trigger`

No attributes. This component serves as a wrapper for the trigger element.

### `capsule-tooltip-content`

No attributes. This component serves as a wrapper for the tooltip content.

## Accessibility

- ✅ ARIA role="tooltip" attributes
- ✅ Keyboard focus support (tooltip shows on focus-within)
- ✅ Proper semantic structure for screen readers
- ✅ Pointer events handling for hover interactions

