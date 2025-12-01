# Calendar

Гибкий компонент календаря для выбора дат. Идеально подходит для date picker'ов, планирования и интерфейсов, связанных с датами.

## Установка

```bash
npx @zizigy/capsule add Calendar
```

## Использование

### Базовый Calendar

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-calendar></capsule-calendar>
</div>

```html
<capsule-calendar></capsule-calendar>
```

### С выбранной датой

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-calendar value="2024-03-15"></capsule-calendar>
</div>

```html
<capsule-calendar value="2024-03-15"></capsule-calendar>
```

### Отображение конкретного месяца

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-calendar display-year="2024" display-month="5"></capsule-calendar>
</div>

```html
<capsule-calendar
  display-year="2024"
  display-month="5"
></capsule-calendar>
```

### Ограничение диапазона дат

Вы можете ограничить выбираемые даты с помощью атрибутов `min-date` и `max-date`.

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-calendar
    min-date="2024-01-01"
    max-date="2024-12-31">
  </capsule-calendar>
</div>

```html
<capsule-calendar
  min-date="2024-01-01"
  max-date="2024-12-31"
>
</capsule-calendar>
```

### Отключенные даты

Отключите определенные даты, указав их список через запятую.

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-calendar
    disabled-dates="2024-03-10,2024-03-15,2024-03-20">
  </capsule-calendar>
</div>

```html
<capsule-calendar disabled-dates="2024-03-10,2024-03-15,2024-03-20">
</capsule-calendar>
```

### Локализация

Календарь поддерживает различные локали для названий дней недели.

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-calendar locale="ru-RU"></capsule-calendar>
</div>

```html
<capsule-calendar locale="ru-RU"></capsule-calendar>
```

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-calendar locale="de-DE"></capsule-calendar>
</div>

```html
<capsule-calendar locale="de-DE"></capsule-calendar>
```

## Атрибуты

| Атрибут          | Тип    | По умолчанию | Описание                                        |
| ---------------- | ------ | ------------ | ----------------------------------------------- |
| `value`          | string | ''           | Выбранная дата в формате YYYY-MM-DD             |
| `display-year`   | number | текущий      | Отображаемый год                                |
| `display-month`  | number | текущий      | Отображаемый месяц (0-11)                       |
| `min-date`       | string | null         | Минимальная доступная дата (YYYY-MM-DD)         |
| `max-date`       | string | null         | Максимальная доступная дата (YYYY-MM-DD)        |
| `disabled-dates` | string | ''           | Список отключенных дат через запятую            |
| `locale`         | string | en-US        | Локаль для названий дней недели ('ru-RU', 'de') |

## Методы

### `setSelectedDate(dateString)`

Программно установить выбранную дату.

```javascript
const calendar = document.querySelector('capsule-calendar');
calendar.setSelectedDate('2024-03-15');
```

### `getSelectedDate()`

Получить текущую выбранную дату.

```javascript
const calendar = document.querySelector('capsule-calendar');
const selectedDate = calendar.getSelectedDate();
console.log(selectedDate); // "2024-03-15" или null
```

### `setDisplayDate(year, month)`

Изменить отображаемый месяц и год.

```javascript
const calendar = document.querySelector('capsule-calendar');
calendar.setDisplayDate(2024, 5); // Июнь 2024 (месяц начинается с 0)
```

### `getDisplayDate()`

Получить текущий отображаемый месяц и год.

```javascript
const calendar = document.querySelector('capsule-calendar');
const { year, month } = calendar.getDisplayDate();
console.log(year, month); // 2024, 5
```

## События

### `input`

Срабатывает при выборе или снятии выбора даты.

```javascript
calendar.addEventListener('input', (e) => {
  console.log('Выбранная дата:', e.detail.value);
  console.log('Тип:', e.detail.type); // 'single'
});
```

### `change`

Срабатывает при изменении выбранной даты.

```javascript
calendar.addEventListener('change', (e) => {
  console.log('Новое значение:', e.detail.value);
  console.log('Старое значение:', e.detail.oldValue);
  console.log('Тип:', e.detail.type); // 'single'
});
```

## CSS Parts

Календарь предоставляет несколько CSS parts для стилизации:

| Part              | Описание                             |
| ----------------- | ------------------------------------ |
| `weekdays`        | Контейнер для заголовков дней недели |
| `days-grid`       | Grid-контейнер для кнопок дней       |
| `day`             | Отдельная кнопка дня                 |
| `day today`       | Кнопка текущего дня                  |
| `day selected`    | Кнопка выбранного дня                |
| `day disabled`    | Кнопка отключенного дня              |
| `day other-month` | Дни из предыдущего/следующего месяца |

### Пример кастомной стилизации

```css
capsule-calendar::part(day selected) {
  background: #007bff;
  color: white;
}

capsule-calendar::part(day today) {
  border-color: #28a745;
  color: #28a745;
}

capsule-calendar::part(day):hover {
  background: #f0f0f0;
}
```

## Доступность

- ✅ Поддержка навигации с клавиатуры
- ✅ Правильные ARIA атрибуты
- ✅ Управление фокусом
- ✅ Обработка состояния disabled
- ✅ Семантические button элементы для дат
