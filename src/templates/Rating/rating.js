class Rating extends HTMLElement {
  static observedAttributes = [
    'value',
    'max',
    'precision',
    'readonly',
    'disabled',
    'size',
    'color',
  ];
  static formAssociated = true;

  constructor() {
    super();
    this._value = 0;
    this._max = 5;
    this._precision = 1;
    this._isHovering = false;
    this._hoverPercentage = 0;
    this.attachShadow({ mode: 'open' });
    this.internals_ = this.attachInternals();
  }

  connectedCallback() {
    this._render();
    this._attachEventListeners();
    this._updateFormValue();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === 'value') {
      this._value = parseFloat(newValue) || 0;
      this._updateFilledWidth();
      this._updateFormValue();
    } else if (name === 'max') {
      this._max = parseInt(newValue) || 5;
      this._render();
      this._updateFormValue();
    } else if (name === 'precision') {
      this._precision = parseFloat(newValue) || 1;
    }
  }

  formDisabledCallback(disabled) {
    this.toggleAttribute('disabled', disabled);
    this._render();
  }

  formResetCallback() {
    const defaultValue = parseFloat(this.getAttribute('value')) || 0;
    if (this._value !== defaultValue) {
      this._value = defaultValue;
      this._updateFilledWidth();
      this._updateFormValue();
    }
  }

  formStateRestoreCallback(state, mode) {
    if (mode === 'restore') {
      this.value = state;
    }
  }

  _updateFormValue() {
    this.internals_.setFormValue(this._value.toString());
    this.internals_.setValidity({});
  }

  _render() {
    const readonly = this.hasAttribute('readonly');
    const disabled = this.hasAttribute('disabled');
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || 'warning';

    const hasCustomSlot = this.querySelector('[slot^="star-"]');

    this.shadowRoot.innerHTML = `
      <div class="stars-container" part="stars-container">
        <div class="stars-filled" part="stars-filled">
          ${this._generateStars('filled', hasCustomSlot)}
        </div>
        <div class="stars-empty" part="stars-empty">
          ${this._generateStars('empty', hasCustomSlot)}
        </div>
      </div>
    `;

    this._updateFilledWidth();
  }

  _generateStars(type, hasCustomSlot) {
    let starsHTML = '';

    for (let i = 1; i <= this._max; i++) {
      const slotName =
        type === 'filled' ? `star-${i}-filled` : `star-${i}-empty`;

      starsHTML += `
        <div class="star star-${type}" part="star star-${type}" data-value="${i}">
          ${
            hasCustomSlot
              ? `<slot name="${slotName}">${this._getDefaultStar()}</slot>`
              : this._getDefaultStar()
          }
        </div>
      `;
    }

    return starsHTML;
  }

  _getDefaultStar() {
    return `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    `;
  }

  _updateFilledWidth() {
    const filledContainer = this.shadowRoot.querySelector('.stars-filled');
    if (filledContainer) {
      const percentage = this._isHovering
        ? this._hoverPercentage
        : (this._value / this._max) * 100;
      filledContainer.style.setProperty('--filled-width', `${percentage}%`);
    }
  }

  _calculateHoverPercentage(clientX) {
    const container = this.shadowRoot.querySelector('.stars-container');
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const clickX = clientX - containerRect.left;
    let percentage = Math.max(0, Math.min(clickX / containerWidth, 1));

    if (this._precision === 1) {
      percentage = Math.round(percentage * this._max) / this._max;
    } else if (this._precision === 0.5) {
      percentage = Math.round(percentage * this._max * 2) / (this._max * 2);
    } else {
      percentage = Math.round(percentage * this._max * 10) / (this._max * 10);
    }

    return percentage;
  }

  _attachEventListeners() {
    if (this.hasAttribute('readonly') || this.hasAttribute('disabled')) return;

    const container = this.shadowRoot.querySelector('.stars-container');

    container.addEventListener('pointermove', (e) => {
      this._isHovering = true;
      this._hoverPercentage = this._calculateHoverPercentage(e.clientX) * 100;
      this._updateFilledWidth();
    });

    container.addEventListener('pointerleave', () => {
      this._isHovering = false;
      this._hoverPercentage = 0;
      this._updateFilledWidth();
    });

    container.addEventListener('click', (e) => {
      const percentage = this._calculateHoverPercentage(e.clientX);
      const value = percentage * this._max;

      this.value = value;
      this._isHovering = false;
      this._hoverPercentage = 0;
      this._updateFormValue();

      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { value: this.value },
          bubbles: true,
        })
      );

      this.dispatchEvent(
        new CustomEvent('input', {
          detail: { value: this.value },
          bubbles: true,
        })
      );
    });
  }

  get value() {
    return this._value;
  }

  set value(val) {
    let roundedValue;
    if (this._precision === 1) {
      roundedValue = Math.round(val);
    } else if (this._precision === 0.5) {
      roundedValue = Math.round(val * 2) / 2;
    } else {
      roundedValue =
        Math.round(val * (1 / this._precision)) / (1 / this._precision);
    }

    this._value = Math.max(0, Math.min(roundedValue, this._max));
    this.setAttribute('value', this._value);
    this._updateFilledWidth();
    this._updateFormValue();
  }

  get max() {
    return this._max;
  }

  set max(val) {
    this._max = Math.max(1, val);
    this.setAttribute('max', this._max);
    this._render();
    this._updateFormValue();
  }

  get precision() {
    return this._precision;
  }

  set precision(val) {
    this._precision = val;
    this.setAttribute('precision', val);
  }

  get form() {
    return this.internals_.form;
  }

  get name() {
    return this.getAttribute('name');
  }

  get type() {
    return this.localName;
  }

  get validity() {
    return this.internals_.validity;
  }

  get validationMessage() {
    return this.internals_.validationMessage;
  }

  get willValidate() {
    return this.internals_.willValidate;
  }

  checkValidity() {
    return this.internals_.checkValidity();
  }

  reportValidity() {
    return this.internals_.reportValidity();
  }
}

customElements.define('__PREFIX__-__COMPONENT__', Rating);
