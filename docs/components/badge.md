# Badge

A small status descriptor for labeling or counting items. Badges appear next to notifications, avatars, or icons to indicate a status, value, or special attribute.

## Installation

```bash
npx capsule add Badge
```

## Usage

### Basic Badge

<div style="margin: 1rem 0;">
<capsule-badge>Badge</capsule-badge>
</div>

```html
<capsule-badge>Badge</capsule-badge>
```

### Variants

<div style="margin: 1rem 0; display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
<capsule-badge>1</capsule-badge>
<capsule-badge variant="outline">12</capsule-badge>
<capsule-badge variant="ghost">New</capsule-badge>
<capsule-badge variant="dot">!</capsule-badge>
</div>

```html
<capsule-badge>1</capsule-badge>
<capsule-badge variant="outline">12</capsule-badge>
<capsule-badge variant="ghost">New</capsule-badge>
<capsule-badge variant="dot">!</capsule-badge>
```

### Value and Max

You can use `value` and `max` attributes on capsule-badge to show numbers. If value exceeds max, badge shows `max+`:

<div style="margin: 1rem 0; display: flex; gap: 0.5rem; align-items: center;">
  <capsule-badge value="10">10</capsule-badge>
  <capsule-badge value="150" max="99">99+</capsule-badge>
</div>

```html
<!-- Just value -->
<capsule-badge value="10">10</capsule-badge>
<!-- If value > max, shows max+ -->
<capsule-badge value="150" max="99">99+</capsule-badge>
<!-- 99+ -->
```

### Sizes

<div style="margin: 1rem 0; display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
<capsule-badge size="sm">sm</capsule-badge>
<capsule-badge>md</capsule-badge>
<capsule-badge size="lg">lg</capsule-badge>
</div>

```html
<capsule-badge size="sm">sm</capsule-badge>
<capsule-badge>md</capsule-badge>
<capsule-badge size="lg">lg</capsule-badge>
```

## Attributes

| Attribute | Type    | Default | Description                                    |
|-----------|---------|---------|------------------------------------------------|
| `variant` | string  | -       | Badge style variant                            |
| `size`    | string  | -       | Badge size                                     |
| `value`   | string/number | `0`   | Value shown in the badge                      |
| `max`     | string/number | -     | If set, caps the value; shows max+ if exceeded |
| `type`    | string  | -       | Type attribute for buttons                     |

### Variant Values
- `outline` - Outlined badge
- `ghost` - Ghost badge
- `dot` - Small dot (can contain text or icon)

## Accessibility
- ✅ Keyboard interaction support
- ✅ ARIA attributes for screen readers

