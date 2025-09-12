# __PREFIX__-__COMPONENT__ Component

Tabs component for organizing content into multiple panels.

## Usage

### HTML

```html
<link rel="stylesheet" href="__PREFIX__-__COMPONENT__.style.css">
<script src="__PREFIX__-__COMPONENT__.js"></script>
<script src="__PREFIX__-__COMPONENT__-list.js"></script>
<script src="__PREFIX__-__COMPONENT__-trigger.js"></script>
<script src="__PREFIX__-__COMPONENT__-panel.js"></script>

<__PREFIX__-__COMPONENT__ value="tab1">
  <__PREFIX__-__COMPONENT__-list>
    <__PREFIX__-__COMPONENT__-trigger value="tab1">Tab 1</__PREFIX__-__COMPONENT__-trigger>
    <__PREFIX__-__COMPONENT__-trigger value="tab2">Tab 2</__PREFIX__-__COMPONENT__-trigger>
    <__PREFIX__-__COMPONENT__-trigger value="tab3">Tab 3</__PREFIX__-__COMPONENT__-trigger>
  </__PREFIX__-__COMPONENT__-list>
  
  <__PREFIX__-__COMPONENT__-panel value="tab1">
    <h3>Content for Tab 1</h3>
    <p>This is the content for the first tab.</p>
  </__PREFIX__-__COMPONENT__-panel>
  
  <__PREFIX__-__COMPONENT__-panel value="tab2">
    <h3>Content for Tab 2</h3>
    <p>This is the content for the second tab.</p>
  </__PREFIX__-__COMPONENT__-panel>
  
  <__PREFIX__-__COMPONENT__-panel value="tab3">
    <h3>Content for Tab 3</h3>
    <p>This is the content for the third tab.</p>
  </__PREFIX__-__COMPONENT__-panel>
</__PREFIX__-__COMPONENT__>
```

## Attributes

### Tabs Attributes

| Attribute | Type   | Default | Description              |
| --------- | ------ | ------- | ------------------------ |
| `value`   | string | -       | Currently active tab value |

### TabsTrigger Attributes

| Attribute | Type   | Default | Description              |
| --------- | ------ | ------- | ------------------------ |
| `value`   | string | -       | Unique identifier for tab |
| `active`  | boolean | `false` | Whether tab is currently active |

### TabsPanel Attributes

| Attribute | Type   | Default | Description              |
| --------- | ------ | ------- | ------------------------ |
| `value`   | string | -       | Unique identifier for panel |
| `active`  | boolean | `false` | Whether panel is currently active |

## Examples

### Basic Usage

```html
<__PREFIX__-__COMPONENT__ value="overview">
  <__PREFIX__-__COMPONENT__-list>
    <__PREFIX__-__COMPONENT__-trigger value="overview">Overview</__PREFIX__-__COMPONENT__-trigger>
    <__PREFIX__-__COMPONENT__-trigger value="details">Details</__PREFIX__-__COMPONENT__-trigger>
    <__PREFIX__-__COMPONENT__-trigger value="settings">Settings</__PREFIX__-__COMPONENT__-trigger>
  </__PREFIX__-__COMPONENT__-list>
  
  <__PREFIX__-__COMPONENT__-panel value="overview">
    <h2>Overview</h2>
    <p>General information about the product.</p>
  </__PREFIX__-__COMPONENT__-panel>
  
  <__PREFIX__-__COMPONENT__-panel value="details">
    <h2>Details</h2>
    <p>Detailed specifications and features.</p>
  </__PREFIX__-__COMPONENT__-panel>
  
  <__PREFIX__-__COMPONENT__-panel value="settings">
    <h2>Settings</h2>
    <p>Configuration options and preferences.</p>
  </__PREFIX__-__COMPONENT__-panel>
</__PREFIX__-__COMPONENT__>
```

### Programmatic Control

```javascript
const tabs = document.querySelector('__PREFIX__-__COMPONENT__');

// Switch to specific tab
tabs.setActiveTab('details');

// Get current active tab
console.log(tabs.getActiveTab()); // 'details'

// Get all tab values
console.log(tabs.getTabsValues()); // ['overview', 'details', 'settings']

// Get number of tabs
console.log(tabs.getTabsCount()); // 3
```

## Events

### tabs-trigger-click

Fired when a tab trigger is clicked.

```javascript
tabs.addEventListener('tabs-trigger-click', (event) => {
  console.log('Tab clicked:', event.detail.trigger);
});
```

## Animation & Styling

The tabs use CSS Grid for smooth height animations with a swipe-like effect:

```css
/* Grid-based animation */
__PREFIX__-__COMPONENT__-panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 400ms ease-in-out;
}

__PREFIX__-__COMPONENT__-panel[active] {
  grid-template-rows: 1fr;
}
```

### Animation Features

- **Swipe effect** - Content grows from its natural height
- **Smooth transitions** - 400ms ease-in-out animation
- **Grid-based** - Uses CSS Grid for optimal performance
- **No JavaScript** - Pure CSS animation

The tabs use CSS parts for styling:

```css
/* Customize trigger appearance */
__PREFIX__-__COMPONENT__-trigger::part(trigger) {
  background-color: #f0f0f0;
  border-radius: 4px;
  margin-right: 8px;
}

/* Customize active trigger */
__PREFIX__-__COMPONENT__-trigger[active]::part(trigger) {
  background-color: #007bff;
  color: white;
}

/* Customize panel content */
__PREFIX__-__COMPONENT__-panel::part(panel) {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}
```

## Accessibility

The tabs component includes full ARIA support:

- `role="tablist"` on the tabs list
- `role="tab"` on triggers
- `role="tabpanel"` on panels
- `aria-selected` on triggers
- `aria-hidden` on panels
- `aria-controls` and `aria-labelledby` for proper relationships

## Framework Integration

### React

```jsx
import { useEffect, useRef } from 'react';

function TabsComponent() {
  const tabsRef = useRef(null);

  useEffect(() => {
    const tabs = tabsRef.current;
    if (tabs) {
      tabs.setActiveTab('tab1');
    }
  }, []);

  return (
    <ui-tabs ref={tabsRef} value="tab1">
      <ui-tabs-list>
        <ui-tabs-trigger value="tab1">Tab 1</ui-tabs-trigger>
        <ui-tabs-trigger value="tab2">Tab 2</ui-tabs-trigger>
      </ui-tabs-list>
      <ui-tabs-panel value="tab1">Content 1</ui-tabs-panel>
      <ui-tabs-panel value="tab2">Content 2</ui-tabs-panel>
    </ui-tabs>
  );
}
```

### Vue

```vue
<template>
  <ui-tabs ref="tabs" :value="activeTab" @tabs-trigger-click="handleTabClick">
    <ui-tabs-list>
      <ui-tabs-trigger value="tab1">Tab 1</ui-tabs-trigger>
      <ui-tabs-trigger value="tab2">Tab 2</ui-tabs-trigger>
    </ui-tabs-list>
    <ui-tabs-panel value="tab1">Content 1</ui-tabs-panel>
    <ui-tabs-panel value="tab2">Content 2</ui-tabs-panel>
  </ui-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'tab1'
    };
  },
  methods: {
    handleTabClick(event) {
      this.activeTab = event.detail.trigger.getAttribute('value');
    }
  }
};
</script>
```
