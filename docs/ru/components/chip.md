# Chip

Компактный элемент, который обозначает атрибут, категорию или действие. Используется для маркировки, фильтрации или организации элементов.

## Установка

```bash
npx capsule add Chip
```

## Использование

### Базовая Chip

<div style="margin: 1rem 0;"><capsule-chip>Базовая Chip</capsule-chip></div>

```html
<capsule-chip>Базовая Chip</capsule-chip>
```

### Варианты

<div style="margin: 1rem 0; display: flex; gap: 0.5rem; flex-wrap: wrap;">
<capsule-chip variant="outline">Outline</capsule-chip>
<capsule-chip variant="ghost">Ghost</capsule-chip>
</div>

```html
<capsule-chip variant="outline">Outline</capsule-chip>
<capsule-chip variant="ghost">Ghost</capsule-chip>
```

### Размеры

<div style="margin: 1rem 0; display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
<capsule-chip size="sm">Маленькая</capsule-chip>
<capsule-chip>По умолчанию</capsule-chip>
<capsule-chip size="lg">Большая</capsule-chip>
</div>

```html
<capsule-chip size="sm">Маленькая</capsule-chip>
<capsule-chip>По умолчанию</capsule-chip>
<capsule-chip size="lg">Большая</capsule-chip>
```

## Атрибуты

| Атрибут  | Тип     | По умолчанию | Описание                |
| -------- | ------- | ------------ | ----------------------- |
| `variant`| string  | -            | Вариант стиля Chip      |
| `size`   | string  | -            | Размер Chip             |
| `type`   | string  | -            | Атрибут type           |

### Значения variant
- `outline` — цветной контур
- `ghost` — без фона

### Значения size
- `sm` — маленькая
- `lg` — большая

## Доступность
- ✅ Поддержка работы с клавиатурой
- ✅ ARIA атрибуты для screen readers

