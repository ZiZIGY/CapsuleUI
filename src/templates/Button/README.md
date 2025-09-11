# **PREFIX**-**COMPONENT** Component

Кастомный элемент кнопки с ripple эффектом.

## Использование

### HTML

```html
<link rel="stylesheet" href="__PREFIX__-__COMPONENT__.style.css">
<script src="__PREFIX__-__COMPONENT__.js"></script>

<__PREFIX__-__COMPONENT__ size="lg" variant="primary">
  Моя кнопка
</__PREFIX__-__COMPONENT__>
```

### TypeScript Support

Для получения автодополнения и проверки типов в VSCode/других редакторах:

#### 1. TypeScript проекты

Добавьте файл `__PREFIX__-__COMPONENT__.d.ts` в ваш проект и включите его в `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["./path/to/__PREFIX__-__COMPONENT__.d.ts"]
  }
}
```

#### 2. React проекты

Используйте файл `__PREFIX__-__COMPONENT__.d.ts` - он содержит JSX определения.

#### 3. Обычные HTML проекты

Используйте файл `__PREFIX__-__COMPONENT__.html.d.ts` для базовой поддержки типов.

## Атрибуты

| Атрибут    | Тип                                     | По умолчанию | Описание            |
| ---------- | --------------------------------------- | ------------ | ------------------- |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg'`          | `'md'`       | Размер кнопки       |
| `variant`  | `'primary' \| 'secondary' \| 'outline'` | `'primary'`  | Вариант кнопки      |
| `disabled` | `boolean`                               | `false`      | Отключена ли кнопка |
| `type`     | `'button' \| 'submit' \| 'reset'`       | `'button'`   | Тип кнопки          |

## События

| Событие        | Описание                              |
| -------------- | ------------------------------------- |
| `button-click` | Кастомное событие при клике на кнопку |
| `click`        | Стандартное событие клика             |
| `focus`        | Получение фокуса                      |
| `blur`         | Потеря фокуса                         |

## Примеры

### Базовое использование

```html
<__PREFIX__-__COMPONENT__>Кнопка</__PREFIX__-__COMPONENT__>
```

### С атрибутами

```html
<__PREFIX__-__COMPONENT__ size="lg" variant="outline" disabled>
  Большая отключенная кнопка
</__PREFIX__-__COMPONENT__>
```

### С обработчиком событий

```html
<__PREFIX__-__COMPONENT__
  size="md"
  variant="primary"
  onclick="handleClick(event)">
  Кнопка с обработчиком
</__PREFIX__-__COMPONENT__>
```

### Программное управление

```javascript
const button = document.querySelector('__PREFIX__-__COMPONENT__');

// Изменение атрибутов
button.size = 'lg';
button.variant = 'secondary';
button.disabled = true;

// Программный клик
button.click();

// Установка фокуса
button.focus();
```

## Стилизация

Компонент использует CSS-переменные для кастомизации:

```css
__PREFIX__-__COMPONENT__ {
  --ripple-color: rgba(255, 255, 255, 0.5);
}
```

Вы также можете добавить свои CSS классы через атрибут `class`:

```html
<__PREFIX__-__COMPONENT__ class="my-custom-class" size="md">
  Кастомная кнопка
</__PREFIX__-__COMPONENT__>
```
