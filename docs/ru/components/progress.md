# Progress

Компонент индикатора прогресса, который отображает прогресс выполнения задачи или операции. Идеально подходит для загрузки файлов, отправки форм или любых длительных процессов.

## Установка

```bash
npx @zizigy/capsule add Progress
```

## Использование

### Базовый Progress

<div style="margin: 1rem 0;">
  <capsule-progress value="50"></capsule-progress>
</div>

```html
<capsule-progress value="50"></capsule-progress>
```

### Разные размеры

<div style="margin: 1rem 0; display: flex; flex-direction: column; gap: 1rem;">
  <capsule-progress value="30" size="xs"></capsule-progress>
  <capsule-progress value="40" size="sm"></capsule-progress>
  <capsule-progress value="50" size="md"></capsule-progress>
  <capsule-progress value="60" size="lg"></capsule-progress>
  <capsule-progress value="70" size="xl"></capsule-progress>
</div>

```html
<capsule-progress
  value="30"
  size="xs"
></capsule-progress>
<capsule-progress
  value="40"
  size="sm"
></capsule-progress>
<capsule-progress
  value="50"
  size="md"
></capsule-progress>
<capsule-progress
  value="60"
  size="lg"
></capsule-progress>
<capsule-progress
  value="70"
  size="xl"
></capsule-progress>
```

### Разные цвета

<div style="margin: 1rem 0; display: flex; flex-direction: column; gap: 1rem;">
  <capsule-progress value="50" color="primary"></capsule-progress>
  <capsule-progress value="50" color="success"></capsule-progress>
  <capsule-progress value="50" color="error"></capsule-progress>
  <capsule-progress value="50" color="warning"></capsule-progress>
  <capsule-progress value="50" color="info"></capsule-progress>
  <capsule-progress value="50" color="accent"></capsule-progress>
</div>

```html
<capsule-progress
  value="50"
  color="primary"
></capsule-progress>
<capsule-progress
  value="50"
  color="success"
></capsule-progress>
<capsule-progress
  value="50"
  color="error"
></capsule-progress>
<capsule-progress
  value="50"
  color="warning"
></capsule-progress>
<capsule-progress
  value="50"
  color="info"
></capsule-progress>
<capsule-progress
  value="50"
  color="accent"
></capsule-progress>
```

### Пользовательское максимальное значение

По умолчанию индикатор прогресса использует максимальное значение 100. Вы можете настроить это:

<div style="margin: 1rem 0;">
  <capsule-progress value="3" max="10"></capsule-progress>
  <div style="font-size: 0.875rem; color: var(--capsule-color-text-secondary); margin-top: 0.5rem;">3 из 10</div>
</div>

```html
<capsule-progress
  value="3"
  max="10"
></capsule-progress>
```

### Анимированный прогресс

Индикатор прогресса плавно анимируется при изменении значения:

<div style="margin: 1rem 0;">
  <capsule-progress id="progress-bar" value="0"></capsule-progress>
  <div style="margin-top: 0.5rem; display: flex; gap: 0.5rem;">
      <button onclick="document.getElementById('progress-bar').setAttribute('value', '0')" style="padding: 0.5rem 1rem; background: var(--capsule-color-primary); color: white; border: none; border-radius: var(--capsule-radius); cursor: pointer;">0%</button>
    <button onclick="document.getElementById('progress-bar').setAttribute('value', '25')" style="padding: 0.5rem 1rem; background: var(--capsule-color-primary); color: white; border: none; border-radius: var(--capsule-radius); cursor: pointer;">25%</button>
    <button onclick="document.getElementById('progress-bar').setAttribute('value', '50')" style="padding: 0.5rem 1rem; background: var(--capsule-color-primary); color: white; border: none; border-radius: var(--capsule-radius); cursor: pointer;">50%</button>
    <button onclick="document.getElementById('progress-bar').setAttribute('value', '75')" style="padding: 0.5rem 1rem; background: var(--capsule-color-primary); color: white; border: none; border-radius: var(--capsule-radius); cursor: pointer;">75%</button>
    <button onclick="document.getElementById('progress-bar').setAttribute('value', '100')" style="padding: 0.5rem 1rem; background: var(--capsule-color-primary); color: white; border: none; border-radius: var(--capsule-radius); cursor: pointer;">100%</button>
  </div>
</div>

```html
<capsule-progress
  id="progress"
  value="0"
></capsule-progress>

<script>
  document.getElementById('progress').setAttribute('value', '50');
</script>
```

## API

### Атрибуты

| Атрибут | Тип    | По умолчанию | Описание                                 |
| ------- | ------ | ------------ | ---------------------------------------- |
| `value` | number | `0`          | Текущее значение прогресса (от 0 до max) |
| `max`   | number | `100`        | Максимальное значение прогресса          |
| `size`  | string | `'md'`       | Размер индикатора прогресса              |
| `color` | string | `'primary'`  | Цветовая тема индикатора прогресса       |

### Значения размера

- `xs` - Очень маленький (высота 0.25rem)
- `sm` - Маленький (высота 0.5rem)
- `md` - Средний (высота 0.75rem)
- `lg` - Большой (высота 1rem)
- `xl` - Очень большой (высота 1.25rem)

### Значения цвета

- `primary` - Основной цвет темы
- `success` - Цвет успеха
- `error` - Цвет ошибки
- `warning` - Цвет предупреждения
- `info` - Информационный цвет
- `accent` - Акцентный цвет

## Доступность

Компонент автоматически устанавливает:

- `role="progressbar"` для программ чтения с экрана
- `aria-valuenow` с текущим значением
- `aria-valuemin` установлен в 0
- `aria-valuemax` установлен в максимальное значение
- `aria-label` с описательной меткой

## Стилизация

Вы можете настроить внешний вид, используя CSS parts:

```css
capsule-progress::part(bar) {
  background: linear-gradient(90deg, #2563eb, #8b5cf6);
}
```
