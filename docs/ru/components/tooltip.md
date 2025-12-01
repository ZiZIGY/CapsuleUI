# Tooltip

Компонент подсказки, который отображает полезную информацию при наведении на элемент или получении фокуса. Полностью на CSS с плавными анимациями и несколькими вариантами размещения.

## Установка

```bash
npx @zizigy/capsule add Tooltip
```

## Использование

### Базовый тултип

<div style="margin: 1rem 0; display: flex; justify-content: center; padding: 2rem;">
  <capsule-tooltip>
    <capsule-tooltip-trigger>
      <capsule-button>Наведите на меня</capsule-button>
    </capsule-tooltip-trigger>
    <capsule-tooltip-content>
      Это подсказка
    </capsule-tooltip-content>
  </capsule-tooltip>
</div>

```html
<capsule-tooltip>
  <capsule-tooltip-trigger>
    <capsule-button>Наведите на меня</capsule-button>
  </capsule-tooltip-trigger>
  <capsule-tooltip-content> Это подсказка </capsule-tooltip-content>
</capsule-tooltip>
```

### Размещение

Тултипы могут быть расположены в четырёх направлениях:

#### Сверху (по умолчанию)

<div style="margin: 1rem 0; display: flex; justify-content: center; padding: 2rem;">
  <capsule-tooltip placement="top">
    <capsule-tooltip-trigger>
      <capsule-button>Сверху</capsule-button>
    </capsule-tooltip-trigger>
    <capsule-tooltip-content>
      Подсказка сверху
    </capsule-tooltip-content>
  </capsule-tooltip>
</div>

```html
<capsule-tooltip placement="top">
  <capsule-tooltip-trigger>
    <capsule-button>Сверху</capsule-button>
  </capsule-tooltip-trigger>
  <capsule-tooltip-content> Подсказка сверху </capsule-tooltip-content>
</capsule-tooltip>
```

#### Снизу

<div style="margin: 1rem 0; display: flex; justify-content: center; padding: 2rem;">
  <capsule-tooltip placement="bottom">
    <capsule-tooltip-trigger>
      <capsule-button>Снизу</capsule-button>
    </capsule-tooltip-trigger>
    <capsule-tooltip-content>
      Подсказка снизу
    </capsule-tooltip-content>
  </capsule-tooltip>
</div>

```html
<capsule-tooltip placement="bottom">
  <capsule-tooltip-trigger>
    <capsule-button>Снизу</capsule-button>
  </capsule-tooltip-trigger>
  <capsule-tooltip-content> Подсказка снизу </capsule-tooltip-content>
</capsule-tooltip>
```

#### Слева

<div style="margin: 1rem 0; display: flex; justify-content: center; padding: 2rem;">
  <capsule-tooltip placement="left">
    <capsule-tooltip-trigger>
      <capsule-button>Слева</capsule-button>
    </capsule-tooltip-trigger>
    <capsule-tooltip-content>
      Подсказка слева
    </capsule-tooltip-content>
  </capsule-tooltip>
</div>

```html
<capsule-tooltip placement="left">
  <capsule-tooltip-trigger>
    <capsule-button>Слева</capsule-button>
  </capsule-tooltip-trigger>
  <capsule-tooltip-content> Подсказка слева </capsule-tooltip-content>
</capsule-tooltip>
```

#### Справа

<div style="margin: 1rem 0; display: flex; justify-content: center; padding: 2rem;">
  <capsule-tooltip placement="right">
    <capsule-tooltip-trigger>
      <capsule-button>Справа</capsule-button>
    </capsule-tooltip-trigger>
    <capsule-tooltip-content>
      Подсказка справа
    </capsule-tooltip-content>
  </capsule-tooltip>
</div>

```html
<capsule-tooltip placement="right">
  <capsule-tooltip-trigger>
    <capsule-button>Справа</capsule-button>
  </capsule-tooltip-trigger>
  <capsule-tooltip-content> Подсказка справа </capsule-tooltip-content>
</capsule-tooltip>
```

### Отключённый

<div style="margin: 1rem 0; display: flex; justify-content: center; padding: 2rem;">
  <capsule-tooltip disabled>
    <capsule-tooltip-trigger>
      <capsule-button>Отключён</capsule-button>
    </capsule-tooltip-trigger>
    <capsule-tooltip-content>
      Эта подсказка не покажется
    </capsule-tooltip-content>
  </capsule-tooltip>
</div>

```html
<capsule-tooltip disabled>
  <capsule-tooltip-trigger>
    <capsule-button>Отключён</capsule-button>
  </capsule-tooltip-trigger>
  <capsule-tooltip-content>
    Эта подсказка не покажется
  </capsule-tooltip-content>
</capsule-tooltip>
```

### С различными триггерами

Триггером может быть любой элемент:

<div style="margin: 1rem 0; display: flex; justify-content: center; gap: 1rem; padding: 2rem;">
  <capsule-tooltip>
    <capsule-tooltip-trigger>
      <span style="text-decoration: underline; cursor: pointer;">Текстовая ссылка</span>
    </capsule-tooltip-trigger>
    <capsule-tooltip-content>
      Наведите на текст
    </capsule-tooltip-content>
  </capsule-tooltip>
  <capsule-tooltip>
    <capsule-tooltip-trigger>
      <span style="display: inline-block; width: 40px; height: 40px; background: var(--capsule-color-primary); border-radius: 50%; cursor: pointer;"></span>
    </capsule-tooltip-trigger>
    <capsule-tooltip-content>
      Подсказка для иконки
    </capsule-tooltip-content>
  </capsule-tooltip>
</div>

```html
<capsule-tooltip>
  <capsule-tooltip-trigger>
    <span style="text-decoration: underline; cursor: pointer;"
      >Текстовая ссылка</span
    >
  </capsule-tooltip-trigger>
  <capsule-tooltip-content> Наведите на текст </capsule-tooltip-content>
</capsule-tooltip>
```

## Компоненты

Компонент Tooltip состоит из трёх подкомпонентов:

### `capsule-tooltip`

Основной контейнер, который управляет позиционированием и видимостью тултипа.

### `capsule-tooltip-trigger`

Элемент, который вызывает отображение тултипа при наведении или получении фокуса. Может содержать любой контент (кнопки, ссылки, иконки и т.д.).

### `capsule-tooltip-content`

Содержимое тултипа, которое отображается. Содержит текст или HTML для показа в подсказке.

## Атрибуты

### `capsule-tooltip`

| Атрибут     | Тип     | По умолчанию | Описание                                   |
| ----------- | ------- | ------------ | ------------------------------------------ |
| `placement` | string  | `top`        | Направление размещения тултипа             |
| `disabled`  | boolean | `false`      | Отключает тултип (предотвращает его показ) |

#### Значения размещения

- `top` — Тултип появляется над триггером (по умолчанию)
- `bottom` — Тултип появляется под триггером
- `left` — Тултип появляется слева от триггера
- `right` — Тултип появляется справа от триггера

### `capsule-tooltip-trigger`

Нет атрибутов. Этот компонент служит обёрткой для элемента-триггера.

### `capsule-tooltip-content`

Нет атрибутов. Этот компонент служит обёрткой для содержимого тултипа.

## Доступность

- ✅ ARIA role="tooltip" атрибуты
- ✅ Поддержка фокуса с клавиатуры (тултип показывается при focus-within)
- ✅ Правильная семантическая структура для экранных читалок
- ✅ Обработка событий указателя для взаимодействий при наведении
