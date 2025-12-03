# Pagination

Компонент пагинации для навигации по нескольким страницам контента. Поддерживает настраиваемые кнопки навигации, многоточие и различные варианты стилизации.

## Установка

```bash
npx @zizigy/capsule add Pagination
```

## Использование

### Базовая пагинация

<div style="margin: 1rem 0;">
  <capsule-pagination page="1" total-pages="10" items-per-page="5">
    <button slot="previous">← Назад</button>
    <button slot="next">Вперед →</button>
  </capsule-pagination>
</div>

```html
<capsule-pagination page="1" total-pages="10" items-per-page="5">
  <button slot="previous">← Назад</button>
  <button slot="next">Вперед →</button>
</capsule-pagination>
```

### С кнопками Первая и Последняя

<div style="margin: 1rem 0;">
  <capsule-pagination page="5" total-pages="20" items-per-page="5">
    <button slot="first">Первая</button>
    <button slot="previous">← Назад</button>
    <button slot="next">Вперед →</button>
    <button slot="last">Последняя</button>
  </capsule-pagination>
</div>

```html
<capsule-pagination page="5" total-pages="20" items-per-page="5">
  <button slot="first">Первая</button>
  <button slot="previous">← Назад</button>
  <button slot="next">Вперед →</button>
  <button slot="last">Последняя</button>
</capsule-pagination>
```

### С многоточием

Когда вы предоставляете слот для многоточия, компонент автоматически показывает многоточие (...) для пропущенных страниц.

<div style="margin: 1rem 0;">
  <capsule-pagination page="10" total-pages="20" items-per-page="5">
    <button slot="first">Первая</button>
    <button slot="previous">← Назад</button>
    <span slot="ellipsis">…</span>
    <button slot="next">Вперед →</button>
    <button slot="last">Последняя</button>
  </capsule-pagination>
</div>

```html
<capsule-pagination page="10" total-pages="20" items-per-page="5">
  <button slot="first">Первая</button>
  <button slot="previous">← Назад</button>
  <span slot="ellipsis">…</span>
  <button slot="next">Вперед →</button>
  <button slot="last">Последняя</button>
</capsule-pagination>
```

### С граничными страницами

Включите `show-boundary-pages`, чтобы всегда показывать номера первой и последней страниц вместе с многоточием.

<div style="margin: 1rem 0;">
  <capsule-pagination page="10" total-pages="20" items-per-page="5" show-boundary-pages>
    <button slot="first">Первая</button>
    <button slot="previous">← Назад</button>
    <span slot="ellipsis">…</span>
    <button slot="next">Вперед →</button>
    <button slot="last">Последняя</button>
  </capsule-pagination>
</div>

```html
<capsule-pagination
  page="10"
  total-pages="20"
  items-per-page="5"
  show-boundary-pages
>
  <button slot="first">Первая</button>
  <button slot="previous">← Назад</button>
  <span slot="ellipsis">…</span>
  <button slot="next">Вперед →</button>
  <button slot="last">Последняя</button>
</capsule-pagination>
```

### Размеры

<div style="margin: 1rem 0; display: flex; flex-direction: column; gap: 1rem;">
  <div>
    <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #64748b;">Маленький</p>
    <capsule-pagination page="3" total-pages="10" items-per-page="5" size="sm">
      <button slot="previous">←</button>
      <button slot="next">→</button>
    </capsule-pagination>
  </div>
  <div>
    <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #64748b;">Большой</p>
    <capsule-pagination page="3" total-pages="10" items-per-page="5" size="lg">
      <button slot="previous">←</button>
      <button slot="next">→</button>
    </capsule-pagination>
  </div>
</div>

```html
<!-- Маленький -->
<capsule-pagination page="3" total-pages="10" items-per-page="5" size="sm">
  <button slot="previous">←</button>
  <button slot="next">→</button>
</capsule-pagination>

<!-- Большой -->
<capsule-pagination page="3" total-pages="10" items-per-page="5" size="lg">
  <button slot="previous">←</button>
  <button slot="next">→</button>
</capsule-pagination>
```

### Варианты

<div style="margin: 1rem 0; display: flex; flex-direction: column; gap: 1rem;">
  <div>
    <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #64748b;">Outline</p>
    <capsule-pagination page="3" total-pages="10" items-per-page="5" variant="outline">
      <button slot="previous">←</button>
      <button slot="next">→</button>
    </capsule-pagination>
  </div>
  <div>
    <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #64748b;">Ghost</p>
    <capsule-pagination page="3" total-pages="10" items-per-page="5" variant="ghost">
      <button slot="previous">←</button>
      <button slot="next">→</button>
    </capsule-pagination>
  </div>
</div>

```html
<!-- Outline -->
<capsule-pagination page="3" total-pages="10" items-per-page="5" variant="outline">
  <button slot="previous">←</button>
  <button slot="next">→</button>
</capsule-pagination>

<!-- Ghost -->
<capsule-pagination page="3" total-pages="10" items-per-page="5" variant="ghost">
  <button slot="previous">←</button>
  <button slot="next">→</button>
</capsule-pagination>
```

### Цвета

<div style="margin: 1rem 0; display: flex; flex-direction: column; gap: 1rem;">
  <div>
    <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #64748b;">Ошибка</p>
    <capsule-pagination page="3" total-pages="10" items-per-page="5" color="error">
      <button slot="previous">←</button>
      <button slot="next">→</button>
    </capsule-pagination>
  </div>
  <div>
    <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #64748b;">Успех</p>
    <capsule-pagination page="3" total-pages="10" items-per-page="5" color="success">
      <button slot="previous">←</button>
      <button slot="next">→</button>
    </capsule-pagination>
  </div>
</div>

```html
<capsule-pagination page="3" total-pages="10" items-per-page="5" color="error">
  <button slot="previous">←</button>
  <button slot="next">→</button>
</capsule-pagination>
```

### Программное управление

Управляйте пагинацией программно с помощью JavaScript методов.

<div style="margin: 1rem 0;">
  <capsule-pagination id="pagination-control-ru" page="5" total-pages="20" items-per-page="5">
    <button slot="first">Первая</button>
    <button slot="previous">← Назад</button>
    <span slot="ellipsis">…</span>
    <button slot="next">Вперед →</button>
    <button slot="last">Последняя</button>
  </capsule-pagination>
  <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
    <button onclick="document.getElementById('pagination-control-ru').previousPage()">Назад</button>
    <button onclick="document.getElementById('pagination-control-ru').goToPage(1)">На страницу 1</button>
    <button onclick="document.getElementById('pagination-control-ru').nextPage()">Вперед</button>
  </div>
</div>

```html
<capsule-pagination id="my-pagination" page="5" total-pages="20" items-per-page="5">
  <button slot="previous">← Назад</button>
  <button slot="next">Вперед →</button>
</capsule-pagination>

<script>
  const pagination = document.getElementById('my-pagination');
  
  // Навигация программно
  pagination.goToPage(10);
  pagination.nextPage();
  pagination.previousPage();
</script>
```

### Обработка изменений страницы

Слушайте событие `change`, чтобы реагировать на навигацию по страницам.

```html
<capsule-pagination id="my-pagination" page="1" total-pages="10" items-per-page="5">
  <button slot="previous">← Назад</button>
  <button slot="next">Вперед →</button>
</capsule-pagination>

<script>
  const pagination = document.getElementById('my-pagination');
  
  pagination.addEventListener('change', (event) => {
    console.log('Текущая страница:', event.detail.page);
    console.log('Всего страниц:', event.detail.totalPages);
    console.log('Элементов на странице:', event.detail.itemsPerPage);
    
    // Загрузить данные для новой страницы
    loadPageData(event.detail.page);
  });
</script>
```

## Атрибуты

| Атрибут             | Тип     | По умолчанию | Описание                                                          |
| ------------------- | ------- | ------------ | ----------------------------------------------------------------- |
| `page`              | number  | 1            | Текущий номер страницы (начиная с 1)                              |
| `total-pages`       | number  | 1            | Общее количество страниц                                           |
| `items-per-page`    | number  | 5            | Количество видимых кнопок страниц для отображения                 |
| `show-boundary-pages` | boolean | false      | Показывать номера первой и последней страницы при использовании многоточия |
| `size`              | string  | md           | Размер кнопок пагинации: `sm`, `md`, `lg`                         |
| `variant`           | string  | —            | Визуальный вариант: `outline`, `ghost`                            |
| `color`             | string  | —            | Цветовая тема для активной страницы: `secondary`, `error`, `warning`, `success`, `info` |

## Слоты

Компонент пагинации использует слоты для кастомизации:

- `first` - Кнопка/элемент для навигации на первую страницу
- `previous` - Кнопка/элемент для навигации на предыдущую страницу
- `next` - Кнопка/элемент для навигации на следующую страницу
- `last` - Кнопка/элемент для навигации на последнюю страницу
- `ellipsis` - Элемент для показа при пропуске страниц (по умолчанию: `…`)

**Примечание:** Компонент автоматически определяет, какие слоты предоставлены, и соответствующим образом настраивает макет. Если вы не предоставите слот, этот элемент не будет отрисован.

## Методы

### `goToPage(page)`

Перейти на конкретный номер страницы.

- **Параметры:**
  - `page` (number): Номер страницы для перехода (начиная с 1)
- **Возвращает:** `void`

```javascript
const pagination = document.querySelector('capsule-pagination');
pagination.goToPage(5);
```

### `nextPage()`

Перейти на следующую страницу.

- **Возвращает:** `void`

```javascript
pagination.nextPage();
```

### `previousPage()`

Перейти на предыдущую страницу.

- **Возвращает:** `void`

```javascript
pagination.previousPage();
```

## События

### `change`

Срабатывает при изменении текущей страницы (либо пользователем, либо программно).

- **Detail:**
  - `page` (number): Новый номер страницы
  - `totalPages` (number): Общее количество страниц
  - `itemsPerPage` (number): Количество элементов на странице

```javascript
pagination.addEventListener('change', (event) => {
  console.log('Страница изменена на:', event.detail.page);
});
```

## Data-атрибуты

Компонент автоматически устанавливает data-атрибуты, которые вы можете использовать для стилизации:

- `data-on-first-page` - Устанавливается на первой странице
- `data-on-last-page` - Устанавливается на последней странице

```css
capsule-pagination[data-on-first-page] button[slot="previous"] {
  opacity: 0.5;
  pointer-events: none;
}

capsule-pagination[data-on-last-page] button[slot="next"] {
  opacity: 0.5;
  pointer-events: none;
}
```

## Стилизация

Компонент использует CSS parts для стилизации:

- `page-item` - Отдельная кнопка страницы
- `page-item active` - Активная кнопка страницы
- `ellipsis` - Индикатор многоточия
- `pages-container` - Контейнер для кнопок страниц
- `first-item` - Слот кнопки "Первая"
- `prev-item` - Слот кнопки "Предыдущая"
- `next-item` - Слот кнопки "Следующая"
- `last-item` - Слот кнопки "Последняя"

```css
capsule-pagination::part(page-item) {
  /* Стиль для кнопок страниц */
}

capsule-pagination::part(page-item active) {
  /* Стиль для активной кнопки страницы */
}
```

## Примеры

### Кастомные кнопки навигации

У вас полный контроль над кнопками навигации. Настраивайте их как хотите!

```html
<capsule-pagination page="5" total-pages="20" items-per-page="5">
  <capsule-button slot="first" variant="outline">« Первая</capsule-button>
  <capsule-button slot="previous" variant="outline">‹ Назад</capsule-button>
  <span slot="ellipsis">…</span>
  <capsule-button slot="next" variant="outline">Вперед ›</capsule-button>
  <capsule-button slot="last" variant="outline">Последняя »</capsule-button>
</capsule-pagination>
```

### Отключенная навигация

Используйте data-атрибуты для отключения кнопок навигации, когда это необходимо:

```css
capsule-pagination[data-on-first-page] button[slot="previous"],
capsule-pagination[data-on-first-page] button[slot="first"] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

capsule-pagination[data-on-last-page] button[slot="next"],
capsule-pagination[data-on-last-page] button[slot="last"] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

