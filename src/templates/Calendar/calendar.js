class SingleCalendar extends HTMLElement {
  static get observedAttributes() {
    return [
      'value',
      'display-year',
      'display-month',
      'min-date',
      'max-date',
      'disabled-dates',
      'locale',
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.selectedValue = '';
    this.displayYear = new Date().getFullYear();
    this.displayMonth = new Date().getMonth();
    this.minDate = null;
    this.maxDate = null;
    this.disabledDates = new Set();
    this.locale = 'en-US';
    this.weekdayFormatter = null;
  }

  connectedCallback() {
    this.parseAttributes();
    this.updateFormatters();
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.parseAttributes();
      if (name === 'locale') {
        this.updateFormatters();
        this.render();
      } else {
        this.updateUI();
      }
    }
  }

  parseAttributes() {
    this.selectedValue = this.getAttribute('value') || '';

    const yearStr = this.getAttribute('display-year');
    const monthStr = this.getAttribute('display-month');
    if (yearStr && monthStr) {
      const year = parseInt(yearStr, 10);
      const month = parseInt(monthStr, 10);
      if (!isNaN(year) && !isNaN(month) && month >= 0 && month <= 11) {
        this.displayYear = year;
        this.displayMonth = month;
      }
    } else {
      const now = new Date();
      this.displayYear = now.getFullYear();
      this.displayMonth = now.getMonth();
    }

    const minDateStr = this.getAttribute('min-date');
    this.minDate = minDateStr ? new Date(minDateStr) : null;
    const maxDateStr = this.getAttribute('max-date');
    this.maxDate = maxDateStr ? new Date(maxDateStr) : null;
    const disabledDatesStr = this.getAttribute('disabled-dates');
    if (disabledDatesStr) {
      this.disabledDates = new Set(
        disabledDatesStr.split(',').filter((d) => d)
      );
    } else {
      this.disabledDates = new Set();
    }
    const locale = this.getAttribute('locale');
    if (locale && locale !== this.locale) {
      this.locale = locale;
    }
  }

  updateFormatters() {
    this.weekdayFormatter = new Intl.DateTimeFormat(this.locale, {
      weekday: 'short',
    });
  }

  updateUI() {
    const weekdaysElement = this.shadowRoot.querySelector('[part="weekdays"]');
    if (weekdaysElement) {
      weekdaysElement.innerHTML = this.renderWeekdays();
    }

    const daysGrid = this.shadowRoot.querySelector('[part="days-grid"]');
    if (daysGrid) {
      daysGrid.innerHTML = this.renderDays();
    }

    this.setupDayEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <div part="weekdays">${this.renderWeekdays()}</div>
        <div part="days-grid">${this.renderDays()}</div>
    `;

    this.setupDayEventListeners();
  }

  setupEventListeners() {
    this.setupDayEventListeners();
  }

  setupDayEventListeners() {
    const dayButtons = this.shadowRoot.querySelectorAll('[part="day"]');
    dayButtons.forEach((day) => {
      day.replaceWith(day.cloneNode(true));
    });

    const allDayButtons = this.shadowRoot.querySelectorAll('[part="day"]');
    allDayButtons.forEach((day) => {
      day.addEventListener('click', (e) => {
        const dateString = e.target.dataset.date;
        if (dateString) {
          if (!e.target.disabled) {
            this.handleDayClick(dateString);
          }
        }
      });
    });
  }

  handleDayClick(dateString) {
    const clickedDate = new Date(dateString);
    if (this.isDateDisabled(clickedDate)) {
      return;
    }

    let oldValue = this.selectedValue;

    let newValue;
    if (this.selectedValue === dateString) {
      newValue = '';
    } else {
      newValue = dateString;
    }

    this.selectedValue = newValue;
    this.setAttribute('value', newValue);

    if (oldValue !== newValue) {
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

  renderWeekdays() {
    const weekdays = [];
    const baseDate = new Date(Date.UTC(2024, 9, 21));

    for (let i = 0; i < 7; i++) {
      const dateForDay = new Date(baseDate);
      dateForDay.setUTCDate(baseDate.getUTCDate() + i);
      const weekday = this.weekdayFormatter.format(dateForDay);
      weekdays.push(`<div>${weekday}</div>`);
    }
    return weekdays.join('');
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
      days.push(this.renderDay(day, prevMonthYear, prevMonth, true));
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(this.renderDay(day, year, month, false));
    }

    const nextMonthYear = month === 11 ? year + 1 : year;
    const nextMonth = month === 11 ? 0 : month + 1;
    const totalCells = 42;
    const nextMonthDays = totalCells - days.length;
    for (let day = 1; day <= nextMonthDays; day++) {
      days.push(this.renderDay(day, nextMonthYear, nextMonth, true));
    }

    return days.join('');
  }

  renderDay(day, year, month, isOtherMonth) {
    const date = new Date(year, month, day);
    const dateForString = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    const dateString = dateForString.toISOString().split('T')[0];

    const isToday = this.isToday(date);
    const isDisabled = this.isDateDisabled(date);

    const isSelected = this.selectedValue === dateString;

    const partList = ['day'];
    if (isOtherMonth) partList.push('other-month');
    if (isToday) partList.push('today');
    if (isSelected) partList.push('selected');
    if (isDisabled) partList.push('disabled');

    const partAttr = `part="${partList.join(' ')}"`;

    return `
      <button ${partAttr} data-date="${dateString}" ${
      isDisabled ? 'disabled' : ''
    }>
        ${day}
      </button>
    `;
  }

  isDateDisabled(date) {
    const dateString = this.formatDate(date);
    if (this.disabledDates.has(dateString)) {
      return true;
    }
    if (this.minDate && date < this.minDate) {
      return true;
    }
    if (this.maxDate && date > this.maxDate) {
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
      typeof Number(year) === 'number' &&
      typeof Number(month) === 'number' &&
      month >= 0 &&
      month <= 11
    ) {
      this.setAttribute('display-year', year.toString());
      this.setAttribute('display-month', month.toString());
    }
  }

  getDisplayDate() {
    return { year: this.displayYear, month: this.displayMonth };
  }

  setSelectedDate(dateString) {
    if (dateString) {
      const date = new Date(dateString);
      if (!isNaN(date.getTime()) && !this.isDateDisabled(date)) {
        this.setAttribute('value', dateString);
      }
    }
  }

  getSelectedDate() {
    return this.selectedValue || null;
  }
}

customElements.define('__PREFIX__-__COMPONENT__', SingleCalendar);
