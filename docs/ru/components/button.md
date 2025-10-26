# Button

Компонент кнопки с множеством вариантов и размеров. Построен на стандарте Web Components и полностью доступен.

## Установка

```bash
npx capsule add Button
```

## Использование

### Базовая кнопка

<div>
<capsule-button>Нажми меня</capsule-button>
</div>

```html
<capsule-button>Нажми меня</capsule-button>
```

### Варианты

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; margin: 1rem 0;">
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

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; margin: 1rem 0;">
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

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; margin: 1rem 0;">
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

### Состояния

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; margin: 1rem 0;">
<capsule-button>Обычная</capsule-button>
<capsule-button disabled>Отключенная</capsule-button>
</div>

```html
<capsule-button>Обычная</capsule-button>
<capsule-button disabled>Отключенная</capsule-button>
```

## Атрибуты

| Атрибут  | Тип     | По умолчанию | Описание                                    |
| --------- | ------- | ------------ | ------------------------------------------- |
| `variant` | string  | `primary`    | Вариант стиля кнопки                        |
| `size`    | string  | `md`         | Размер кнопки                               |
| `disabled`| boolean | `false`      | Отключает кнопку                            |
| `type`    | string  | `button`     | Тип кнопки (button/submit/reset)            |

### Значения variant

- `primary` - Кнопка основного действия (по умолчанию)
- `secondary` - Кнопка вторичного действия
- `outline` - Контурная кнопка
- `text` - Текстовая кнопка
- `success` - Успех/позитивное действие
- `error` - Ошибка/негативное действие
- `warning` - Предупреждающее действие
- `info` - Информационное действие

### Значения size

- `xs` - Очень маленький
- `sm` - Маленький
- `md` - Средний (по умолчанию)
- `lg` - Большой

## События

```javascript
const button = document.querySelector('capsule-button');
button.addEventListener('click', () => {
  console.log('Кнопка нажата!');
});
```

## Интеграция с формами

```html
<form id="myForm">
  <capsule-button type="submit">Отправить форму</capsule-button>
  <capsule-button type="reset">Сбросить форму</capsule-button>
</form>
```

## Доступность

- ✅ Навигация с клавиатуры (клавиша Enter для активации)
- ✅ ARIA атрибуты для screen readers
- ✅ Управление фокусом
- ✅ Обработка отключенного состояния
- ✅ Поддержка ассоциации с формами

## Настройка

```css
:root {
  --capsule-color-primary: #0066cc;
  --capsule-radius-md: 8px;
  --capsule-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
```
