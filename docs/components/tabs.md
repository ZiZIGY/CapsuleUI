# Tabs

A tabs component for organizing content into multiple sections that can be switched between. Perfect for settings panels, documentation sections, or any grouped content.

## Installation

```bash
npx capsule add Tabs
```

## Usage

### Basic Tabs

<div style="margin: 1rem 0; max-width: 600px;">
  <capsule-tabs>
    <capsule-tabs-list>
      <capsule-tabs-trigger value="account">Account</capsule-tabs-trigger>
      <capsule-tabs-trigger value="password">Password</capsule-tabs-trigger>
      <capsule-tabs-trigger value="settings">Settings</capsule-tabs-trigger>
    </capsule-tabs-list>
    <capsule-tabs-panels>
      <capsule-tabs-panel value="account">
        <p>Manage your account settings and preferences.</p>
      </capsule-tabs-panel>
      <capsule-tabs-panel value="password">
        <p>Change your password and security settings.</p>
      </capsule-tabs-panel>
      <capsule-tabs-panel value="settings">
        <p>Configure your application preferences.</p>
      </capsule-tabs-panel>
    </capsule-tabs-panels>
  </capsule-tabs>
</div>

```html
<capsule-tabs>
  <capsule-tabs-list>
    <capsule-tabs-trigger value="account">Account</capsule-tabs-trigger>
    <capsule-tabs-trigger value="password">Password</capsule-tabs-trigger>
    <capsule-tabs-trigger value="settings">Settings</capsule-tabs-trigger>
  </capsule-tabs-list>
  <capsule-tabs-panels>
    <capsule-tabs-panel value="account">
      Account content here
    </capsule-tabs-panel>
    <capsule-tabs-panel value="password">
      Password content here
    </capsule-tabs-panel>
    <capsule-tabs-panel value="settings">
      Settings content here
    </capsule-tabs-panel>
  </capsule-tabs-panels>
</capsule-tabs>
```

### Default Active Tab

You can set the default active tab using the `value` attribute on the main `capsule-tabs` component. If no `value` is specified, the first tab will be activated automatically.

<div style="margin: 1rem 0; max-width: 600px;">
  <capsule-tabs value="password">
    <capsule-tabs-list>
      <capsule-tabs-trigger value="account">Account</capsule-tabs-trigger>
      <capsule-tabs-trigger value="password">Password</capsule-tabs-trigger>
      <capsule-tabs-trigger value="settings">Settings</capsule-tabs-trigger>
    </capsule-tabs-list>
    <capsule-tabs-panels>
      <capsule-tabs-panel value="account">
        <p>Account content (not active by default)</p>
      </capsule-tabs-panel>
      <capsule-tabs-panel value="password">
        <p>Password content (active by default)</p>
      </capsule-tabs-panel>
      <capsule-tabs-panel value="settings">
        <p>Settings content (not active by default)</p>
      </capsule-tabs-panel>
    </capsule-tabs-panels>
  </capsule-tabs>
</div>

```html
<capsule-tabs value="password">
  <capsule-tabs-list>
    <capsule-tabs-trigger value="account">Account</capsule-tabs-trigger>
    <capsule-tabs-trigger value="password">Password</capsule-tabs-trigger>
  </capsule-tabs-list>
  <capsule-tabs-panels>
    <capsule-tabs-panel value="account">...</capsule-tabs-panel>
    <capsule-tabs-panel value="password">...</capsule-tabs-panel>
  </capsule-tabs-panels>
</capsule-tabs>
```

### Animations

The tabs component supports different animation types for panel transitions.

#### Horizontal Slide (x)

<div style="margin: 1rem 0; max-width: 600px;">
  <capsule-tabs>
    <capsule-tabs-list>
      <capsule-tabs-trigger value="tab1">Tab 1</capsule-tabs-trigger>
      <capsule-tabs-trigger value="tab2">Tab 2</capsule-tabs-trigger>
      <capsule-tabs-trigger value="tab3">Tab 3</capsule-tabs-trigger>
    </capsule-tabs-list>
    <capsule-tabs-panels animation="x">
      <capsule-tabs-panel value="tab1">
        <p>Content slides horizontally between tabs.</p>
      </capsule-tabs-panel>
      <capsule-tabs-panel value="tab2">
        <p>This is the second tab with horizontal slide animation.</p>
      </capsule-tabs-panel>
      <capsule-tabs-panel value="tab3">
        <p>Third tab content with smooth transitions.</p>
      </capsule-tabs-panel>
    </capsule-tabs-panels>
  </capsule-tabs>
</div>

```html
<capsule-tabs-panels animation="x">
  <capsule-tabs-panel value="tab1">...</capsule-tabs-panel>
  <capsule-tabs-panel value="tab2">...</capsule-tabs-panel>
</capsule-tabs-panels>
```

#### Vertical Slide (y)

<div style="margin: 1rem 0; max-width: 600px;">
  <capsule-tabs>
    <capsule-tabs-list>
      <capsule-tabs-trigger value="tab1">Tab 1</capsule-tabs-trigger>
      <capsule-tabs-trigger value="tab2">Tab 2</capsule-tabs-trigger>
    </capsule-tabs-list>
    <capsule-tabs-panels animation="y">
      <capsule-tabs-panel value="tab1">
        <p>Content slides vertically between tabs.</p>
      </capsule-tabs-panel>
      <capsule-tabs-panel value="tab2">
        <p>This is the second tab with vertical slide animation.</p>
      </capsule-tabs-panel>
    </capsule-tabs-panels>
  </capsule-tabs>
</div>

```html
<capsule-tabs-panels animation="y">
  <capsule-tabs-panel value="tab1">...</capsule-tabs-panel>
  <capsule-tabs-panel value="tab2">...</capsule-tabs-panel>
</capsule-tabs-panels>
```

#### Fade

<div style="margin: 1rem 0; max-width: 600px;">
  <capsule-tabs>
    <capsule-tabs-list>
      <capsule-tabs-trigger value="tab1">Tab 1</capsule-tabs-trigger>
      <capsule-tabs-trigger value="tab2">Tab 2</capsule-tabs-trigger>
    </capsule-tabs-list>
    <capsule-tabs-panels animation="fade">
      <capsule-tabs-panel value="tab1">
        <p>Content fades in and out between tabs.</p>
      </capsule-tabs-panel>
      <capsule-tabs-panel value="tab2">
        <p>This is the second tab with fade animation.</p>
      </capsule-tabs-panel>
    </capsule-tabs-panels>
  </capsule-tabs>
</div>

```html
<capsule-tabs-panels animation="fade">
  <capsule-tabs-panel value="tab1">...</capsule-tabs-panel>
  <capsule-tabs-panel value="tab2">...</capsule-tabs-panel>
</capsule-tabs-panels>
```

## Components

The Tabs component consists of several sub-components:

### `capsule-tabs`

The main container for tabs. Manages the active tab state.

### `capsule-tabs-list`

Container for tab triggers. Should wrap all `capsule-tabs-trigger` elements.

```html
<capsule-tabs-list>
  <capsule-tabs-trigger value="tab1">Tab 1</capsule-tabs-trigger>
  <capsule-tabs-trigger value="tab2">Tab 2</capsule-tabs-trigger>
</capsule-tabs-list>
```

### `capsule-tabs-trigger`

A clickable tab button. The `value` attribute must match the corresponding panel's `value`.

| Attribute | Type   | Default | Description                     |
| --------- | ------ | ------- | ------------------------------- |
| `value`   | string | —       | Unique identifier for this tab  |
| `active`  | boolean| false   | Indicates if this tab is active |

```html
<capsule-tabs-trigger value="account">Account</capsule-tabs-trigger>
```

### `capsule-tabs-panels`

Container for tab panels. Should wrap all `capsule-tabs-panel` elements.

| Attribute   | Type   | Default | Description                          |
| ----------- | ------ | ------- | ------------------------------------ |
| `animation` | string | —       | Animation type (x, y, or fade)       |

```html
<capsule-tabs-panels animation="x">
  <capsule-tabs-panel value="tab1">...</capsule-tabs-panel>
</capsule-tabs-panels>
```

### `capsule-tabs-panel`

An individual tab panel. The `value` attribute must match the corresponding trigger's `value`.

| Attribute | Type   | Default | Description                      |
| --------- | ------ | ------- | -------------------------------- |
| `value`   | string | —       | Unique identifier for this panel |
| `active`  | boolean| false   | Indicates if this panel is active|

```html
<capsule-tabs-panel value="account">
  Panel content here
</capsule-tabs-panel>
```

## Attributes

### `capsule-tabs`

| Attribute | Type   | Default | Description                         |
| --------- | ------ | ------- | ----------------------------------- |
| `value`   | string | —       | The value of the currently active tab |

## API Reference

### Methods

#### `setActiveTab(value)`

Sets the active tab programmatically.

```javascript
const tabs = document.querySelector('capsule-tabs');
tabs.setActiveTab('password'); // Switch to the password tab
```

#### `getActiveTab()`

Returns the value of the currently active tab.

```javascript
const tabs = document.querySelector('capsule-tabs');
const activeTab = tabs.getActiveTab(); // Returns 'account', 'password', etc.
```

#### `getTabsCount()`

Returns the total number of tabs.

```javascript
const tabs = document.querySelector('capsule-tabs');
const count = tabs.getTabsCount(); // Returns 3, 4, etc.
```

#### `getTabsValues()`

Returns an array of all tab values.

```javascript
const tabs = document.querySelector('capsule-tabs');
const values = tabs.getTabsValues(); // Returns ['account', 'password', 'settings']
```

### Properties

#### `value`

Gets or sets the active tab value.

```javascript
const tabs = document.querySelector('capsule-tabs');

// Get active tab
console.log(tabs.value); // 'account'

// Set active tab
tabs.value = 'password'; // Switch to password tab
```

### Events

The tabs component uses a custom event system internally. You can listen for tab changes by observing the `value` attribute:

```javascript
const tabs = document.querySelector('capsule-tabs');

// Watch for value changes using MutationObserver
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
      console.log('Active tab changed to:', tabs.value);
    }
  });
});

observer.observe(tabs, {
  attributes: true,
  attributeFilter: ['value']
});
```

## Accessibility

- ✅ ARIA roles (role="tablist", role="tab", role="tabpanel")
- ✅ Keyboard navigation support (Arrow keys, Home, End)
- ✅ Proper focus management
- ✅ `aria-selected` and `aria-hidden` attributes
- ✅ `aria-controls` and `aria-labelledby` for proper relationships
- ✅ Semantic structure for screen readers

## Example: Programmatic Control

<div style="margin: 1rem 0; max-width: 600px;">
  <capsule-tabs id="programmatic-tabs">
    <capsule-tabs-list>
      <capsule-tabs-trigger value="tab1">Tab 1</capsule-tabs-trigger>
      <capsule-tabs-trigger value="tab2">Tab 2</capsule-tabs-trigger>
      <capsule-tabs-trigger value="tab3">Tab 3</capsule-tabs-trigger>
    </capsule-tabs-list>
    <capsule-tabs-panels>
      <capsule-tabs-panel value="tab1">
        <p>First tab content. Use buttons below to switch tabs programmatically.</p>
      </capsule-tabs-panel>
      <capsule-tabs-panel value="tab2">
        <p>Second tab content.</p>
      </capsule-tabs-panel>
      <capsule-tabs-panel value="tab3">
        <p>Third tab content.</p>
      </capsule-tabs-panel>
    </capsule-tabs-panels>
  </capsule-tabs>
  <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
    <button onclick="document.querySelector('#programmatic-tabs').setActiveTab('tab1')">Go to Tab 1</button>
    <button onclick="document.querySelector('#programmatic-tabs').setActiveTab('tab2')">Go to Tab 2</button>
    <button onclick="document.querySelector('#programmatic-tabs').setActiveTab('tab3')">Go to Tab 3</button>
  </div>
</div>

```html
<capsule-tabs id="my-tabs">
  <capsule-tabs-list>
    <capsule-tabs-trigger value="tab1">Tab 1</capsule-tabs-trigger>
    <capsule-tabs-trigger value="tab2">Tab 2</capsule-tabs-trigger>
  </capsule-tabs-list>
  <capsule-tabs-panels>
    <capsule-tabs-panel value="tab1">...</capsule-tabs-panel>
    <capsule-tabs-panel value="tab2">...</capsule-tabs-panel>
  </capsule-tabs-panels>
</capsule-tabs>

<script>
  const tabs = document.querySelector('#my-tabs');
  tabs.setActiveTab('tab2'); // Switch to second tab
</script>
```
