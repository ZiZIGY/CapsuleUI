# Skeleton

Компонент Skeleton отображает плейсхолдер вместо контента на время загрузки данных. Позволяет сохранить структуру интерфейса и избежать смещений верстки.

## Установка

```bash
npx @zizigy/capsule add Skeleton
```

## Использование

### Прямоугольный skeleton (по умолчанию)

<div style="margin: 1rem 0; max-width: 300px;">
  <capsule-skeleton></capsule-skeleton>
</div>

```html
<capsule-skeleton></capsule-skeleton>
```

### Вариант: text

<div style="margin: 1rem 0; max-width: 300px;">
  <capsule-skeleton variant="text"></capsule-skeleton>
</div>

```html
<capsule-skeleton variant="text"></capsule-skeleton>
```

### Вариант: circular

<div style="margin: 1rem 0; max-width: 3rem;">
  <capsule-skeleton variant="circular"></capsule-skeleton>
</div>

```html
<capsule-skeleton variant="circular"></capsule-skeleton>
```

### Индивидуальные размеры

Размеры компонента задаются стандартными CSS-свойствами.

```html
<capsule-skeleton style="width: 200px; height: 1.5rem;"></capsule-skeleton>
```

## Атрибуты

| Атрибут   | Тип    | По умолчанию | Описание                                       |
| --------- | ------ | ------------ | ---------------------------------------------- |
| `variant` | string | rectangular  | Вариант скелетона: rectangular, text, circular |

### Возможные значения variant

- `rectangular` — прямоугольный скелетон (по умолчанию)
- `text` — строка текста
- `circular` — круглый плейсхолдер

## Доступность

- ✅ Автоматически устанавливается role="presentation" и aria-hidden="true"
- ✅ Не получает фокус
- ✅ Не объявляет контент ассистивным технологиям
