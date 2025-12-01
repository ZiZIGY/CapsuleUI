# AspectRatio

A simple component for maintaining aspect ratios. Perfect for images, videos, or any content that needs to preserve its proportions.

## Installation

```bash
npx capsule add AspectRatio
```

## Usage

### Basic Aspect Ratio

<div style="margin: 1rem 0; max-width: 600px;">
  <capsule-aspect-ratio ratio="16/9">
    <img src="https://picsum.photos/800/450" alt="Image" style="border-radius: 6px;" />
  </capsule-aspect-ratio>
</div>

```html
<capsule-aspect-ratio ratio="16/9">
  <img src="https://picsum.photos/800/450" alt="Image" />
</capsule-aspect-ratio>
```

### Common Ratios

<div style="margin: 1rem 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
  <div>
    <h4>16:9 (Widescreen)</h4>
    <capsule-aspect-ratio ratio="16/9">
      <img src="https://picsum.photos/400/225" alt="16:9" style="border-radius: 6px;" />
    </capsule-aspect-ratio>
  </div>
  <div>
    <h4>4:3 (Classic)</h4>
    <capsule-aspect-ratio ratio="4/3">
      <img src="https://picsum.photos/400/300" alt="4:3" style="border-radius: 6px;" />
    </capsule-aspect-ratio>
  </div>
  <div>
    <h4>1:1 (Square)</h4>
    <capsule-aspect-ratio ratio="1/1">
      <img src="https://picsum.photos/400/400" alt="1:1" style="border-radius: 6px;" />
    </capsule-aspect-ratio>
  </div>
  <div>
    <h4>21:9 (Ultrawide)</h4>
    <capsule-aspect-ratio ratio="21/9">
      <img src="https://picsum.photos/700/300" alt="21:9" style="border-radius: 6px;" />
    </capsule-aspect-ratio>
  </div>
</div>

```html
<!-- 16:9 -->
<capsule-aspect-ratio ratio="16/9">
  <img src="https://picsum.photos/800/450" alt="Image" />
</capsule-aspect-ratio>

<!-- 4:3 -->
<capsule-aspect-ratio ratio="4/3">
  <img src="https://picsum.photos/800/600" alt="Image" />
</capsule-aspect-ratio>

<!-- 1:1 (Square) -->
<capsule-aspect-ratio ratio="1/1">
  <img src="https://picsum.photos/600/600" alt="Image" />
</capsule-aspect-ratio>
```

### Using Colon Format

You can also use colon format instead of slash:

```html
<capsule-aspect-ratio ratio="16:9">
  <img src="https://picsum.photos/800/450" alt="Image" />
</capsule-aspect-ratio>
```

### With Video

<div style="margin: 1rem 0; max-width: 600px;">
  <capsule-aspect-ratio ratio="16/9">
    <video controls style="border-radius: 6px;">
      <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
    </video>
  </capsule-aspect-ratio>
</div>

```html
<capsule-aspect-ratio ratio="16/9">
  <video controls>
    <source src="video.mp4" type="video/mp4" />
  </video>
</capsule-aspect-ratio>
```

### With Custom Content

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-aspect-ratio ratio="3/2">
    <div style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--capsule-color-primary), var(--capsule-color-accent)); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">Custom Content</div>
  </capsule-aspect-ratio>
</div>

```html
<capsule-aspect-ratio ratio="3/2">
  <div style="background: linear-gradient(...);">
    Custom content
  </div>
</capsule-aspect-ratio>
```

### Portrait Images

<div style="margin: 1rem 0; max-width: 300px;">
  <capsule-aspect-ratio ratio="3/4">
    <img src="https://picsum.photos/300/400" alt="Portrait" style="border-radius: 6px;" />
  </capsule-aspect-ratio>
</div>

```html
<capsule-aspect-ratio ratio="3/4">
  <img src="https://picsum.photos/300/400" alt="Portrait" />
</capsule-aspect-ratio>
```

## API

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ratio` | `string` | `''` | Aspect ratio value (e.g., `'16/9'`, `'16:9'`, `'4/3'`, `'1'`) |

### Format

The `ratio` attribute accepts values in these formats:
- `"16/9"` - Slash format (recommended)
- `"16:9"` - Colon format (also supported)
- `"1"` - Single number (treated as `1/1`)

## Notes

- Child elements automatically fill the container
- Use `object-fit` CSS property on images/videos for proper sizing (default is `cover`)
- The component uses CSS `aspect-ratio` property under the hood