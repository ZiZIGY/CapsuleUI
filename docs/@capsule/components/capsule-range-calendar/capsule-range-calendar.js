class RangeCalendar extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'min-date', 'max-date', 'disabled-dates', 'locale'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentDate = new Date();
    this.selectedValue = '';
    this.minDate = null;
    this.maxDate = null;
    this.disabledDates = new Set();
    this.locale = 'en-US';
    this.monthYearFormatter = null;
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
    this.monthYearFormatter = new Intl.DateTimeFormat(this.locale, {
      month: 'long',
      year: 'numeric',
    });
    this.weekdayFormatter = new Intl.DateTimeFormat(this.locale, {
      weekday: 'short',
    });
  }

  updateUI() {
    const monthElement = this.shadowRoot.querySelector(
      '[part="current-month"]'
    );
    if (monthElement) {
      monthElement.textContent = this.getMonthYearString();
    }

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
      <div part="calendar">
        <div part="calendar-header">
          <div part="current-month">${this.getMonthYearString()}</div>
          <div part="calendar-nav">
            <button part="nav-btn prev-month">←</button>
            <button part="nav-btn next-month">→</button>
          </div>
        </div>

        <div part="weekdays">${this.renderWeekdays()}</div>
        <div part="days-grid">${this.renderDays()}</div>
      </div>
    `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    const prevBtn = this.shadowRoot.querySelector('[part="prev-month"]');
    const nextBtn = this.shadowRoot.querySelector('[part="next-month"]');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.navigateMonth(-1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.navigateMonth(1);
      });
    }

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

    const [start, end] = this.selectedValue.split(',');

    const isStartSelected = start === dateString;
    const isEndSelected = end === dateString;

    if (isStartSelected || isEndSelected) {
      this.selectedValue = '';
      this.setAttribute('value', '');
    } else if (start && end) {
      this.selectedValue = dateString;
      this.setAttribute('value', dateString);
    } else if (start) {
      let newStart = new Date(start);
      let newEnd = new Date(dateString);
      if (newEnd < newStart) {
        [newStart, newEnd] = [newEnd, newStart];
      }
      const startStr = this.formatDate(newStart);
      const endStr = this.formatDate(newEnd);
      this.selectedValue = `${startStr},${endStr}`;
      this.setAttribute('value', this.selectedValue);
    } else {
      this.selectedValue = dateString;
      this.setAttribute('value', dateString);
    }

    if (oldValue !== this.selectedValue) {
      this.dispatchEvent(
        new CustomEvent('input', {
          bubbles: true,
          detail: {
            value: this.selectedValue,
            type: 'range',
          },
        })
      );
      this.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          detail: {
            value: this.selectedValue,
            oldValue: oldValue,
            type: 'range',
          },
        })
      );
    }
  }

  getMonthYearString() {
    return this.monthYearFormatter.format(
      new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1)
    );
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
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

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

    const [start, end] = this.selectedValue.split(',');
    const isSelected = dateString === start || dateString === end;

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

  navigateMonth(direction) {
    this.currentDate.setMonth(this.currentDate.getMonth() + direction);
    this.updateUI();
  }
}

customElements.define('capsule-range-calendar', RangeCalendar);
