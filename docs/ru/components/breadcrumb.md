# Breadcrumb

Навигационный компонент, который показывает, где пользователь находится в иерархии сайта. Breadcrumb помогает понять раздел и быстро вернуться к родителю.

## Установка

```bash
npx @zizigy/capsule add Breadcrumb
```

## Использование

### Базовые хлебные крошки

<div style="margin: 1rem 0;">
<capsule-breadcrumb>
  <capsule-breadcrumb-item>
    <a href="#">Главная</a>
  </capsule-breadcrumb-item>
  <capsule-breadcrumb-separator></capsule-breadcrumb-separator>
  <capsule-breadcrumb-item>
    <a href="#">Категория</a>
  </capsule-breadcrumb-item>
  <capsule-breadcrumb-separator></capsule-breadcrumb-separator>
  <capsule-breadcrumb-item>
    Текущая страница
  </capsule-breadcrumb-item>
</capsule-breadcrumb>
</div>

```html
<capsule-breadcrumb>
  <capsule-breadcrumb-item>
    <a href="#">Главная</a>
  </capsule-breadcrumb-item>
  <capsule-breadcrumb-separator></capsule-breadcrumb-separator>
  <capsule-breadcrumb-item>
    <a href="#">Категория</a>
  </capsule-breadcrumb-item>
  <capsule-breadcrumb-separator></capsule-breadcrumb-separator>
  <capsule-breadcrumb-item> Текущая страница </capsule-breadcrumb-item>
</capsule-breadcrumb>
```

### С многоточием

<div style="margin: 1rem 0;">
<capsule-breadcrumb>
  <capsule-breadcrumb-item>
    <a href="#">Главная</a>
  </capsule-breadcrumb-item>
  <capsule-breadcrumb-separator></capsule-breadcrumb-separator>
  <capsule-breadcrumb-ellipsis></capsule-breadcrumb-ellipsis>
  <capsule-breadcrumb-separator></capsule-breadcrumb-separator>
  <capsule-breadcrumb-item>
    <a href="#">Страница 5</a>
  </capsule-breadcrumb-item>
  <capsule-breadcrumb-separator></capsule-breadcrumb-separator>
  <capsule-breadcrumb-item>
    Текущая страница
  </capsule-breadcrumb-item>
</capsule-breadcrumb>
</div>

```html
<capsule-breadcrumb>
  <capsule-breadcrumb-item>
    <a href="#">Главная</a>
  </capsule-breadcrumb-item>
  <capsule-breadcrumb-separator></capsule-breadcrumb-separator>
  <capsule-breadcrumb-ellipsis></capsule-breadcrumb-ellipsis>
  <capsule-breadcrumb-separator></capsule-breadcrumb-separator>
  <capsule-breadcrumb-item>
    <a href="#">Страница 5</a>
  </capsule-breadcrumb-item>
  <capsule-breadcrumb-separator></capsule-breadcrumb-separator>
  <capsule-breadcrumb-item> Текущая страница </capsule-breadcrumb-item>
</capsule-breadcrumb>
```

### Кастомный разделитель

Вы можете поместить любой контент внутрь <capsule-breadcrumb-separator></capsule-breadcrumb-separator> — эмодзи, SVG, иконку, любой текст.

<div style="margin: 1rem 0;">
<capsule-breadcrumb>
  <capsule-breadcrumb-item>
    <a href="#">Главная</a>
  </capsule-breadcrumb-item>
  <capsule-breadcrumb-separator>➡️</capsule-breadcrumb-separator>
  <capsule-breadcrumb-item>
    Особенности
  </capsule-breadcrumb-item>
  <capsule-breadcrumb-separator>
    <svg width="12" height="12" style="vertical-align:middle;"><circle cx="6" cy="6" r="5" fill="#888"/></svg>
  </capsule-breadcrumb-separator>
  <capsule-breadcrumb-item>Демо</capsule-breadcrumb-item>
</capsule-breadcrumb>
</div>

```html
<capsule-breadcrumb-separator>➡️</capsule-breadcrumb-separator>
<!-- любой контент: эмодзи, иконка, SVG и т.п. -->
<capsule-breadcrumb-separator>
  <svg
    width="12"
    height="12"
  >
    <circle
      cx="6"
      cy="6"
      r="5"
      fill="#888"
    />
  </svg>
</capsule-breadcrumb-separator>
```

## Компоненты

Breadcrumb состоит из нескольких подкомпонентов:

### `capsule-breadcrumb`

Главный контейнер для элементов хлебных крошек.

### `capsule-breadcrumb-item`

Отдельный элемент хлебной крошки. Может содержать ссылку или текст.

```html
<capsule-breadcrumb-item>
  <a href="#">Ссылка</a>
</capsule-breadcrumb-item>
```

### `capsule-breadcrumb-separator`

Разделитель между элементами (обычно: /, >, эмодзи, SVG или любой кастомный контент).

```html
<capsule-breadcrumb-separator>></capsule-breadcrumb-separator>
<capsule-breadcrumb-separator>
  <svg
    width="12"
    height="12"
  ></svg>
</capsule-breadcrumb-separator>
```

### `capsule-breadcrumb-ellipsis`

Многоточие (`...`), для свернутых элементов.

```html
<capsule-breadcrumb-ellipsis></capsule-breadcrumb-ellipsis>
```

## Доступность

- ✅ Семантическая HTML-структура
- ✅ ARIA-навигационные ориентиры
- ✅ Навигация с клавиатуры
- ✅ Поддержка для screen readers
