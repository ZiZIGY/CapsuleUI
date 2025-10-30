# Button

Интерактивный компонент кнопки с различными вариантами стилей, размеров и состояний. Построен на стандарте Web Components с полной поддержкой доступности.

## Быстрый старт

```bash
npx capsule add Button
```

```html
<capsule-button>Нажми меня</capsule-button>
```

## Демонстрация

### Основные варианты

<div class="component-demo">
  <capsule-button variant="primary">Primary</capsule-button>
  <capsule-button variant="secondary">Secondary</capsule-button>
  <capsule-button variant="outline">Outline</capsule-button>
  <capsule-button variant="text">Text</capsule-button>
</div>

```html
<capsule-button variant="primary">Primary</capsule-button>
<capsule-button variant="secondary">Secondary</capsule-button>
<capsule-button variant="outline">Outline</capsule-button>
<capsule-button variant="text">Text</capsule-button>
```

#### Семантические цвета

<div class="component-demo">
  <capsule-button variant="success">Success</capsule-button>
  <capsule-button variant="error">Error</capsule-button>
  <capsule-button variant="warning">Warning</capsule-button>
  <capsule-button variant="info">Info</capsule-button>
</div>

```html
<capsule-button variant="success">Success</capsule-button>
<capsule-button variant="error">Error</capsule-button>
<capsule-button variant="warning">Warning</capsule-button>
<capsule-button variant="info">Info</capsule-button>
```

### Размеры

<div class="component-demo">
  <capsule-button size="xs">Extra Small</capsule-button>
  <capsule-button size="sm">Small</capsule-button>
  <capsule-button size="md">Medium</capsule-button>
  <capsule-button size="lg">Large</capsule-button>
</div>

```html
<capsule-button size="xs">Extra Small</capsule-button>
<capsule-button size="sm">Small</capsule-button>
<capsule-button size="md">Medium</capsule-button>
<capsule-button size="lg">Large</capsule-button>
```

### Скругления

<div class="component-demo">
  <capsule-button rounded="none">None</capsule-button>
  <capsule-button rounded="sm">Small</capsule-button>
  <capsule-button rounded="md">Medium</capsule-button>
  <capsule-button rounded="lg">Large</capsule-button>
  <capsule-button rounded="xl">XL</capsule-button>
  <capsule-button rounded="full">Full</capsule-button>
</div>

```html
<capsule-button rounded="none">None</capsule-button>
<capsule-button rounded="sm">Small</capsule-button>
<capsule-button rounded="md">Medium</capsule-button>
<capsule-button rounded="lg">Large</capsule-button>
<capsule-button rounded="xl">XL</capsule-button>
<capsule-button rounded="full">Full</capsule-button>
```

### Состояния

<div class="component-demo">
  <capsule-button>Normal</capsule-button>
  <capsule-button disabled>Disabled</capsule-button>
</div>

```html
<capsule-button>Normal</capsule-button>
<capsule-button disabled>Disabled</capsule-button>
```

## Справочник API

### Атрибуты

| Атрибут  | Тип     | По умолчанию | Описание                      |
|----------|---------|--------------|-------------------------------|
| `variant`| string  | `primary`    | Стиль кнопки                  |
| `size`   | string  | `md`         | Размер кнопки                 |
| `disabled`| boolean| `false`      | Отключенное состояние         |
| `type`   | string  | `button`     | Тип кнопки (button/submit/reset) |
| `rounded`| string  | `md`         | Степень скругления углов      |

### Доступные значения

- **variant**:
  - `primary` — Основное действие
  - `secondary` — Второстепенное действие
  - `outline` — Контурная кнопка
  - `text` — Текстовая кнопка
  - `success` — Успешное действие
  - `error` — Ошибочное действие
  - `warning` — Предупреждение
  - `info` — Информационное действие

- **size**:
  - `xs` — Очень маленький
  - `sm` — Маленький
  - `md` — Средний
  - `lg` — Большой

- **rounded**:
  - `none` — Без скруглений
  - `sm` — Маленькое (4px)
  - `md` — Среднее (8px)
  - `lg` — Большое (12px)
  - `xl` — Очень большое (16px)
  - `full` — Полное (9999px)

## События

```javascript
const button = document.querySelector('capsule-button');
button.addEventListener('click', (event) => {
  console.log('Кнопка нажата!', event);
});
```

## Интеграция с формами

```html
<form id="myForm">
  <input type="text" name="username" required>
  <capsule-button type="submit">Отправить</capsule-button>
  <capsule-button type="reset">Сбросить</capsule-button>
</form>
```

## Доступность

- ✅ Навигация с клавиатуры (Enter/Space)
- ✅ ARIA атрибуты для скринридеров
- ✅ Управление фокусом
- ✅ Корректная обработка disabled состояния
- ✅ Поддержка ассоциации с формами

<style>
.component-demo {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
  margin: 1rem 0;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}
</style>