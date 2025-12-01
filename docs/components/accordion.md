# Accordion

A collapsible content component for organizing information into expandable/collapsible panels. Perfect for FAQs, categories, or sections.

## Installation

```bash
npx @zizigy/capsule add Accordion
```

## Usage

### Basic Accordion

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-accordion>
    <capsule-accordion-panel>
      <capsule-accordion-trigger>
        Is it accessible?
      </capsule-accordion-trigger>
      <capsule-accordion-content>
        Yes. It adheres to the WAI-ARIA design pattern.
      </capsule-accordion-content>
    </capsule-accordion-panel>
    <capsule-accordion-panel>
      <capsule-accordion-trigger>
        How does it work?
      </capsule-accordion-trigger>
      <capsule-accordion-content>
        CapsuleAccordion uses CSS Grid transitions for smooth animations.
      </capsule-accordion-content>
    </capsule-accordion-panel>
  </capsule-accordion>
</div>

```html
<capsule-accordion>
  <capsule-accordion-panel>
    <capsule-accordion-trigger> Is it accessible? </capsule-accordion-trigger>
    <capsule-accordion-content>
      Yes. It adheres to the WAI-ARIA design pattern.
    </capsule-accordion-content>
  </capsule-accordion-panel>
</capsule-accordion>
```

### Type: Single (default)

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-accordion type="single">
    <capsule-accordion-panel open>
      <capsule-accordion-trigger>
        Item 1
      </capsule-accordion-trigger>
      <capsule-accordion-content>
        Content for item 1
      </capsule-accordion-content>
    </capsule-accordion-panel>
    <capsule-accordion-panel>
      <capsule-accordion-trigger>
        Item 2
      </capsule-accordion-trigger>
      <capsule-accordion-content>
        Content for item 2
      </capsule-accordion-content>
    </capsule-accordion-panel>
  </capsule-accordion>
</div>

```html
<capsule-accordion type="single">
  <capsule-accordion-panel open> ... </capsule-accordion-panel>
</capsule-accordion>
```

### Type: Multiple

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-accordion type="multiple">
    <capsule-accordion-panel>
      <capsule-accordion-trigger>
        Section 1
      </capsule-accordion-trigger>
      <capsule-accordion-content>
        Multiple panels can be open at once.
      </capsule-accordion-content>
    </capsule-accordion-panel>
    <capsule-accordion-panel>
      <capsule-accordion-trigger>
        Section 2
      </capsule-accordion-trigger>
      <capsule-accordion-content>
        Both panels can be opened simultaneously.
      </capsule-accordion-content>
    </capsule-accordion-panel>
  </capsule-accordion>
</div>

```html
<capsule-accordion type="multiple">
  <capsule-accordion-panel>...</capsule-accordion-panel>
  <capsule-accordion-panel>...</capsule-accordion-panel>
</capsule-accordion>
```

### Collapsible

When `collapsible` attribute is present, you can close all panels (including the first one).

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-accordion collapsible>
    <capsule-accordion-panel open>
      <capsule-accordion-trigger>
        Collapsible Panel
      </capsule-accordion-trigger>
      <capsule-accordion-content>
        This panel can be closed even if it's the only open one.
      </capsule-accordion-content>
    </capsule-accordion-panel>
  </capsule-accordion>
</div>

```html
<capsule-accordion collapsible>
  <capsule-accordion-panel open>...</capsule-accordion-panel>
</capsule-accordion>
```

### Custom Trigger Content

The trigger slot accepts any content, including buttons, icons, or other interactive elements.

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-accordion collapsible>
    <capsule-accordion-panel>
      <capsule-accordion-trigger exclude-self>
        <capsule-button size="sm">
          <div style="display: flex; align-items: center; gap: 8px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>Settings</span>
          </div>
        </capsule-button>
      </capsule-accordion-trigger>
      <capsule-accordion-content>
        You can place any content in the trigger, including buttons, icons, or other components.
      </capsule-accordion-content>
    </capsule-accordion-panel>
  </capsule-accordion>
</div>

```html
<capsule-accordion>
  <capsule-accordion-panel>
    <capsule-accordion-trigger exclude-self>
      <capsule-button size="sm">
        <svg>...</svg>
        <span>Settings</span>
      </capsule-button>
    </capsule-accordion-trigger>
    <capsule-accordion-content> ... </capsule-accordion-content>
  </capsule-accordion-panel>
</capsule-accordion>
```

## Components

The Accordion component consists of several sub-components:

### `capsule-accordion`

The main container for accordion panels.

### `capsule-accordion-panel`

An individual accordion panel. Can have `open` attribute to set initial state.

```html
<capsule-accordion-panel open> ... </capsule-accordion-panel>
```

### `capsule-accordion-trigger`

The clickable header that toggles the panel.

| Attribute      | Type    | Default | Description                                              |
| -------------- | ------- | ------- | -------------------------------------------------------- |
| `exclude-self` | boolean | false   | Disables toggle when clicking the trigger element itself |

When `exclude-self` is set, the trigger only responds to clicks on its children (e.g., buttons, icons), not on the empty space. This is useful when you have interactive elements inside the trigger.

```html
<capsule-accordion-trigger exclude-self>
  <capsule-button>Edit</capsule-button>
</capsule-accordion-trigger>
```

### `capsule-accordion-content`

The collapsible content area.

```html
<capsule-accordion-content> Panel content here </capsule-accordion-content>
```

## Attributes

| Attribute     | Type    | Default | Description                                   |
| ------------- | ------- | ------- | --------------------------------------------- |
| `type`        | string  | single  | Accordion behavior (single or multiple)       |
| `collapsible` | boolean | false   | Allow closing all panels, including the first |

### Type Values

- `single` — Only one panel can be open at a time (default)
- `multiple` — Multiple panels can be open simultaneously

## Accessibility

- ✅ ARIA roles (role="region", role="button")
- ✅ Keyboard navigation support
- ✅ Proper focus management
- ✅ Semantic structure for screen readers
