import { LitElement, html } from '../../lit';

class CapsuleRating extends LitElement {
  static formAssociated = true;

  static properties = {
    value: { type: Number, reflect: true },
    max: { type: Number, reflect: true },
    precision: { type: Number, reflect: true },
    readonly: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    size: { type: String, reflect: true },
    color: { type: String, reflect: true },
  };

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._isHovering = false;
    this._hoverPercentage = 0;
    this._filledWidth = '0%';
    this._precision = 1;
    this._max = 5;

    // Initialize properties with defaults
    this.value = parseFloat(this.getAttribute('value')) || 0;
    this.max = parseInt(this.getAttribute('max')) || 5;
    this.precision = parseFloat(this.getAttribute('precision')) || 1;
    this.readonly = this.hasAttribute('readonly');
    this.disabled = this.hasAttribute('disabled');
    this.size = this.getAttribute('size') || 'md';
    this.color = this.getAttribute('color') || 'warning';

    // Bind event handlers
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerLeave = this._onPointerLeave.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  createRenderRoot() {
    return super.createRenderRoot();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'group');
    this.setAttribute('aria-label', 'Rating');
    if (!this.readonly && !this.disabled) {
      this._attachEventListeners();
    }
    this._updateFormValue();
    this._updateFilledWidth();
  }

  firstUpdated() {
    this._precision = this.precision || 1;
    this._updateFilledWidth();
    this._attachEventListeners();
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      // Ensure value is within bounds
      if (this.value < 0) {
        this.value = 0;
      } else if (this.value > this._max) {
        this.value = this._max;
      }
      this._updateFilledWidth();
      this._updateFormValue();
    }

    if (changedProperties.has('max')) {
      this._max = this.max;
      // Ensure max is at least 1
      if (this._max < 1) {
        this._max = 1;
        this.max = 1;
      }
      // Clamp value to new max if needed
      if (this.value > this._max) {
        this.value = this._max;
      }
      this._updateFormValue();
    }

    if (changedProperties.has('precision')) {
      this._precision = this.precision;
    }

    if (
      changedProperties.has('readonly') ||
      changedProperties.has('disabled')
    ) {
      if (this.readonly || this.disabled) {
        this._removeEventListeners();
      } else {
        this._attachEventListeners();
      }
    }
  }

  formDisabledCallback(disabled) {
    this.disabled = disabled;
  }

  formResetCallback() {
    const defaultValue = parseFloat(this.getAttribute('value')) || 0;
    if (this.value !== defaultValue) {
      this.value = defaultValue;
      this._updateFilledWidth();
      this._updateFormValue();
    }
  }

  formStateRestoreCallback(state, mode) {
    if (mode === 'restore') {
      this.value = parseFloat(state) || 0;
    }
  }

  _updateFormValue() {
    if (this._internals) {
      this._internals.setFormValue((this.value || 0).toString());
      this._internals.setValidity({});
    }
  }

  _attachEventListeners() {
    if (this.readonly || this.disabled) return;

    const container = this.shadowRoot?.querySelector(
      '[part="stars-container"]'
    );
    if (container) {
      container.addEventListener('pointermove', this._onPointerMove);
      container.addEventListener('pointerleave', this._onPointerLeave);
      container.addEventListener('click', this._onClick);
    }
  }

  _removeEventListeners() {
    const container = this.shadowRoot?.querySelector(
      '[part="stars-container"]'
    );
    if (container) {
      container.removeEventListener('pointermove', this._onPointerMove);
      container.removeEventListener('pointerleave', this._onPointerLeave);
      container.removeEventListener('click', this._onClick);
    }
  }

  _onPointerMove(e) {
    if (this.readonly || this.disabled) return;
    this._isHovering = true;
    this._hoverPercentage = this._calculateHoverPercentage(e.clientX) * 100;
    this._updateFilledWidth();
  }

  _onPointerLeave() {
    if (this.readonly || this.disabled) return;
    this._isHovering = false;
    this._hoverPercentage = 0;
    this._updateFilledWidth();
  }

  _onClick(e) {
    if (this.readonly || this.disabled) return;

    const percentage = this._calculateHoverPercentage(e.clientX);
    const rawValue = percentage * this._max;
    const roundedValue = this._roundValue(rawValue);

    this.value = roundedValue;
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
  }

  _calculateHoverPercentage(clientX) {
    const container = this.shadowRoot?.querySelector(
      '[part="stars-container"]'
    );
    if (!container) return 0;

    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const clickX = clientX - containerRect.left;
    let percentage = Math.max(0, Math.min(clickX / containerWidth, 1));

    // Вычисляем rawValue и округляем его с учетом precision (как при клике)
    const rawValue = percentage * this._max;
    const roundedValue = this._roundValue(rawValue);
    percentage = roundedValue / this._max;

    return percentage;
  }

  _updateFilledWidth() {
    const percentage = this._isHovering
      ? this._hoverPercentage
      : this._max > 0
      ? ((this.value || 0) / this._max) * 100
      : 0;
    this._filledWidth = `${percentage}%`;
    const filledContainer = this.shadowRoot?.querySelector(
      '[part="stars-filled"]'
    );
    if (filledContainer) {
      filledContainer.style.setProperty('--filled-width', this._filledWidth);
    }
  }

  _generateStars(type) {
    const hasCustomSlot = this.querySelector(`[slot^="star-"]`);
    const stars = [];

    for (let i = 1; i <= this._max; i++) {
      const slotName =
        type === 'filled' ? `star-${i}-filled` : `star-${i}-empty`;

      stars.push(html`
        <div
          class="star star-${type}"
          part="star star-${type}"
          data-value="${i}"
        >
          ${hasCustomSlot
            ? html`<slot name="${slotName}">${this._getDefaultStar()}</slot>`
            : this._getDefaultStar()}
        </div>
      `);
    }

    return stars;
  }

  _getDefaultStar() {
    return html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        />
      </svg>
    `;
  }

  render() {
    return html`
      <div
        part="stars-container"
        class="stars-container"
      >
        <div
          part="stars-filled"
          class="stars-filled"
        >
          ${this._generateStars('filled')}
        </div>
        <div
          part="stars-empty"
          class="stars-empty"
        >
          ${this._generateStars('empty')}
        </div>
      </div>
    `;
  }

  _roundValue(val) {
    let roundedValue;
    if (this._precision === 1) {
      roundedValue = Math.round(val);
    } else if (this._precision === 0.5) {
      roundedValue = Math.round(val * 2) / 2;
    } else {
      roundedValue =
        Math.round(val * (1 / this._precision)) / (1 / this._precision);
    }
    return Math.max(0, Math.min(roundedValue, this._max));
  }

  get form() {
    return this._internals?.form;
  }

  get name() {
    return this.getAttribute('name');
  }

  get type() {
    return this.localName;
  }

  get validity() {
    return this._internals?.validity;
  }

  get validationMessage() {
    return this._internals?.validationMessage;
  }

  get willValidate() {
    return this._internals?.willValidate;
  }

  checkValidity() {
    return this._internals?.checkValidity() ?? true;
  }

  reportValidity() {
    return this._internals?.reportValidity() ?? true;
  }
}

customElements.define('capsule-rating', CapsuleRating);
