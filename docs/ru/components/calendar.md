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

### Календарь с кнопками навигации

Добавьте кнопки Next/Prev для переключения между месяцами, используя метод `setDisplayDate()`.

<div style="margin: 1rem 0; max-width: 400px;">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
    <button 
      onclick="
        const cal = document.querySelector('#calendar-nav-example-ru');
        const {year, month} = cal.getDisplayDate();
        let newMonth = month - 1;
        let newYear = year;
        if (newMonth < 0) { newMonth = 11; newYear--; }
        cal.setDisplayDate(newYear, newMonth);
        const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        document.querySelector('#month-year-display-ru').textContent = months[newMonth] + ' ' + newYear;
      "
      style="padding: 0.5rem 1rem; cursor: pointer;"
    >
      ← Назад
    </button>
    <span id="month-year-display-ru" style="font-weight: 600;">Январь 2024</span>
    <button 
      onclick="
        const cal = document.querySelector('#calendar-nav-example-ru');
        const {year, month} = cal.getDisplayDate();
        let newMonth = month + 1;
        let newYear = year;
        if (newMonth > 11) { newMonth = 0; newYear++; }
        cal.setDisplayDate(newYear, newMonth);
        const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        document.querySelector('#month-year-display-ru').textContent = months[newMonth] + ' ' + newYear;
      "
      style="padding: 0.5rem 1rem; cursor: pointer;"
    >
      Вперед →
    </button>
  </div>
  <capsule-calendar id="calendar-nav-example-ru"></capsule-calendar>
</div>

```html
<div>
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
    <button id="prev-month">← Назад</button>
    <span id="month-year"></span>
    <button id="next-month">Вперед →</button>
  </div>
  <capsule-calendar id="calendar-nav"></capsule-calendar>
</div>

<script>
  const calendar = document.getElementById('calendar-nav');
  const prevBtn = document.getElementById('prev-month');
  const nextBtn = document.getElementById('next-month');
  const monthYear = document.getElementById('month-year');
  
  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
                      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  
  function updateMonthYear() {
    const { year, month } = calendar.getDisplayDate();
    monthYear.textContent = `${monthNames[month]} ${year}`;
  }
  
  function navigateMonth(direction) {
    const { year, month } = calendar.getDisplayDate();
    let newMonth = month + direction;
    let newYear = year;
    
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    
    calendar.setDisplayDate(newYear, newMonth);
    updateMonthYear();
  }
  
  prevBtn.addEventListener('click', () => navigateMonth(-1));
  nextBtn.addEventListener('click', () => navigateMonth(1));
  updateMonthYear();
</script>
```

### Календарь с привязкой к полю ввода

Привяжите поле ввода даты к календарю. Когда пользователь вводит дату в формате YYYY-MM-DD, календарь автоматически обновляется, и наоборот.

<div style="margin: 1rem 0; max-width: 400px;">
  <input 
    type="text" 
    id="date-input-example-ru" 
    style="width: 100%; padding: 0.5rem; margin-bottom: 1rem; box-sizing: border-box;"
    placeholder="YYYY-MM-DD"
    pattern="\d{4}-\d{2}-\d{2}"
    onblur="
      const dateValue = this.value.trim();
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (dateValue && dateRegex.test(dateValue)) {
        const date = new Date(dateValue);
        if (!isNaN(date.getTime())) {
          const cal = document.querySelector('#calendar-input-example-ru');
          cal.setSelectedDate(dateValue);
          cal.setDisplayDate(date.getFullYear(), date.getMonth());
        }
      }
    "
    onkeypress="
      if (event.key === 'Enter') {
        const dateValue = this.value.trim();
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (dateValue && dateRegex.test(dateValue)) {
          const date = new Date(dateValue);
          if (!isNaN(date.getTime())) {
            const cal = document.querySelector('#calendar-input-example-ru');
            cal.setSelectedDate(dateValue);
            cal.setDisplayDate(date.getFullYear(), date.getMonth());
          }
        }
        this.blur();
      }
    "
  >
  <capsule-calendar 
    id="calendar-input-example-ru"
    oninput="document.querySelector('#date-input-example-ru').value = event.detail.value || ''"
  ></capsule-calendar>
</div>

```html
<input 
  type="text" 
  id="date-input" 
  style="width: 100%; padding: 0.5rem; margin-bottom: 1rem;"
  placeholder="YYYY-MM-DD"
  pattern="\d{4}-\d{2}-\d{2}"
>
<capsule-calendar id="calendar-input"></capsule-calendar>

<script>
  const calendar = document.getElementById('calendar-input');
  const input = document.getElementById('date-input');
  
  function syncInputToCalendar() {
    const dateValue = input.value.trim();
    // Валидация формата YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateValue && dateRegex.test(dateValue)) {
      const date = new Date(dateValue);
      if (!isNaN(date.getTime())) {
        calendar.setSelectedDate(dateValue);
        // Обновить отображение календаря для показа выбранного месяца
        calendar.setDisplayDate(date.getFullYear(), date.getMonth());
      }
    }
  }
  
  // Синхронизация input → calendar при blur или Enter
  input.addEventListener('blur', syncInputToCalendar);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      syncInputToCalendar();
      input.blur();
    }
  });
  
  // Синхронизация calendar → input
  calendar.addEventListener('input', (e) => {
    input.value = e.detail.value || '';
  });
</script>
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
