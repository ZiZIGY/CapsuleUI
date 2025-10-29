# Calendar

A flexible calendar component for date selection. Perfect for date pickers, scheduling, and date-related interfaces.

## Installation

```bash
npx capsule add Calendar
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
<capsule-calendar display-year="2024" display-month="5"></capsule-calendar>
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
  max-date="2024-12-31">
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
<capsule-calendar 
  disabled-dates="2024-03-10,2024-03-15,2024-03-20">
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

| Part           | Description                              |
| -------------- | ---------------------------------------- |
| `weekdays`     | Container for weekday headers            |
| `days-grid`    | Grid container for day buttons           |
| `day`          | Individual day button                    |
| `day today`    | Current day button                       |
| `day selected` | Selected day button                      |
| `day disabled` | Disabled day button                      |
| `day other-month` | Days from previous/next month         |

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