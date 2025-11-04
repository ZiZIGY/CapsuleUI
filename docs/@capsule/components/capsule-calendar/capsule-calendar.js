import { LitElement, html } from '../../lit';

class CapsuleCalendar extends LitElement {
  static properties = {
    value: { type: String, reflect: true },
    displayYear: { type: Number, reflect: true, attribute: 'display-year' },
    displayMonth: { type: Number, reflect: true, attribute: 'display-month' },
    minDate: { type: String, reflect: true, attribute: 'min-date' },
    maxDate: { type: String, reflect: true, attribute: 'max-date' },
    disabledDates: { type: String, reflect: true, attribute: 'disabled-dates' },
    locale: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.value = '';
    this.displayYear = new Date().getFullYear();
    this.displayMonth = new Date().getMonth();
    this.minDate = null;
    this.maxDate = null;
    this.disabledDates = '';
    this.locale = 'en-US';
    this._disabledDatesSet = new Set();
    this.weekdayFormatter = null;
  }

  willUpdate(changedProperties) {
    if (changedProperties.has('locale')) {
      this.updateFormatters();
    }

    if (changedProperties.has('disabledDates')) {
      this._disabledDatesSet = new Set(
        this.disabledDates ? this.disabledDates.split(',').filter((d) => d) : []
      );
    }
  }

  updateFormatters() {
    this.weekdayFormatter = new Intl.DateTimeFormat(this.locale, {
      weekday: 'short',
    });
  }

  render() {
    return html`
      <div part="weekdays">${this.renderWeekdays()}</div>
      <div part="days-grid">${this.renderDays()}</div>
    `;
  }

  firstUpdated() {
    this.updateFormatters();
  }

  renderWeekdays() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    const weekdays = [];

    for (let i = 0; i < 7; i++) {
      const dateForDay = new Date(monday);
      dateForDay.setDate(monday.getDate() + i);
      const weekday = this.weekdayFormatter.format(dateForDay);
      weekdays.push(html`<div>${weekday}</div>`);
    }

    return weekdays;
  }

  renderDays() {
    const year = this.displayYear;
    const month = this.displayMonth;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDayIndex = (firstDay.getDay() - 1 + 7) % 7;
    const daysInMonth = lastDay.getDate();

    const days = [];

    const prevMonthYear = month === 0 ? year - 1 : year;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthLastDay = new Date(
      prevMonthYear,
      prevMonth + 1,
      0
    ).getDate();
    for (let i = startDayIndex - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      days.push(this.renderDay(day, prevMonthYear, prevMonth, true, true));
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(this.renderDay(day, year, month, false, false));
    }

    const nextMonthYear = month === 11 ? year + 1 : year;
    const nextMonth = month === 11 ? 0 : month + 1;
    const totalCells = 42;
    const nextMonthDays = totalCells - days.length;
    for (let day = 1; day <= nextMonthDays; day++) {
      days.push(this.renderDay(day, nextMonthYear, nextMonth, true, true));
    }

    return days;
  }

  renderDay(day, year, month, isOtherMonth, forceDisabled = false) {
    const date = new Date(year, month, day);
    const dateForString = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    const dateString = dateForString.toISOString().split('T')[0];

    const isToday = this.isToday(date);

    const isDisabled = forceDisabled || this.isDateDisabled(date);
    const isSelected = this.value === dateString;

    const partList = ['day'];
    if (isOtherMonth) partList.push('other-month');
    if (isToday) partList.push('today');
    if (isSelected) partList.push('selected');
    if (isDisabled) partList.push('disabled');

    return html`
      <button
        part="${partList.join(' ')}"
        data-date="${dateString}"
        ?disabled="${isDisabled}"
        @click="${() => !forceDisabled && this.handleDayClick(dateString)}"
      >
        ${day}
      </button>
    `;
  }

  handleDayClick(dateString) {
    if (this.isDateDisabled(new Date(dateString))) {
      return;
    }

    const oldValue = this.value;
    const newValue = this.value === dateString ? '' : dateString;

    if (oldValue !== newValue) {
      this.value = newValue;

      this.dispatchEvent(
        new CustomEvent('input', {
          bubbles: true,
          detail: {
            value: newValue,
            type: 'single',
          },
        })
      );

      this.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          detail: {
            value: newValue,
            oldValue: oldValue,
            type: 'single',
          },
        })
      );
    }
  }

  isDateDisabled(date) {
    const dateString = this.formatDate(date);
    if (this._disabledDatesSet.has(dateString)) {
      return true;
    }

    const minDate = this.minDate ? new Date(this.minDate) : null;
    const maxDate = this.maxDate ? new Date(this.maxDate) : null;

    if (minDate && date < minDate) {
      return true;
    }
    if (maxDate && date > maxDate) {
      return true;
    }
    return false;
  }

  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  isToday(date) {
    const today = new Date();
    return this.isSameDay(date, today);
  }

  isSameDay(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  setDisplayDate(year, month) {
    if (
      typeof year === 'number' &&
      typeof month === 'number' &&
      month >= 0 &&
      month <= 11
    ) {
      this.displayYear = year;
      this.displayMonth = month;
    }
  }

  getDisplayDate() {
    return { year: this.displayYear, month: this.displayMonth };
  }

  setSelectedDate(dateString) {
    if (dateString) {
      const date = new Date(dateString);
      if (!isNaN(date.getTime()) && !this.isDateDisabled(date)) {
        this.value = dateString;
      }
    }
  }

  getSelectedDate() {
    return this.value || null;
  }
}

customElements.define('capsule-calendar', CapsuleCalendar);
