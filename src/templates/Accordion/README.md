# __PREFIX__-__COMPONENT__ Component

Accordion component with collapsible content sections.

## Usage

### HTML

```html
<link rel="stylesheet" href="__PREFIX__-__COMPONENT__.style.css">
<script src="__PREFIX__-__COMPONENT__.js"></script>
<script src="__PREFIX__-__COMPONENT__-item.js"></script>

<__PREFIX__-__COMPONENT__ type="single">
  <__PREFIX__-__COMPONENT__-item>
    <button slot="trigger">Section 1</button>
    <div slot="content">Content for section 1</div>
  </__PREFIX__-__COMPONENT__-item>
</__PREFIX__-__COMPONENT__>
```

## Accordion Attributes

| Attribute    | Type                    | Default  | Description                           |
| ------------ | ----------------------- | -------- | ------------------------------------- |
| `type`       | `'single' \| 'multiple'` | `'single'` | Allow single or multiple open items   |
| `collapsible` | `boolean`               | `false`  | Allow closing all items when single. If not set, first item opens by default in single mode (only if no other item has 'open') |

## AccordionItem Attributes

| Attribute | Type      | Default | Description              |
| --------- | --------- | ------- | ------------------------ |
| `open`    | `boolean` | `false` | Whether item is open     |

## Named Slots (AccordionItem)

| Slot Name | Description                    | Required |
| --------- | ------------------------------ | -------- |
| `trigger` | Element that triggers toggle   | Yes      |
| `content` | Content to display when open   | Yes      |

## Examples

### Single Mode (Default)

```html
<__PREFIX__-__COMPONENT__ type="single">
  <__PREFIX__-__COMPONENT__-item>
    <button slot="trigger">What is this?</button>
    <div slot="content">
      This is an accordion component for collapsible content.
    </div>
  </__PREFIX__-__COMPONENT__-item>
  
  <__PREFIX__-__COMPONENT__-item>
    <button slot="trigger">How does it work?</button>
    <div slot="content">
      Click on any trigger to open that section and close others.
    </div>
  </__PREFIX__-__COMPONENT__-item>
</__PREFIX__-__COMPONENT__>
```

> **Note:** In single mode without `collapsible`, the first item opens automatically only if no other item has the `open` attribute.

### Single Mode with Pre-opened Item

```html
<__PREFIX__-__COMPONENT__ type="single">
  <__PREFIX__-__COMPONENT__-item>
    <button slot="trigger">What is this?</button>
    <div slot="content">
      This is an accordion component for collapsible content.
    </div>
  </__PREFIX__-__COMPONENT__-item>
  
  <__PREFIX__-__COMPONENT__-item open>
    <button slot="trigger">How does it work?</button>
    <div slot="content">
      Click on any trigger to open that section and close others.
    </div>
  </__PREFIX__-__COMPONENT__-item>
</__PREFIX__-__COMPONENT__>
```

> **Note:** Since the second item has `open`, the first item won't open automatically.

### Multiple Mode

```html
<__PREFIX__-__COMPONENT__ type="multiple">
  <__PREFIX__-__COMPONENT__-item>
    <button slot="trigger">Section 1</button>
    <div slot="content">Content 1</div>
  </__PREFIX__-__COMPONENT__-item>
  
  <__PREFIX__-__COMPONENT__-item>
    <button slot="trigger">Section 2</button>
    <div slot="content">Content 2</div>
  </__PREFIX__-__COMPONENT__-item>
</__PREFIX__-__COMPONENT__>
```

### Collapsible Single Mode

```html
<__PREFIX__-__COMPONENT__ type="single" collapsible>
  <__PREFIX__-__COMPONENT__-item>
    <button slot="trigger">Section 1</button>
    <div slot="content">Content 1</div>
  </__PREFIX__-__COMPONENT__-item>
  
  <__PREFIX__-__COMPONENT__-item>
    <button slot="trigger">Section 2</button>
    <div slot="content">Content 2</div>
  </__PREFIX__-__COMPONENT__-item>
</__PREFIX__-__COMPONENT__>
```

### Complex Content

```html
<__PREFIX__-__COMPONENT__ type="multiple">
  <__PREFIX__-__COMPONENT__-item open>
    <button slot="trigger">
      <span>🚀 Getting Started</span>
    </button>
    <div slot="content">
      <h3>Welcome!</h3>
      <p>This is a comprehensive guide to get you started.</p>
      <ul>
        <li>Install the component</li>
        <li>Configure your settings</li>
        <li>Start building</li>
      </ul>
    </div>
  </__PREFIX__-__COMPONENT__-item>
  
  <__PREFIX__-__COMPONENT__-item>
    <button slot="trigger">
      <span>⚙️ Configuration</span>
    </button>
    <div slot="content">
      <h3>Configuration Options</h3>
      <p>Here are the available configuration options:</p>
      <code>type="single" | "multiple"</code>
    </div>
  </__PREFIX__-__COMPONENT__-item>
</__PREFIX__-__COMPONENT__>
```

## Programmatic Control

```javascript
const accordion = document.querySelector('__PREFIX__-__COMPONENT__');

// Open specific item
accordion.openItem(0);

// Close specific item
accordion.closeItem(0);

// Toggle specific item
accordion.toggleItem(0);

// Open all items
accordion.openAll();

// Close all items
accordion.closeAll();

// Get current item count
const count = accordion.getItemCount();

// Get all open items
const openItems = accordion.getOpenItems();

// Change type
accordion.setAttribute('type', 'multiple');

// Make collapsible
accordion.setAttribute('collapsible', '');
```

## Individual Item Control

```javascript
const item = document.querySelector('__PREFIX__-__COMPONENT__-item');

// Open item
item.open();

// Close item
item.close();

// Toggle item
item.toggle();
```

## Events

The accordion automatically handles:
- `accordion-item-toggle` - When an item is toggled
- `accordion-item-register` - When an item registers with accordion

## Styling

The component uses CSS variables for customization:

```css
__PREFIX__-__COMPONENT__-item {
  --accordion-border: #e5e7eb;
  --accordion-bg: #f9fafb;
  --accordion-trigger-padding: 1rem;
  --accordion-content-padding: 1rem;
  --accordion-transition: 0.3s ease-in-out;
}
```

## Reactivity & Framework Compatibility

The accordion is designed to work seamlessly with reactive frameworks:

- **No memory caching** - Elements are found dynamically on each interaction
- **React/Vue friendly** - Works with virtual DOM and component re-renders
- **Dynamic item handling** - Automatically adapts when items are added/removed
- **Event-driven architecture** - Uses DOM events instead of stored references

### Framework Examples

#### React
```jsx
const [items, setItems] = useState(['Item 1', 'Item 2']);

return (
  <ui-accordion type="multiple">
    {items.map((item, index) => (
      <ui-accordion-item key={index}>
        <button slot="trigger">{item}</button>
        <div slot="content">Content for {item}</div>
      </ui-accordion-item>
    ))}
  </ui-accordion>
);
```

#### Vue
```vue
<template>
  <ui-accordion type="single">
    <ui-accordion-item v-for="(item, index) in items" :key="index">
      <button slot="trigger">{{ item.title }}</button>
      <div slot="content">{{ item.content }}</div>
    </ui-accordion-item>
  </ui-accordion>
</template>
```

## Accessibility

The component automatically sets:
- `role="region"` on accordion container
- `role="region"` on each accordion item
- `aria-expanded` on trigger elements
- `aria-controls` linking trigger to content
- `aria-multiselectable` based on type
- `aria-hidden` on content panels
