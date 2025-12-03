# Calendar

A flexible calendar component for date selection. Perfect for date pickers, scheduling, and date-related interfaces.

## Installation

```bash
npx @zizigy/capsule add Calendar
```

## Usage

### Basic Calendar

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-calendar></capsule-calendar>
</div>

```html
<capsule-calendar></capsule-calendar>
```

### With Selected Date

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-calendar value="2024-03-15"></capsule-calendar>
</div>

```html
<capsule-calendar value="2024-03-15"></capsule-calendar>
```

### Display Specific Month

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-calendar display-year="2024" display-month="5"></capsule-calendar>
</div>

```html
<capsule-calendar
  display-year="2024"
  display-month="5"
></capsule-calendar>
```

### Date Range Restrictions

You can restrict selectable dates using `min-date` and `max-date` attributes.

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

### Disabled Dates

Disable specific dates by providing a comma-separated list.

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-calendar 
    disabled-dates="2024-03-10,2024-03-15,2024-03-20">
  </capsule-calendar>
</div>

```html
<capsule-calendar disabled-dates="2024-03-10,2024-03-15,2024-03-20">
</capsule-calendar>
```

### Localization

The calendar supports different locales for weekday names.

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

### Calendar with Navigation Buttons

Add Next/Prev buttons to navigate between months using the `setDisplayDate()` method.

<div style="margin: 1rem 0; max-width: 400px;">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
    <button 
      onclick="
        const cal = document.querySelector('#calendar-nav-example');
        const {year, month} = cal.getDisplayDate();
        let newMonth = month - 1;
        let newYear = year;
        if (newMonth < 0) { newMonth = 11; newYear--; }
        cal.setDisplayDate(newYear, newMonth);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        document.querySelector('#month-year-display').textContent = months[newMonth] + ' ' + newYear;
      "
      style="padding: 0.5rem 1rem; cursor: pointer;"
    >
      ← Prev
    </button>
    <span id="month-year-display" style="font-weight: 600;">January 2024</span>
    <button 
      onclick="
        const cal = document.querySelector('#calendar-nav-example');
        const {year, month} = cal.getDisplayDate();
        let newMonth = month + 1;
        let newYear = year;
        if (newMonth > 11) { newMonth = 0; newYear++; }
        cal.setDisplayDate(newYear, newMonth);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        document.querySelector('#month-year-display').textContent = months[newMonth] + ' ' + newYear;
      "
      style="padding: 0.5rem 1rem; cursor: pointer;"
    >
      Next →
    </button>
  </div>
  <capsule-calendar id="calendar-nav-example"></capsule-calendar>
</div>

```html
<div>
  <div
    style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;"
  >
    <button id="prev-month">← Prev</button>
    <span id="month-year"></span>
    <button id="next-month">Next →</button>
  </div>
  <capsule-calendar id="calendar-nav"></capsule-calendar>
</div>

<script>
  const calendar = document.getElementById('calendar-nav');
  const prevBtn = document.getElementById('prev-month');
  const nextBtn = document.getElementById('next-month');
  const monthYear = document.getElementById('month-year');

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

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

### Calendar with Input Field Binding

Bind a date input field to the calendar. When user types a date in YYYY-MM-DD format, the calendar updates automatically, and vice versa.

<div style="margin: 1rem 0; max-width: 400px;">
  <input 
    type="text" 
    id="date-input-example" 
    style="width: 100%; padding: 0.5rem; margin-bottom: 1rem; box-sizing: border-box;"
    placeholder="YYYY-MM-DD"
    pattern="\d{4}-\d{2}-\d{2}"
    onblur="
      const dateValue = this.value.trim();
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (dateValue && dateRegex.test(dateValue)) {
        const date = new Date(dateValue);
        if (!isNaN(date.getTime())) {
          const cal = document.querySelector('#calendar-input-example');
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
            const cal = document.querySelector('#calendar-input-example');
            cal.setSelectedDate(dateValue);
            cal.setDisplayDate(date.getFullYear(), date.getMonth());
          }
        }
        this.blur();
      }
    "
  >
  <capsule-calendar 
    id="calendar-input-example"
    oninput="document.querySelector('#date-input-example').value = event.detail.value || ''"
  ></capsule-calendar>
</div>

```html
<input
  type="text"
  id="date-input"
  style="width: 100%; padding: 0.5rem; margin-bottom: 1rem;"
  placeholder="YYYY-MM-DD"
  pattern="\d{4}-\d{2}-\d{2}"
/>
<capsule-calendar id="calendar-input"></capsule-calendar>

<script>
  const calendar = document.getElementById('calendar-input');
  const input = document.getElementById('date-input');

  function syncInputToCalendar() {
    const dateValue = input.value.trim();
    // Validate YYYY-MM-DD format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateValue && dateRegex.test(dateValue)) {
      const date = new Date(dateValue);
      if (!isNaN(date.getTime())) {
        calendar.setSelectedDate(dateValue);
        // Update calendar display to show the selected month
        calendar.setDisplayDate(date.getFullYear(), date.getMonth());
      }
    }
  }

  // Sync input → calendar on blur or Enter
  input.addEventListener('blur', syncInputToCalendar);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      syncInputToCalendar();
      input.blur();
    }
  });

  // Sync calendar → input
  calendar.addEventListener('input', (e) => {
    input.value = e.detail.value || '';
  });
</script>
```

## Attributes

| Attribute        | Type   | Default | Description                                    |
| ---------------- | ------ | ------- | ---------------------------------------------- |
| `value`          | string | ''      | Selected date in YYYY-MM-DD format             |
| `display-year`   | number | current | Year to display                                |
| `display-month`  | number | current | Month to display (0-11)                        |
| `min-date`       | string | null    | Minimum selectable date (YYYY-MM-DD)           |
| `max-date`       | string | null    | Maximum selectable date (YYYY-MM-DD)           |
| `disabled-dates` | string | ''      | Comma-separated list of disabled dates         |
| `locale`         | string | en-US   | Locale for weekday names (e.g., 'ru-RU', 'de') |

## Methods

### `setSelectedDate(dateString)`

Programmatically set the selected date.

```javascript
const calendar = document.querySelector('capsule-calendar');
calendar.setSelectedDate('2024-03-15');
```

### `getSelectedDate()`

Get the currently selected date.

```javascript
const calendar = document.querySelector('capsule-calendar');
const selectedDate = calendar.getSelectedDate();
console.log(selectedDate); // "2024-03-15" or null
```

### `setDisplayDate(year, month)`

Change the displayed month and year.

```javascript
const calendar = document.querySelector('capsule-calendar');
calendar.setDisplayDate(2024, 5); // June 2024 (month is 0-indexed)
```

### `getDisplayDate()`

Get the currently displayed month and year.

```javascript
const calendar = document.querySelector('capsule-calendar');
const { year, month } = calendar.getDisplayDate();
console.log(year, month); // 2024, 5
```

## Events

### `input`

Fired when a date is selected or deselected.

```javascript
calendar.addEventListener('input', (e) => {
  console.log('Selected date:', e.detail.value);
  console.log('Type:', e.detail.type); // 'single'
});
```

### `change`

Fired when the selected date changes.

```javascript
calendar.addEventListener('change', (e) => {
  console.log('New value:', e.detail.value);
  console.log('Old value:', e.detail.oldValue);
  console.log('Type:', e.detail.type); // 'single'
});
```

## CSS Parts

The calendar exposes several CSS parts for styling:

| Part              | Description                    |
| ----------------- | ------------------------------ |
| `weekdays`        | Container for weekday headers  |
| `days-grid`       | Grid container for day buttons |
| `day`             | Individual day button          |
| `day today`       | Current day button             |
| `day selected`    | Selected day button            |
| `day disabled`    | Disabled day button            |
| `day other-month` | Days from previous/next month  |

### Custom Styling Example

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

## Accessibility

- ✅ Keyboard navigation support
- ✅ Proper ARIA attributes
- ✅ Focus management
- ✅ Disabled state handling
- ✅ Semantic button elements for dates
