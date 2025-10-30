# Badge

Маленький индикатор статуса или количества. Badge используются рядом с уведомлениями, аватарами или иконками, чтобы показать статус, значение или атрибут.

## Установка

```bash
npx capsule add Badge
```

## Использование

### Базовая Badge

<div style="margin: 1rem 0;">
<capsule-badge>Badge</capsule-badge>
</div>

```html
<capsule-badge>Badge</capsule-badge>
```

### Варианты

<div style="margin: 1rem 0; display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
<capsule-badge>1</capsule-badge>
<capsule-badge variant="outline">12</capsule-badge>
<capsule-badge variant="ghost">Новый</capsule-badge>
<capsule-badge variant="dot">dot</capsule-badge>
</div>

```html
<capsule-badge>1</capsule-badge>
<capsule-badge variant="outline">12</capsule-badge>
<capsule-badge variant="ghost">Новый</capsule-badge>
<capsule-badge variant="dot">dot</capsule-badge>
```

### value и max

Вы можете использовать атрибуты `value` и `max` у capsule-badge для отображения чисел. Всегда указывайте значение внутри badge. Если value больше max — выводится max+ :

<div style="margin: 1rem 0; display: flex; gap: 0.5rem; align-items: center;">
  <capsule-badge value="8">8</capsule-badge>
  <capsule-badge value="120" max="99">99+</capsule-badge>
</div>

```html
<!-- Просто value -->
<capsule-badge value="8">8</capsule-badge>
<!-- Если value > max, будет max+ -->
<capsule-badge
  value="120"
  max="99"
  >99+</capsule-badge
>
<!-- 99+ -->
```

### Размеры

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

### Цвет (color)

<div style="margin: 1rem 0; display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
  <capsule-badge color="primary">primary</capsule-badge>
  <capsule-badge color="success">success</capsule-badge>
  <capsule-badge color="danger">danger</capsule-badge>
  <capsule-badge color="warning">warning</capsule-badge>
</div>

```html
<capsule-badge color="primary">primary</capsule-badge>
<capsule-badge color="success">success</capsule-badge>
<capsule-badge color="danger">danger</capsule-badge>
<capsule-badge color="warning">warning</capsule-badge>
```

## Атрибуты

| Атрибут   | Тип           | По умолчанию | Описание                                                              |
| --------- | ------------- | ------------ | --------------------------------------------------------------------- |
| `variant` | string        | -            | Вариант стиля badge                                                   |
| `size`    | string        | -            | Размер badge                                                          |
| `value`   | string/number | `0`          | Значение/число, показываемое в badge                                  |
| `max`     | string/number | -            | Ограничивает value, при переполнении будет max+                       |
| `type`    | string        | -            | Атрибут type для кнопок                                               |
| `color`   | string        | -            | Цвет badge (например: 'primary', 'success', 'danger', HEX, RGB и др.) |

### Значения variant

- `outline` — с контуром
- `ghost` — без фона
- `dot` — цветная точка, может содержать текст или число

## Доступность

- ✅ Работа с клавиатурой
- ✅ ARIA атрибуты
