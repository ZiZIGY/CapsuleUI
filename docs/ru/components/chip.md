# Chip

Компактный элемент, который обозначает атрибут, категорию или действие. Используется для маркировки, фильтрации или организации элементов.

## Установка

```bash
npx @zizigy/capsule add Chip
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

### Цвет (color)

<div style="margin: 1rem 0; display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
  <capsule-chip color="primary">primary</capsule-chip>
  <capsule-chip color="success">success</capsule-chip>
  <capsule-chip color="danger">danger</capsule-chip>
  <capsule-chip color="warning">warning</capsule-chip>
</div>

```html
<capsule-chip color="primary">primary</capsule-chip>
<capsule-chip color="success">success</capsule-chip>
<capsule-chip color="danger">danger</capsule-chip>
<capsule-chip color="warning">warning</capsule-chip>
```

## Атрибуты

| Атрибут   | Тип    | По умолчанию | Описание                                                             |
| --------- | ------ | ------------ | -------------------------------------------------------------------- |
| `variant` | string | -            | Вариант стиля Chip                                                   |
| `size`    | string | -            | Размер Chip                                                          |
| `type`    | string | -            | Атрибут type                                                         |
| `color`   | string | -            | Цвет Chip (например: 'primary', 'success', 'danger', HEX, RGB и др.) |

### Значения variant

- `outline` — цветной контур
- `ghost` — без фона

### Значения size

- `sm` — маленькая
- `lg` — большая

## Доступность

- ✅ Поддержка работы с клавиатурой
- ✅ ARIA атрибуты для screen readers
