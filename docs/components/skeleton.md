# Skeleton

A skeleton component that provides a loading placeholder for content. CapsuleSkeleton helps simulate layout while data is being fetched.

## Installation

```bash
npx @zizigy/capsule add Skeleton
```

## Usage

### Basic Rectangular Skeleton

<div style="margin: 1rem 0; max-width: 300px;">
  <capsule-skeleton></capsule-skeleton>
</div>

```html
<capsule-skeleton></capsule-skeleton>
```

### Variant: Text

<div style="margin: 1rem 0; max-width: 300px;">
  <capsule-skeleton variant="text"></capsule-skeleton>
</div>

```html
<capsule-skeleton variant="text"></capsule-skeleton>
```

### Variant: Circular

<div style="margin: 1rem 0; max-width: 3rem;">
  <capsule-skeleton variant="circular"></capsule-skeleton>
</div>

```html
<capsule-skeleton variant="circular"></capsule-skeleton>
```

### Custom Size

You can adjust width/height using standard CSS properties.

```html
<capsule-skeleton style="width: 200px; height: 1.5rem;"></capsule-skeleton>
```

## Attributes

| Attribute | Type   | Default     | Description                                 |
| --------- | ------ | ----------- | ------------------------------------------- |
| `variant` | string | rectangular | Visual variant: rectangular, text, circular |

### Variant Values

- `rectangular` — rectangular loading skeleton (default)
- `text` — text line skeleton
- `circular` — circular skeleton

## Accessibility

- ✅ `role="presentation"` and `aria-hidden="true"` are set automatically
- ✅ Not focusable
- ✅ Does not announce content
