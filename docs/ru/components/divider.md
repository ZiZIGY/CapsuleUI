# Divider

Компонент Divider создает визуальный разделитель между секциями контента.

## Установка

```bash
npx capsule add Divider
```

## Использование

### Горизонтальный (по умолчанию)

<div style="margin: 1rem 0;">
  <capsule-divider></capsule-divider>
</div>

```html
<capsule-divider></capsule-divider>
```

### Вертикальный

<div style="display: flex; align-items: center; gap: 1rem; margin: 1rem 0;">
  <span>Слева</span>
  <capsule-divider orientation="vertical" style="height: 40px;"></capsule-divider>
  <span>Справа</span>
</div>

```html
<capsule-divider orientation="vertical"></capsule-divider>
```

### Толщина

<div style="margin: 1rem 0;">
  <capsule-divider thickness="thin"></capsule-divider>
  <capsule-divider></capsule-divider>
  <capsule-divider thickness="thick"></capsule-divider>
</div>

```html
<capsule-divider thickness="thin"></capsule-divider>
<capsule-divider thickness="thick"></capsule-divider>
```

### Цвета

<div style="margin: 1rem 0;">
  <capsule-divider color="primary"></capsule-divider>
  <capsule-divider color="error"></capsule-divider>
  <capsule-divider color="success"></capsule-divider>
  <capsule-divider color="warning"></capsule-divider>
  <capsule-divider color="info"></capsule-divider>
</div>

```html
<capsule-divider color="primary"></capsule-divider>
<capsule-divider color="error"></capsule-divider>
<capsule-divider color="success"></capsule-divider>
```

### Варианты

<div style="margin: 1rem 0;">
  <capsule-divider variant="ghost"></capsule-divider>
</div>

```html
<capsule-divider variant="ghost"></capsule-divider>
```

## Атрибуты

| Атрибут       | Тип    | По умолчанию | Описание                                       |
| ------------- | ------ | ------------ | ---------------------------------------------- |
| `orientation` | string | horizontal   | Направление (horizontal или vertical)          |
| `thickness`   | string | -            | Толщина линии (thin или thick)                 |
| `color`       | string | -            | Вариант цвета (primary, error, warning и т.д.) |
| `variant`     | string | -            | Визуальный стиль (ghost)                       |

### Значения orientation

- `horizontal` — Горизонтальный разделитель (по умолчанию)
- `vertical` — Вертикальный разделитель

### Значения thickness

- `thin` — Тонкий (0.5px)
- `thick` — Толстый (2px)

### Значения color

- `primary` — Основной цвет бренда
- `error` — Цвет ошибки
- `warning` — Цвет предупреждения
- `success` — Цвет успеха
- `info` — Информационный цвет

### Значения variant

- `ghost` — Полупрозрачный ghost разделитель

## Доступность

- ✅ ARIA role="separator" устанавливается автоматически
- ✅ aria-orientation соответствует атрибуту orientation
- ✅ Семантический разделитель для screen readers
